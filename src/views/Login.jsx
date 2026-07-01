import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useLogin from "../hooks/useLogin";
import useAppCss from "../hooks/useAppCss";
import {
  AccountCircle,
  Create,
  Login as LoginIcon,
  Password,
  Security,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Notes from "../components/Notes";
import Captcha from "../components/Captcha";
import { useSelector } from "react-redux";
import AppAlert from "../components/AppAlert";
import OTPVerification from "../components/OTPVerification";

function Login() {
  const theme = useTheme();
  const {
    isPwdVisible,
    togglePwdVisibility,
    textfieldType,
    handleLoginTextBox,
    loginData,
    alert,
    handleAlertOnClose,
    handleLogin,
    isLogging,
    showOTPPanel,
  } = useLogin();
  const { RequiredFieldCss } = useAppCss();
  const { signupReply } = useSelector((state) => state.auth);
  const { captchaId } = useSelector((state) => state.captcha);

  async function submitLoginForm(e) {
    e.preventDefault();
    const payload = { ...loginData, captchaId };

    if (signupReply?.username) payload.username = signupReply?.username;

    await handleLogin(payload);
  }

  if (showOTPPanel)
    return (
      <Container maxWidth sx={{ my: 2 }}>
        <Paper
          variant="elevation"
          elevation={4}
          sx={(theme) => ({
            padding: { xs: "1.5rem", md: "2.5rem" },
            borderRadius: "16px",
            width: "100%",
            border: `1px solid ${theme.palette.secondary["A50"]}`,
          })}
        >
          <OTPVerification verifyType="login" username={loginData.username} />
        </Paper>
      </Container>
    );

  return (
    <Container maxWidth sx={{ my: 2 }}>
      <Paper
        variant="elevation"
        elevation={4}
        sx={(theme) => ({
          padding: { xs: "1.5rem", md: "2.5rem" },
          borderRadius: "16px",
          width: "100%",
          border: `1px solid ${theme.palette.secondary["50"]}`,
        })}
      >
        <Typography
          variant="h4"
          sx={{
            my: 2,
            mb: 4,
            fontWeight: 700,
            textTransform: "uppercase",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
          color="primary"
        >
          Job Notifier SSO
        </Typography>

        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <TextField
          label="Username or email"
          placeholder="xyz54128413 or admin@yopmail.com"
          fullWidth
          helperText="Please enter your username here."
          sx={{ mb: 2, ...RequiredFieldCss }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle
                    fontSize="small"
                    color={signupReply?.username ? "disabled" : "primary"}
                  />
                </InputAdornment>
              ),
            },
          }}
          name="username"
          value={signupReply?.username || loginData?.username}
          disabled={signupReply?.username}
          required
          onChange={handleLoginTextBox}
          type="text"
          autoFocus={!signupReply?.username}
        />

        <TextField
          label="Password"
          placeholder="Ex:- password@123"
          fullWidth
          helperText="Please enter your password here."
          sx={{ mb: 2, ...RequiredFieldCss }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Password fontSize="small" color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" onClick={togglePwdVisibility}>
                  {isPwdVisible ? (
                    <VisibilityOff fontSize="small" color="success" />
                  ) : (
                    <Visibility fontSize="small" color="success" />
                  )}
                </InputAdornment>
              ),
            },
          }}
          name="password"
          value={loginData?.password}
          onChange={handleLoginTextBox}
          required
          type={textfieldType}
          autoFocus={signupReply?.username}
        />

        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Captcha />

          <TextField
            label="Your Captcha"
            placeholder="Ex:- edh26w"
            fullWidth
            helperText="Please enter your captcha text here."
            sx={{ mb: 2, ...RequiredFieldCss }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Security fontSize="small" color="primary" />
                  </InputAdornment>
                ),
              },
            }}
            name="captchaValue"
            value={loginData?.captchaValue}
            onChange={handleLoginTextBox}
            required
            type="text"
          />
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            textAlign: "right",
          }}
        >
          <Button
            variant="text"
            startIcon={<Password fontSize="small" />}
            href="/recover/account"
          >
            Forgot your password?
          </Button>
        </Box>

        <Button
          variant="contained"
          color="success"
          startIcon={
            isLogging ? (
              <CircularProgress size={16} color="secondary" />
            ) : (
              <LoginIcon fontSize="small" />
            )
          }
          onClick={submitLoginForm}
          sx={{ mb: 2 }}
          disabled={isLogging}
        >
          Login
        </Button>

        <Notes
          note="All fields marked with asterisk (*) are mandatory to fill."
          noteColor={theme.palette.secondary.main}
        />

        <Notes
          note="You can use either username or email to login yourself."
          noteColor={theme.palette.secondary.main}
        />

        <Notes
          note="You can find your username in the welcome email sent by us."
          noteColor={theme.palette.secondary.main}
        />
      </Paper>
    </Container>
  );
}

export default React.memo(Login);

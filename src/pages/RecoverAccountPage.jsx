import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  AlternateEmail,
  LockReset,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import useAppCss from "../hooks/useAppCss";
import Heading from "../components/Heading";
import OTPVerification from "../components/OTPVerification";
import useRecoverAccount from "../hooks/useRecoverAccount";
import AppAlert from "../components/AppAlert";

function RecoverAccountPage() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();
  const {
    currentStep,
    setCurrentStep,
    email,
    setEmail,
    isEmailVerifying,
    isPasswordResetting,
    handleEmailSubmit,
    handlePasswordSubmit,
    alert,
    handleAlertOnClose,
  } = useRecoverAccount();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Container maxWidth="md" sx={{ mx: "auto" }}>
      <Paper variant="elevation" elevation={4} sx={GlobalPaperCss}>
        <Heading
          Icon={LockReset}
          color={theme.palette.primary.main}
          iconColor={theme.palette.warning.main}
          text="Recover Account"
        />

        <Divider sx={{ mb: 2 }} />

        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
          {currentStep === 1 && (
            <>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isEmailVerifying}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ cursor: "pointer" }}
                      >
                        <AlternateEmail fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleEmailSubmit}
                disabled={isEmailVerifying || !email}
              >
                {isEmailVerifying ? (
                  <CircularProgress
                    size={16}
                    color="secondary"
                    sx={{ mr: 1 }}
                  />
                ) : null}
                Verify
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <OTPVerification
              verifyType="forgot_password"
              username={email}
              onSuccess={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <>
              <TextField
                label="New Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPasswordResetting}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ cursor: "pointer" }}
                      >
                        <Password fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setShowPassword((p) => !p)}
                        sx={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" color="success" />
                        ) : (
                          <Visibility fontSize="small" color="success" />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isPasswordResetting}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ cursor: "pointer" }}
                      >
                        <Password fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setShowConfirmPassword((p) => !p)}
                        sx={{ cursor: "pointer" }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff fontSize="small" color="success" />
                        ) : (
                          <Visibility fontSize="small" color="success" />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={() => handlePasswordSubmit(password, confirmPassword)}
                disabled={isPasswordResetting || !password || !confirmPassword}
              >
                {isPasswordResetting ? (
                  <CircularProgress
                    size={16}
                    color="secondary"
                    sx={{ mr: 1 }}
                  />
                ) : null}
                Recover your account
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default React.memo(RecoverAccountPage);

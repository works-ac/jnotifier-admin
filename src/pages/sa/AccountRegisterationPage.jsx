import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import {
  Badge,
  Create,
  Email,
  LocationOn,
  Password,
  Phone,
  Security,
  Store,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Notes from "../../components/Notes";
import useRegisteration from "../../hooks/useRegisteration";
import Captcha from "../../components/Captcha";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AppAlert from "../../components/AppAlert";
import OTPVerification from "../../components/OTPVerification";

function AccountRegisterationPage({ onSuccess }) {
  const theme = useTheme();
  const {
    isPwdVisible,
    togglePwdVisibility,
    textfieldType,
    handleTextBoxOnChange,
    userRegPayload,
    handleDobOnChange,
    dob,
    alert,
    handleAlertOnClose,
    handleFormSubmit,
    isSubmitting,
    showOTPComponent,
  } = useRegisteration();
  const { RequiredFieldCss } = useAppCss();

  if (showOTPComponent) {
    return (
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
        <OTPVerification onSuccess={onSuccess} />
      </Paper>
    );
  }

  return (
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
      <Box component="div" sx={{ my: 2 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
          color="primary"
        >
          Job Notifier
        </Typography>

        <Typography variant="caption" color="secondary">
          Create your account and apply for various job opportunities.
        </Typography>
      </Box>

      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert.type}
      />

      <TextField
        label="Full Name"
        placeholder="Ex:- Josh Long"
        fullWidth
        helperText="Please enter your full name here."
        sx={{ mb: 2, ...RequiredFieldCss }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Badge fontSize="small" color="primary" />
              </InputAdornment>
            ),
          },
        }}
        required
        name="fullName"
        value={userRegPayload.fullName}
        onChange={handleTextBoxOnChange}
        type="text"
        autoFocus
      />

      <TextField
        label="Email"
        placeholder="Ex:- joshlong@gmail.com"
        fullWidth
        helperText="Please enter your email here."
        sx={{ mb: 2, ...RequiredFieldCss }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Email fontSize="small" color="primary" />
              </InputAdornment>
            ),
          },
        }}
        required
        name="email"
        value={userRegPayload.email}
        onChange={handleTextBoxOnChange}
        type="email"
      />

      <TextField
        label="Phone"
        placeholder="Ex:- 9646560258"
        fullWidth
        helperText="Please enter your phone no. here"
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Phone fontSize="small" color="primary" />
              </InputAdornment>
            ),
          },
        }}
        name="phone"
        value={userRegPayload.phone}
        onChange={handleTextBoxOnChange}
        type="tel"
      />

      <TextField
        label="Your password"
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
              <InputAdornment
                position="end"
                onClick={togglePwdVisibility}
                sx={{ cursor: "pointer" }}
              >
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
        value={userRegPayload.password}
        onChange={handleTextBoxOnChange}
        required
        type={textfieldType}
      />

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DatePicker
            label="Choose your D.O.B"
            value={dob}
            onChange={handleDobOnChange}
            format="YYYY/MM/DD"
          />
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <FormControl fullWidth required sx={RequiredFieldCss}>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="gender"
              value={userRegPayload.gender}
              label="Gender"
              onChange={handleTextBoxOnChange}
              name="gender"
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="T">Transgender</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TextField
        label="Company Name"
        placeholder="Ex:- Microsoft"
        fullWidth
        helperText="Please enter your company name here."
        sx={{ mb: 2, ...RequiredFieldCss }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Store fontSize="small" color="primary" />
              </InputAdornment>
            ),
          },
        }}
        required
        name="companyName"
        value={userRegPayload.companyName}
        onChange={handleTextBoxOnChange}
        type="text"
        autoFocus
      />

      <TextField
        label="Company Address"
        placeholder="Ex:- India"
        fullWidth
        helperText="Please enter your company address here."
        sx={{ mb: 2, ...RequiredFieldCss }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn fontSize="small" color="primary" />
              </InputAdornment>
            ),
          },
        }}
        required
        name="address"
        value={userRegPayload.address}
        onChange={handleTextBoxOnChange}
        type="text"
        autoFocus
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
          name="captcha"
          value={userRegPayload.captcha}
          onChange={handleTextBoxOnChange}
          required
          type="text"
        />
      </Box>

      <Button
        variant="contained"
        color="success"
        startIcon={
          isSubmitting ? (
            <CircularProgress size={16} color="secondary" />
          ) : (
            <Create />
          )
        }
        onClick={handleFormSubmit}
        disabled={isSubmitting}
        sx={{ mb: 2 }}
      >
        Register
      </Button>

      <Divider />

      <Notes
        note="All fields marked with asterisk (*) are mandatory to fill."
        noteColor={theme.palette.secondary.main}
      />

      <Notes
        note="We use your date of birth and category to determine your eligibility when you apply for a job."
        noteColor={theme.palette.secondary.main}
      />
    </Paper>
  );
}

export default React.memo(AccountRegisterationPage);

import React from "react";
import OTPInput from "./OTPInput";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import Notes from "./Notes";
import useOTPVerification from "../hooks/useOTPVerification";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppAlert from "./AppAlert";

function OTPVerification({ verifyType = "email_verification", username = "", onSuccess }) {
  const theme = useTheme();
  const { signupReply } = useSelector((state) => state.auth);
  const {
    handleResendOTP,
    handleVerifyOTP,
    isVerifying,
    alert,
    handleAlertOnClose,
  } = useOTPVerification();

  async function submitOTP(otp) {
    const payload = {
      username: signupReply?.username || username,
      otpCode: otp,
      verificationType: verifyType,
    };

    await handleVerifyOTP(payload, onSuccess);
  }

  return (
    <>
      <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }} color="primary">
        OTP Verification
      </Typography>

      <Typography
        variant="caption"
        sx={{ fontWeight: 700, pl: 1 }}
        color="secondary"
      >
        Please enter the OTP we just sent to your email.
      </Typography>

      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      <Box
        component="div"
        sx={{ my: 4, display: "flex", justifyContent: "center" }}
      >
        <OTPInput
          onComplete={(otp) => submitOTP(otp)}
          onResend={handleResendOTP}
          username={signupReply?.username || username}
          isVerifying={isVerifying}
        />
      </Box>

      <Divider sx={{ mb: 1 }} />

      <Notes
        note="Re-send OTP button will get enable after 2 minutes."
        noteColor={theme.palette.secondary.main}
      />

      <Notes
        note="Please check your spam folder, if not received in inbox."
        noteColor={theme.palette.secondary.main}
      />

      <Notes
        note="On successful verification of your identity you'll get redirected to login page."
        noteColor={theme.palette.secondary.main}
      />
    </>
  );
}

OTPVerification.propTypes = {
  verifyType: PropTypes.string,
  username: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default React.memo(OTPVerification);

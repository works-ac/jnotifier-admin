import { Dialog, DialogContent, Divider } from "@mui/material";
import React from "react";
import AppDialogTitle from "../core/AppDialogTitle";
import { VerifiedUser } from "@mui/icons-material";
import OTPVerification from "../OTPVerification";
import { AppConstants } from "../../app/AppConstants";
import useUserAccountVerificationModal from "../../hooks/dialogs/useUserAccountVerificationModal";
import CircularProgressLoader from "../CircluarProgressLoader";
import AppAlert from "../AppAlert";

function UserAccountVerificationDialog({ isOpen, email, onClose, onSuccess }) {
  const { alert, handleAlertOnClose, isLoading } =
    useUserAccountVerificationModal(email);

  if (isOpen && isLoading)
    return (
      <CircularProgressLoader
        text="Sending verification code, please wait..."
        takeHeight
      />
    );

  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth>
      <AppDialogTitle
        Icon={<VerifiedUser fontSize="small" />}
        title="User Account Verification"
        onClose={onClose}
      />

      <Divider />

      <DialogContent>
        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <OTPVerification
          onSuccess={onSuccess}
          username={email}
          verifyType={AppConstants.OTP_VERIFICATION_TYPE.EMAIL_VERIFY}
        />
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(UserAccountVerificationDialog);

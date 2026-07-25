import { useCallback, useState } from "react";
import { resendOTP, verifyOTP } from "../services/SignupService";
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../app/AppConstants";
import useAppAlert from "./useAppAlert";

function useOTPVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const navigate = useNavigate();

  const handleResendOTP = useCallback(async function (payload) {
    try {
      reset();
      await resendOTP(payload);
    } catch (err) {
      showErrorMsg(err);
    }
  }, []);

  const handleVerifyOTP = useCallback(async function (payload, onSuccess) {
    setIsVerifying(true);
    reset();

    try {
      await verifyOTP(payload);

      if (
        payload.verificationType === AppConstants.OTP_VERIFICATION_TYPE.LOGIN
      ) {
        navigate("/", { replace: true });
        return;
      }

      if (onSuccess) {
        console.log(typeof onSuccess, "typeof onSuccess");
        await onSuccess();
        return;
      }

      await navigate("/account");
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsVerifying(false);
    }
  }, []);

  return {
    handleResendOTP,
    handleVerifyOTP,
    handleAlertOnClose,
    isVerifying,
    alert,
  };
}

export default useOTPVerification;

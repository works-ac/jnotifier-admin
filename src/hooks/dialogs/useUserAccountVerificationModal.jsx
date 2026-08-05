import React, { useCallback, useEffect, useState } from "react";
import useAppAlert from "../useAppAlert";
import { verifyEmail } from "../../services/SignupService";

function useUserAccountVerificationModal(email) {
  const [isLoading, setIsLoading] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const handleSendOTP = useCallback(
    async function (email) {
      if (!email) return;
      if (isLoading) return;

      reset();
      setIsLoading(true);

      try {
        const payload = { email };
        await verifyEmail(payload);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  useEffect(() => {
    handleSendOTP(email);
  }, [email]);

  return { isLoading, alert, handleAlertOnClose };
}

export default useUserAccountVerificationModal;

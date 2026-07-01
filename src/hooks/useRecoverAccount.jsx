import { useCallback, useState } from "react";
import { verifyEmail, forgotPassword } from "../services/SignupService";
import useAppAlert from "./useAppAlert";
import { useNavigate } from "react-router-dom";
import Patterns from "@book-junction/patterns";

function useRecoverAccount() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isEmailVerifying, setIsEmailVerifying] = useState(false);
  const [isPasswordResetting, setIsPasswordResetting] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg, showSuccessMsg } =
    useAppAlert();
  const navigate = useNavigate();

  const handleEmailSubmit = useCallback(
    async function () {
      if (!email) {
        showErrorMsg("Please enter an email address.");
        return;
      }

      reset();
      setIsEmailVerifying(true);

      try {
        await verifyEmail({ email });
        setCurrentStep(2);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsEmailVerifying(false);
      }
    },
    [email, reset, showErrorMsg],
  );

  const handlePasswordSubmit = useCallback(
    async function (password, confirmPassword) {
      reset();

      try {
        if (!password || !confirmPassword) {
          throw new Error("Please fill all the password fields.");
        }

        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        if (!Patterns.common.password.test(password))
          throw new Error(
            "Your password should be of minimum 8 characters and should contain atleast 1 capital, 1 small, 1 digit and 1 special symbol.",
          );

        setIsPasswordResetting(true);
        await forgotPassword({ email, password });
        navigate("/account");
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsPasswordResetting(false);
      }
    },
    [email, reset, showErrorMsg, navigate],
  );

  return {
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
  };
}

export default useRecoverAccount;

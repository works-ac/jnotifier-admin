import { useCallback, useState } from "react";
import { UserLogin } from "../data/UserLogin";
import { login } from "../services/SignupService";
import useAppAlert from "./useAppAlert";
import useCaptcha from "./useCaptcha";
import { useDispatch } from "react-redux";
import { setLoginRes } from "../redux/slices/AuthSlice";

function useLogin() {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [textfieldType, setTextfieldType] = useState("password");
  const [loginData, setLoginData] = useState(UserLogin);
  const [isLogging, setIsLogging] = useState(false);
  const [showOTPPanel, setShowOTPPanel] = useState(false);
  const { reset, showErrorMsg, alert, handleAlertOnClose } = useAppAlert();
  const { reloadCaptcha } = useCaptcha();
  const dispatch = useDispatch();

  const togglePwdVisibility = useCallback(
    function () {
      setIsPwdVisible((prev) => !prev);
      setTextfieldType((prev) => (prev === "password" ? "text" : "password"));
    },
    [isPwdVisible, textfieldType],
  );

  const handleLoginTextBox = useCallback(
    function (e) {
      const { name, value } = e.target;

      setLoginData((prev) => ({ ...prev, [name]: value }));
    },
    [loginData],
  );

  const handleLogin = useCallback(
    async function (payload) {
      reset();
      setIsLogging(true);

      try {
        const response = await login(payload);
        const reply = response.data?.data ?? {};

        setShowOTPPanel(true);
        dispatch(setLoginRes(reply));
      } catch (error) {
        showErrorMsg(error);
        reloadCaptcha();
      } finally {
        setIsLogging(false);
      }
    },
    [loginData, alert],
  );

  return {
    isPwdVisible,
    togglePwdVisibility,
    textfieldType,
    handleLoginTextBox,
    loginData,
    handleLogin,
    alert,
    handleAlertOnClose,
    isLogging,
    showOTPPanel,
  };
}

export default useLogin;

import { useCallback, useState } from "react";
import { UserRegisteration } from "../data/UserRegisteration";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { UserRegisterSchema } from "../data/schema/UserRegisterationSchema";
import useAppAlert from "./useAppAlert";
import useCaptcha from "./useCaptcha";
import { setLoginRes, setSignupReply } from "../redux/slices/AuthSlice";
import { registerAdmin } from "../services/UserMgmtService";
import { showZodValidationError } from "../helpers";

function useRegisteration(onSuccess) {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [textfieldType, setTextfieldType] = useState("password");
  const [userRegPayload, setUserRegPayload] = useState(UserRegisteration);
  const [dob, setDob] = useState(dayjs());
  const { captchaId } = useSelector((state) => state.captcha);
  const { alert, handleAlertOnClose, reset, setAlert, showErrorMsg } =
    useAppAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [isProceedToUserVerification, setIsProceedToUserVerification] =
    useState(true);
  const { reloadCaptcha } = useCaptcha();
  const dispatch = useDispatch();

  const togglePwdVisibility = useCallback(
    function () {
      setIsPwdVisible((prev) => !prev);
      setTextfieldType((prev) => (prev === "password" ? "text" : "password"));
    },
    [isPwdVisible, textfieldType],
  );

  const toggleProceedToUserVerification = useCallback(function () {
    setIsProceedToUserVerification((prev) => !prev);
  }, []);

  const handleTextBoxOnChange = useCallback(function (e) {
    const { name, value, checked, type } = e.target || {};

    if (!name) return;

    const finalValue = type === "checkbox" ? checked : value;

    setUserRegPayload((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  }, []);

  const handleDobOnChange = useCallback(
    function (newValue) {
      setDob(newValue);
    },
    [dob],
  );

  const handleFormSubmit = useCallback(
    async function (e) {
      e.preventDefault();
      reset();

      const result = UserRegisterSchema.safeParse({
        ...userRegPayload,
        dob: dayjs(dob).format("YYYY/MM/DD"),
      });

      if (!result.success) {
        const message = showZodValidationError(
          result.error.flatten().fieldErrors,
        );

        setAlert((prev) => ({ ...prev, message, type: "error", isOpen: true }));
        return;
      }

      const payload = {
        ...userRegPayload,
        captchaId,
        dob: dayjs(dob).format("YYYY-MM-DD"),
        mobile: userRegPayload.phone,
        role: "admin",
      };

      delete payload.phone;
      setIsSubmitting(true);

      try {
        const response = await registerAdmin(payload);
        const reply = response.data?.data;

        await reloadCaptcha();
        setDob(dayjs());
        setUserRegPayload(UserRegisteration);
        dispatch(setSignupReply(reply));

        if (isProceedToUserVerification) {
          dispatch(setLoginRes(reply));
          setShowOTPComponent(true);
        } else {
          await onSuccess?.();
        }
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [userRegPayload, isProceedToUserVerification],
  );

  return {
    isPwdVisible,
    userRegPayload,
    textfieldType,
    dob,
    alert,
    isSubmitting,
    showOTPComponent,
    isProceedToUserVerification,
    toggleProceedToUserVerification,
    handleAlertOnClose,
    togglePwdVisibility,
    handleTextBoxOnChange,
    handleDobOnChange,
    handleFormSubmit,
  };
}

export default useRegisteration;

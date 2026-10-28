import { useCallback, useState } from "react";
import useAppAlert from "../useAppAlert";
import { addNewJobCategory } from "../../services/JobCategoriesMasterServices";
import useCaptcha from "../useCaptcha";
import { useSelector } from "react-redux";

function useAddNewJobCategoryMasterModal(onSuccess, onClose) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState({ jobCategoryName: "" });
  const [captcha, setCaptcha] = useState("");
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const { reloadCaptcha } = useCaptcha();
  const { captchaId } = useSelector((state) => state.captcha);

  const handleTextboxOnChange = useCallback(function (e) {
    e.preventDefault();
    const { name, value } = e.target;

    setPayload((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCaptchaChange = useCallback(function (e) {
    setCaptcha(e.target.value);
  }, []);

  const handleAddBtnClick = useCallback(
    async function (e) {
      if (e) e.preventDefault();

      if (!payload.jobCategoryName || !payload.jobCategoryName.trim()) {
        showErrorMsg(new Error("Job category name is required."));
        return;
      }

      if (!captcha || !captcha.trim()) {
        showErrorMsg(new Error("Please enter the captcha code."));
        return;
      }

      if (!captchaId) {
        showErrorMsg(
          new Error("Captcha is missing or expired. Please reload captcha."),
        );
        return;
      }

      reset();
      setIsSubmitting(true);

      try {
        await addNewJobCategory({
          jobCategoryName: payload.jobCategoryName.trim(),
          captchaId,
          captcha: captcha.trim(),
        });
        setPayload({ jobCategoryName: "" });
        setCaptcha("");
        if (typeof onSuccess === "function") await onSuccess();
        if (typeof onClose === "function") onClose();
      } catch (error) {
        showErrorMsg(error);
        reloadCaptcha();
        setCaptcha("");
      } finally {
        setIsSubmitting(false);
      }
    },
    [payload, captcha, captchaId, onSuccess, onClose, reset, showErrorMsg, reloadCaptcha],
  );

  return {
    payload,
    captcha,
    handleCaptchaChange,
    alert,
    isSubmitting,
    handleAddBtnClick,
    handleAlertOnClose,
    handleTextboxOnChange,
  };
}

export default useAddNewJobCategoryMasterModal;

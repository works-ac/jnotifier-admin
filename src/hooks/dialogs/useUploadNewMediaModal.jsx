import React, { useCallback, useState } from "react";
import useAppAlert from "../useAppAlert";
import { uploadNewMedia } from "../../services/MediaService";
import useCaptcha from "../useCaptcha";
import { useSelector } from "react-redux";

function useUploadNewMediaModal(onCloseCb, onSuccessCb) {
  const [file, setFile] = useState(null);
  const [captcha, setCaptcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const { reloadCaptcha } = useCaptcha();
  const { captchaId } = useSelector((state) => state.captcha);

  const handleCaptchaChange = useCallback((e) => {
    setCaptcha(e.target.value);
  }, []);

  const handleNewFileUploadBtn = useCallback(
    async function (e) {
      if (e) e.preventDefault();

      if (!file) {
        showErrorMsg(new Error("Please select a file to upload."));
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
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("captchaId", captchaId);
        formData.append("captcha", captcha.trim());

        await uploadNewMedia(formData);
        setFile(null);
        setCaptcha("");

        if (typeof onCloseCb === "function") {
          onCloseCb();
        }

        if (onSuccessCb && typeof onSuccessCb === "function") {
          await onSuccessCb();
        }
      } catch (error) {
        showErrorMsg(error);
        reloadCaptcha();
        setCaptcha("");
      } finally {
        setIsLoading(false);
      }
    },
    [
      file,
      captcha,
      captchaId,
      onCloseCb,
      onSuccessCb,
      reset,
      showErrorMsg,
      reloadCaptcha,
    ],
  );

  return {
    file,
    setFile,
    captcha,
    setCaptcha,
    handleCaptchaChange,
    handleNewFileUploadBtn,
    handleAlertOnClose,
    isLoading,
    alert,
  };
}

export default useUploadNewMediaModal;

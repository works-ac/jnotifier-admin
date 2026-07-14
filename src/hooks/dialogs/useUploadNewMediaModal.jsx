import React, { useCallback, useState } from "react";
import useAppAlert from "../useAppAlert";
import { uploadNewMedia } from "../../services/MediaService";

function useUploadNewMediaModal(onCloseCb, onSuccessCb) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const handleNewFileUploadBtn = useCallback(
    async function (e) {
      e.preventDefault();

      if (!file) return;
      if (!onCloseCb) return;
      if (typeof onCloseCb !== "function") return;

      reset();
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        await uploadNewMedia(formData);
        setFile(null);
        onCloseCb();
        
        if (onSuccessCb && typeof onSuccessCb === "function") {
          await onSuccessCb();
        }
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [file, onCloseCb, onSuccessCb, reset, showErrorMsg],
  );

  return {
    setFile,
    handleNewFileUploadBtn,
    handleAlertOnClose,
    isLoading,
    alert,
  };
}

export default useUploadNewMediaModal;

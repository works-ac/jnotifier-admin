import React, { useCallback, useState } from "react";
import useAppAlert from "../useAppAlert";
import { addNewJobCategory } from "../../services/JobCategoriesMasterServices";

function useAddNewJobCategoryMasterModal(onSuccess, onClose) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState({ jobCategoryName: "" });
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const handleTextboxOnChange = useCallback(function (e) {
    e.preventDefault();
    const { name, value } = e.target;

    setPayload((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddBtnClick = useCallback(
    async function (e) {
      e.preventDefault();
      reset();
      setIsSubmitting(true);

      try {
        await addNewJobCategory(payload);
        if (typeof onSuccess === "function") await onSuccess();
        if (typeof onClose === "function") onClose();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [payload],
  );

  return {
    payload,
    alert,
    isSubmitting,
    handleAddBtnClick,
    handleAlertOnClose,
    handleTextboxOnChange,
  };
}

export default useAddNewJobCategoryMasterModal;

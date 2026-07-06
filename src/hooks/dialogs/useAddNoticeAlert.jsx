import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { AddNoticeAlertData } from "../../data/AddNoticeListing";
import useAppAlert from "../useAppAlert";
import { addNotice } from "../../services/NoticeService";

function useAddNoticeAlert() {
  const [form, setForm] = useState(AddNoticeAlertData);
  const [noticeAdvFile, setNoticeAdvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  useEffect(() => {
    console.log(noticeAdvFile);
  }, [noticeAdvFile]);

  const handleTextboxOnChange = useCallback(
    function (e) {
      const { name, value } = e.target;

      setForm({
        ...form,
        [name]: value,
      });
    },
    [form],
  );

  const handleAdd = useCallback(
    async function (successCallback, closeCallback) {
      if (!successCallback || !closeCallback) return;
      if (isSubmitting) return;
      if (
        typeof successCallback !== "function" ||
        typeof closeCallback !== "function"
      )
        return;

      setIsSubmitting(true);
      reset();

      try {
        const formData = new FormData();

        formData.append("noticeTitle", form.noticeTitle);
        formData.append("noticeDesc", form.noticeDesc);
        formData.append("noticeTags", form.tags.join(",").trim());

        if (noticeAdvFile) {
          formData.append("noticeAdvFile", noticeAdvFile);
        }

        await addNotice(formData);
        successCallback();
        closeCallback();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, noticeAdvFile],
  );

  return {
    form,
    handleTextboxOnChange,
    setForm,
    noticeAdvFile,
    setNoticeAdvFile,
    handleAdd,
    isSubmitting,
    alert,
    handleAlertOnClose,
  };
}

export default useAddNoticeAlert;

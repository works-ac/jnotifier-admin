import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { AddNoticeAlertData } from "../../data/AddNoticeListing";
import useAppAlert from "../useAppAlert";
import { addNotice } from "../../services/NoticeService";
import { AddJobAlertSchema } from "../../data/schema/AddJobAlertSchema";

function useAddNoticeAlert() {
  const [form, setForm] = useState(AddNoticeAlertData);
  const [noticeAdvFile, setNoticeAdvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

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

      const payload = {
        noticeTitle: form.noticeTitle,
        noticeDesc: form.noticeDesc,
        noticeTags: form.tags.join(",").trim(),
      };

      const result = AddJobAlertSchema.safeParse(payload);
      if (!result.success) throw new Error(result.error.message);

      try {
        const formData = new FormData();

        formData.append("noticeTitle", payload.noticeTitle);
        formData.append("noticeDesc", payload.noticeDesc);
        formData.append("noticeTags", payload.noticeTags);

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

import React, { useCallback, useEffect, useState } from "react";
import { AddNoticeAlertData } from "../../data/AddNoticeListing";
import useAppAlert from "../useAppAlert";
import { addNotice } from "../../services/NoticeService";
import { AddJobAlertSchema } from "../../data/schema/AddJobAlertSchema";
import { showZodValidationError } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotice,
  saveNotice,
  saveNoticeDescription,
} from "../../redux/slices/NoticeSlice";

function useAddNoticeAlert(isOpen = false) {
  const [form, setForm] = useState(AddNoticeAlertData);
  const [noticeAdvFile, setNoticeAdvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, setAlert, handleAlertOnClose, reset, showErrorMsg } =
    useAppAlert();
  const dispatch = useDispatch();
  const draftNotice = useSelector((state) => state.notice);

  useEffect(() => {
    if (isOpen && draftNotice) {
      const hasDraft =
        Boolean(draftNotice.noticeTitle) ||
        Boolean(draftNotice.noticeDesc) ||
        (Array.isArray(draftNotice.tags) && draftNotice.tags.length > 0);

      if (hasDraft) {
        setForm((prev) => ({
          ...prev,
          noticeTitle: draftNotice.noticeTitle || "",
          noticeDesc: draftNotice.noticeDesc || "",
          tags: Array.isArray(draftNotice.tags) ? draftNotice.tags : [],
        }));
      }
    }
  }, [isOpen]);

  const handleTextboxOnChange = useCallback(
    function (e) {
      const { name, value } = e.target;

      if (name === "noticeDesc") {
        dispatch(saveNoticeDescription({ noticeDesc: value }));
      }

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [dispatch],
  );

  const handleSaveAsDraft = useCallback(async () => {
    try {
      const payload = {
        noticeTitle: form.noticeTitle || "",
        noticeDesc: form.noticeDesc || "",
        tags: form.tags || [],
      };

      dispatch(saveNotice(payload));
      setAlert({
        isOpen: true,
        message: "Notice saved as draft successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving notice as draft:", error);
      showErrorMsg(error);
    }
  }, [form, dispatch, setAlert, showErrorMsg]);

  const resetForm = useCallback(() => {
    setForm(AddNoticeAlertData);
    setNoticeAdvFile(null);
    reset();
  }, [reset]);

  const handleAdd = useCallback(
    async function (successCallback, closeCallback) {
      if (!successCallback || !closeCallback) return;
      if (isSubmitting) return;
      if (
        typeof successCallback !== "function" ||
        typeof closeCallback !== "function"
      )
        return;
      if (form.noticeDesc.length > 2500) return;

      setIsSubmitting(true);
      reset();

      const payload = {
        noticeTitle: form.noticeTitle,
        noticeDesc: form.noticeDesc,
        noticeTags: form.tags.join(",").trim(),
      };

      const result = AddJobAlertSchema.safeParse(payload);
      if (!result.success)
        throw new Error(
          showZodValidationError(result.error.flatten().fieldErrors),
        );

      try {
        const formData = new FormData();

        formData.append("noticeTitle", payload.noticeTitle);
        formData.append("noticeDesc", payload.noticeDesc);
        formData.append("noticeTags", payload.noticeTags);

        if (noticeAdvFile) {
          formData.append("noticeAdvFile", noticeAdvFile);
        }

        await addNotice(formData);
        setForm(AddNoticeAlertData);
        setNoticeAdvFile(null);
        dispatch(clearNotice());
        successCallback();
        closeCallback();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, noticeAdvFile, isSubmitting, reset, dispatch, showErrorMsg],
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
    handleSaveAsDraft,
    resetForm,
  };
}

export default useAddNoticeAlert;

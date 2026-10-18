import { useCallback, useEffect, useState } from "react";
import useAppAlert from "../useAppAlert";
import { updateNotice } from "../../services/NoticeService";
import { useDispatch } from "react-redux";
import {
  clearNotice,
  saveNotice,
  saveNoticeDescription,
} from "../../redux/slices/NoticeSlice";

/**
 * useUpdateNoticeAlert
 *
 * Manages form state for the UpdateNoticeAlertModal.
 * Seeded from an existing notice row (noticeDetails).
 * noticeDetailedAdv, isActive and isDeleted are intentionally excluded —
 * they are read-only and must not be sent in the update payload.
 *
 * @param {object} noticeDetails — the current row data from the MRT table
 */
function useUpdateNoticeAlert(noticeDetails) {
  const [form, setForm] = useState({
    noticeTitle: "",
    noticeDesc: "",
    tags: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, setAlert, handleAlertOnClose, reset, showErrorMsg } =
    useAppAlert();
  const dispatch = useDispatch();

  // Seed form whenever the selected row changes
  useEffect(() => {
    if (!noticeDetails) return;

    const rawTags = noticeDetails.tags ?? "";
    const tagsArray =
      typeof rawTags === "string"
        ? rawTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : Array.isArray(rawTags)
          ? rawTags
          : [];

    setForm({
      noticeTitle: noticeDetails.title ?? "",
      noticeDesc: noticeDetails.noticeDescription ?? "",
      tags: tagsArray,
    });
  }, [noticeDetails]);

  const handleTextboxOnChange = useCallback(
    function (e) {
      const { name, value } = e.target;
      if (name === "noticeDesc") {
        dispatch(saveNoticeDescription({ noticeDesc: value }));
      }
      setForm((prev) => ({ ...prev, [name]: value }));
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

  /**
   * handleUpdate — builds FormData and calls the updateNotice API.
   * @param {Function} successCallback
   * @param {Function} closeCallback
   */
  const handleUpdate = useCallback(
    async function (successCallback, closeCallback) {
      if (!noticeDetails?.id) return;
      if (isSubmitting) return;

      setIsSubmitting(true);
      reset();

      try {
        const formData = new FormData();
        formData.append("noticeId", noticeDetails.id);
        formData.append("noticeTitle", form.noticeTitle);
        formData.append("noticeDesc", form.noticeDesc);
        formData.append("noticeTags", form.tags.join(",").trim());

        await updateNotice(formData);

        dispatch(clearNotice());

        if (typeof successCallback === "function") successCallback();
        if (typeof closeCallback === "function") closeCallback();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, noticeDetails, isSubmitting, reset, dispatch, showErrorMsg],
  );

  return {
    form,
    setForm,
    handleTextboxOnChange,
    handleUpdate,
    handleSaveAsDraft,
    isSubmitting,
    alert,
    handleAlertOnClose,
  };
}

export default useUpdateNoticeAlert;

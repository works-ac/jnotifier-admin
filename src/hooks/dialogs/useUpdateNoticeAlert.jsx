import { useCallback, useEffect, useState } from "react";
import useAppAlert from "../useAppAlert";
import { updateNotice } from "../../services/NoticeService";

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
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

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
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

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

        if (typeof successCallback === "function") successCallback();
        if (typeof closeCallback === "function") closeCallback();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, noticeDetails, isSubmitting],
  );

  return {
    form,
    setForm,
    handleTextboxOnChange,
    handleUpdate,
    isSubmitting,
    alert,
    handleAlertOnClose,
  };
}

export default useUpdateNoticeAlert;

import { useCallback, useState } from "react";
import useAppAlert from "./useAppAlert";
import { createJob } from "../services/JobService";
import dayjs from "dayjs";
import { AddNewJobPostingSchema } from "../data/schema/AddNewJobPostingSchema";
import { showZodValidationError } from "../helpers";

const INITIAL_FORM = {
  title: "",
  applicationStartDate: null, // dayjs object while editing
  applicationEndDate: null, // dayjs object while editing
  tags: [], // array of tag strings, joined on submit
  shortDescription: "",
  advNo: "",
  applyLink: "",
  // files are stored separately as raw File objects
};

/**
 * useAddJob
 *
 * Manages all state and logic for the Add Job modal.
 *
 * @param {function} onSuccess - called after a successful createJob() so the
 *                               parent can close the modal and refresh the table.
 */
function useAddJob(onSuccess) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null); // markdown file
  const [advFile, setAdvFile] = useState(null); // PDF file
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const [showWhatsAppLinkGenDialog, setShowWhatsAppLinkGenDialog] =
    useState(false);
  const [showMdEditor, setShowMdEditor] = useState(false);

  // ── Field handlers ─────────────────────────────────────────────────────────

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDateChange = useCallback((name, dayjsValue) => {
    setForm((prev) => ({ ...prev, [name]: dayjsValue }));
  }, []);

  const handleAddTag = useCallback((tag) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(trimmed) ? prev.tags : [...prev.tags, trimmed],
    }));
  }, []);

  const handleWhatsAppLinkDialog = useCallback(function () {
    setShowWhatsAppLinkGenDialog((prev) => !prev);
  }, []);

  const handleMdEditorDialog = useCallback(function () {
    setShowMdEditor((prev) => !prev);
  }, []);

  const handleRemoveTag = useCallback((tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }, []);

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async () => {
    if (form.shortDescription.length > 700) return;

    reset();
    setIsSubmitting(true);

    try {
      const payload = {
        title: form.title,
        applicationStartDate: dayjs(form.applicationStartDate).format(
          "YYYY-MM-DD",
        ),
        applicationEndDate: dayjs(form.applicationEndDate).format("YYYY-MM-DD"),
        tags: form.tags.join(",").trim(),
        applyLink: form.applyLink,
        shortDescription: form.shortDescription,
        advNo: form.advNo,
      };
      const result = AddNewJobPostingSchema.safeParse(payload);

      if (!result.success) {
        throw new Error(
          showZodValidationError(result.error.flatten().fieldErrors),
        );
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("applicationStartDate", payload.applicationStartDate);
      formData.append("applicationEndDate", payload.applicationEndDate);
      formData.append("tags", payload.tags);
      formData.append("shortDescription", payload.shortDescription);
      formData.append("advNo", payload.advNo);
      formData.append("applyLink", payload.applyLink);
      formData.append("status", true);

      if (file) formData.append("file", file);
      if (advFile) formData.append("advFile", advFile);

      await createJob(formData);

      // Reset form and notify parent on success
      setForm(INITIAL_FORM);
      setFile(null);
      setAdvFile(null);
      onSuccess?.();
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, file, advFile, onSuccess]);

  const handleMdEditorSubmitBtnClick = useCallback(function (value) {
    setForm((prev) => ({ ...prev, shortDescription: value }));
    handleMdEditorDialog();
  }, []);

  // ── Reset (e.g. on modal close) ────────────────────────────────────────────

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setFile(null);
    setAdvFile(null);
    reset();
  }, []);

  return {
    form,
    file,
    advFile,
    isSubmitting,
    alert,
    showWhatsAppLinkGenDialog,
    showMdEditor,
    handleMdEditorSubmitBtnClick,
    handleMdEditorDialog,
    handleWhatsAppLinkDialog,
    handleAlertOnClose,
    handleChange,
    handleDateChange,
    handleAddTag,
    handleRemoveTag,
    setFile,
    setAdvFile,
    handleSubmit,
    resetForm,
  };
}

export default useAddJob;

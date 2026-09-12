import { useCallback, useEffect, useState } from "react";
import useAppAlert from "./useAppAlert";
import { createJob } from "../services/JobService";
import dayjs from "dayjs";
import { AddNewJobPostingSchema } from "../data/schema/AddNewJobPostingSchema";
import { showZodValidationError } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { clearJob, saveJob } from "../redux/slices/JobSlice";

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
 * @param {boolean} open - whether the modal dialog is currently open
 */
function useAddJob(onSuccess, open = false) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null); // markdown file
  const [advFile, setAdvFile] = useState(null); // PDF file
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, setAlert, handleAlertOnClose, reset, showErrorMsg } =
    useAppAlert();
  const [showWhatsAppLinkGenDialog, setShowWhatsAppLinkGenDialog] =
    useState(false);
  const [showMdEditor, setShowMdEditor] = useState(false);
  const dispatch = useDispatch();
  const draftJob = useSelector((state) => state.job);

  useEffect(() => {
    if (open && draftJob) {
      const hasDraft =
        Boolean(draftJob.title) ||
        Boolean(draftJob.applicationStartDate) ||
        Boolean(draftJob.applicationEndDate) ||
        (Array.isArray(draftJob.tags) && draftJob.tags.length > 0) ||
        Boolean(draftJob.applyLink) ||
        Boolean(draftJob.shortDescription) ||
        Boolean(draftJob.advNo);

      if (hasDraft) {
        setForm({
          title: draftJob.title || "",
          applicationStartDate:
            draftJob.applicationStartDate &&
            dayjs(draftJob.applicationStartDate).isValid()
              ? dayjs(draftJob.applicationStartDate)
              : null,
          applicationEndDate:
            draftJob.applicationEndDate &&
            dayjs(draftJob.applicationEndDate).isValid()
              ? dayjs(draftJob.applicationEndDate)
              : null,
          tags: Array.isArray(draftJob.tags) ? draftJob.tags : [],
          shortDescription: draftJob.shortDescription || "",
          advNo: draftJob.advNo || "",
          applyLink: draftJob.applyLink || "",
        });
      }
    }
  }, [open]);

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
    if (isSubmitting) return;

    reset();
    setIsSubmitting(true);

    try {
      const payload = {
        title: form.title,
        applicationStartDate:
          form.applicationStartDate && dayjs(form.applicationStartDate).isValid()
            ? dayjs(form.applicationStartDate).format("YYYY-MM-DD")
            : "",
        applicationEndDate:
          form.applicationEndDate && dayjs(form.applicationEndDate).isValid()
            ? dayjs(form.applicationEndDate).format("YYYY-MM-DD")
            : "",
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

      const applicationStartDate = dayjs(payload.applicationStartDate);
      const applicationEndDate = dayjs(payload.applicationEndDate);
      const todayDate = dayjs().startOf("day");

      if (applicationStartDate.isBefore(todayDate)) {
        throw new Error("Application start date cannot be in the past.");
      }

      if (applicationEndDate.isBefore(applicationStartDate)) {
        throw new Error(
          "Application end date cannot be before the application start date.",
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
      dispatch(clearJob());
      onSuccess?.();
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, file, advFile, onSuccess, isSubmitting, reset, dispatch, showErrorMsg]);

  const handleSaveAsDraft = useCallback(async () => {
    try {
      const startDateValid =
        form.applicationStartDate &&
        dayjs(form.applicationStartDate).isValid();
      const endDateValid =
        form.applicationEndDate &&
        dayjs(form.applicationEndDate).isValid();

      const payload = {
        title: form.title || "",
        applicationStartDate: startDateValid
          ? dayjs(form.applicationStartDate).format("YYYY-MM-DD")
          : null,
        applicationEndDate: endDateValid
          ? dayjs(form.applicationEndDate).format("YYYY-MM-DD")
          : null,
        tags: form.tags || [],
        applyLink: form.applyLink || "",
        shortDescription: form.shortDescription || "",
        advNo: form.advNo || "",
      };

      dispatch(saveJob(payload));
      setAlert({
        isOpen: true,
        message: "Job saved as draft successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving job as draft:", error);
      showErrorMsg(error);
    }
  }, [form, dispatch, setAlert, showErrorMsg]);

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
    setForm,
    handleSaveAsDraft,
  };
}

export default useAddJob;

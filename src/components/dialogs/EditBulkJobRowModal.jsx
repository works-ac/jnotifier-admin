import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Description,
  Edit,
  InsertLink,
  Numbers,
  OpenInNew,
  Title,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import AppDialogTitle from "../core/AppDialogTitle";
import AppAlert from "../AppAlert";
import TagsInput from "../core/TagsInput";
import useAppCss from "../../hooks/useAppCss";
import FlexBox from "../styled/FlexBox";
import MarkdownEditorModal from "./MarkdownEditorModal";
import useAppMdEditor from "../../hooks/core/useAppMdEditor";
import { validateBulkJobRow } from "../../data/schema/BulkJobSchema";

function getInitialForm(row) {
  if (!row) {
    return {
      title: "",
      applicationStartDate: null,
      applicationEndDate: null,
      tags: [],
      shortDescription: "",
      advNo: "",
      applyLink: "",
    };
  }

  return {
    title: row.title || "",
    applicationStartDate:
      row.applicationStartDate && dayjs(row.applicationStartDate).isValid()
        ? dayjs(row.applicationStartDate)
        : null,
    applicationEndDate:
      row.applicationEndDate && dayjs(row.applicationEndDate).isValid()
        ? dayjs(row.applicationEndDate)
        : null,
    tags: (() => {
      if (Array.isArray(row.tags)) return row.tags;
      if (typeof row.tags === "string" && row.tags.trim()) {
        return row.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
      return [];
    })(),
    shortDescription: row.shortDescription || "",
    advNo: row.advNo || "",
    applyLink: row.applyLink || "",
  };
}

function EditBulkJobRowModal({ open, row, onClose, onSave }) {
  const { RequiredFieldCss } = useAppCss();

  const [form, setForm] = useState(() => getInitialForm(row));
  const [errors, setErrors] = useState(() => row?.errors || {});
  const [alert, setAlert] = useState(null);

  const { handleMdEditorSubmitBtnClick, showMdEditor, handleMdEditorDialog } =
    useAppMdEditor(setForm);

  const onMdEditorSubmit = (value, name) => {
    handleMdEditorSubmitBtnClick(value, name);
    if (errors.shortDescription) {
      setErrors((prev) => ({ ...prev, shortDescription: null }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleDateChange = (name, dayjsVal) => {
    setForm((prev) => ({ ...prev, [name]: dayjsVal }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddTag = (tag) => {
    setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    if (errors.tags) {
      setErrors((prev) => ({ ...prev, tags: null }));
    }
  };

  const handleRemoveTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSave = () => {
    const updatedRow = {
      ...row,
      title: form.title.trim(),
      applicationStartDate: form.applicationStartDate
        ? form.applicationStartDate.format("YYYY-MM-DD")
        : "",
      applicationEndDate: form.applicationEndDate
        ? form.applicationEndDate.format("YYYY-MM-DD")
        : "",
      tags: form.tags.join(", "),
      shortDescription: form.shortDescription.trim(),
      advNo: form.advNo ? form.advNo.trim() : "",
      applyLink: form.applyLink.trim(),
      status: true,
    };

    const validation = validateBulkJobRow(updatedRow);
    updatedRow.isValid = validation.isValid;
    updatedRow.errors = validation.errors;

    if (!validation.isValid) {
      setErrors(validation.errors);
      setAlert({
        type: "error",
        message: "Please fix the validation errors before saving.",
      });
      return;
    }

    onSave(updatedRow);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <AppDialogTitle
          Icon={<Edit fontSize="small" />}
          onClose={onClose}
          title={`Edit Job: Row #${row?.rowNumber || ""}`}
          bgColor="warning.main"
        />

        <Divider />

        <DialogContent sx={{ py: 3 }}>
          {alert && (
            <AppAlert
              alert={alert}
              handleAlertOnClose={() => setAlert(null)}
              type={alert.type}
            />
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
            {/* Row 1: Title */}
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errors.title)}
              helperText={errors.title || "It can be atmost 100 characters long."}
              sx={{ fontWeight: 700, ...RequiredFieldCss }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Title fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Row 2: Dates & Adv No */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: 1, minWidth: 160 }}>
                <DatePicker
                  label="Application Start Date"
                  value={form.applicationStartDate}
                  onChange={(val) => handleDateChange("applicationStartDate", val)}
                  format="YYYY-MM-DD"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      size: "small",
                      error: Boolean(errors.applicationStartDate),
                      helperText:
                        errors.applicationStartDate ||
                        "Cannot be older than 10 days from today.",
                    },
                  }}
                  sx={RequiredFieldCss}
                />
              </Box>

              <Box sx={{ flex: 1, minWidth: 160 }}>
                <DatePicker
                  label="Application End Date"
                  value={form.applicationEndDate}
                  onChange={(val) => handleDateChange("applicationEndDate", val)}
                  format="YYYY-MM-DD"
                  minDate={form.applicationStartDate ?? undefined}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      size: "small",
                      error: Boolean(errors.applicationEndDate),
                      helperText:
                        errors.applicationEndDate ||
                        "Must be on or after start date.",
                    },
                  }}
                  sx={RequiredFieldCss}
                />
              </Box>

              <Box sx={{ flex: 1, minWidth: 160 }}>
                <TextField
                  label="Advertisement No"
                  name="advNo"
                  value={form.advNo}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  error={Boolean(errors.advNo)}
                  helperText={errors.advNo || "Optional. Max 100 characters."}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Numbers fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Row 3: Apply Link */}
            <TextField
              label="Apply Link"
              name="applyLink"
              value={form.applyLink}
              onChange={handleChange}
              fullWidth
              required
              type="url"
              error={Boolean(errors.applyLink)}
              helperText={errors.applyLink || "Valid URL format, max 250 characters."}
              sx={RequiredFieldCss}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <InsertLink fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Row 4: Short Description */}
            <TextField
              label="Job Description"
              name="shortDescription"
              required
              value={form.shortDescription}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              error={Boolean(errors.shortDescription)}
              helperText={
                errors.shortDescription ||
                "Between 10 and 700 characters. Supports Markdown."
              }
              sx={RequiredFieldCss}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1 }}
                    >
                      <Description fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FlexBox sx={{ justifyContent: "flex-end", mb: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<OpenInNew fontSize="small" />}
                onClick={handleMdEditorDialog}
              >
                Open Editor
              </Button>
            </FlexBox>

            {/* Row 5: Tags */}
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                Tags{" "}
                <Box
                  component="sup"
                  sx={(theme) => ({
                    color: theme.palette.error.main,
                    fontWeight: 700,
                  })}
                >
                  *
                </Box>
              </Typography>
              <TagsInput
                tags={form.tags}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
              />
              {errors.tags && (
                <Typography variant="caption" color="error">
                  {errors.tags}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="warning" onClick={handleSave}>
            Update Row
          </Button>
        </DialogActions>
      </Dialog>

      {showMdEditor && (
        <MarkdownEditorModal
          isOpen={showMdEditor}
          onClose={handleMdEditorDialog}
          onSubmitHandler={onMdEditorSubmit}
          name="shortDescription"
          initialValue={form.shortDescription}
        />
      )}
    </>
  );
}

EditBulkJobRowModal.propTypes = {
  open: PropTypes.bool.isRequired,
  row: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default React.memo(EditBulkJobRowModal);

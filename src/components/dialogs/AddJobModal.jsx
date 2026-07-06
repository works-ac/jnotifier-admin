import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Add,
  Close,
  Description,
  InsertLink,
  Numbers,
  Title,
  Work,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import useAddJob from "../../hooks/useAddJob";
import AppAlert from "../AppAlert";
import FileUpload from "../core/FileUpload";
import TagsInput from "../core/TagsInput";

/**
 * AddJobModal — Dialog form to create a new job listing.
 *
 * Layout (flexbox, 2–3 elements per row):
 *   Row 1: Title                              (full width)
 *   Row 2: Start Date | End Date | Adv No     (3 cols)
 *   Row 3: Apply Link | Short Description     (2 cols, description wider)
 *   Row 4: Tags                               (full width — single element)
 *   Row 5: Markdown file | PDF file           (2 equal cols)
 */
function AddJobModal({ open, onClose, onSuccess }) {
  const theme = useTheme();
  const {
    form,
    isSubmitting,
    alert,
    handleAlertOnClose,
    handleChange,
    handleDateChange,
    handleAddTag,
    handleRemoveTag,
    setFile,
    setAdvFile,
    handleSubmit,
    resetForm,
  } = useAddJob(onSuccess);

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      {/* ── Title bar ── */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: 700,
          bgcolor: "primary.main",
          color: "white",
          py: 2,
        }}
      >
        <Work fontSize="small" />
        Add New Job
      </DialogTitle>

      <Divider />

      {/* ── Form body ── */}
      <DialogContent sx={{ py: 3 }}>
        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
          maxWidth="md"
        />

        {/* Outer column — all rows stacked */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* ── Row 1: Title (full width) ── */}
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            disabled={isSubmitting}
            placeholder="e.g. Software Engineer - Government of India"
            sx={{ fontWeight: 700 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Title fontSize="small" />
                  </InputAdornment>
                ),
                style: { fontWeight: 700, color: theme.palette.primary.main },
              },
            }}
          />

          {/* ── Row 2: Start Date | End Date | Adv No (3 cols) ── */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 160 }}>
              <DatePicker
                label="Application Start Date"
                value={form.applicationStartDate}
                onChange={(val) =>
                  handleDateChange("applicationStartDate", val)
                }
                format="YYYY-MM-DD"
                disabled={isSubmitting}
                slotProps={{
                  textField: { fullWidth: true, required: true, size: "small" },
                }}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 160 }}>
              <DatePicker
                label="Application End Date"
                value={form.applicationEndDate}
                onChange={(val) => handleDateChange("applicationEndDate", val)}
                format="YYYY-MM-DD"
                disabled={isSubmitting}
                minDate={form.applicationStartDate ?? undefined}
                slotProps={{
                  textField: { fullWidth: true, required: true, size: "small" },
                }}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 160 }}>
              <TextField
                label="Advertisement No"
                name="advNo"
                value={form.advNo}
                onChange={handleChange}
                fullWidth
                required
                disabled={isSubmitting}
                placeholder="e.g. ADV/2024/001"
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

          {/* ── Row 3: Apply Link | Short Description (2 cols) ── */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <TextField
                label="Apply Link"
                name="applyLink"
                value={form.applyLink}
                onChange={handleChange}
                fullWidth
                type="url"
                required
                disabled={isSubmitting}
                placeholder="https://example.gov.in/apply"
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
            </Box>

            <Box sx={{ flex: 2, minWidth: 260 }}>
              <TextField
                label="Short Description"
                name="shortDescription"
                required
                value={form.shortDescription}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
                disabled={isSubmitting}
                placeholder="Brief description of the job posting (supports Markdown)"
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
            </Box>
          </Box>

          {/* ── Row 4: Tags (full width — single element per row) ── */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              Tags
            </Typography>
            <TagsInput
              tags={form.tags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              disabled={isSubmitting}
            />
          </Box>

          {/* ── Row 5: Markdown file | PDF file (2 equal cols) ── */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "stretch",
            }}
          >
            {/* Markdown upload */}
            <Box
              sx={{
                flex: 1,
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                Job Detail File{" "}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.disabled"
                >
                  (.md — max 5 MB)
                </Typography>
              </Typography>

              <FileUpload
                accept=".md,text/markdown"
                maxSizeMB={5}
                label="Drop Markdown file or click to browse"
                onFileChange={(f) => setFile(f)}
                disabled={isSubmitting}
                validateFile={(f) =>
                  f.name.endsWith(".md") || f.type === "text/markdown"
                }
                validateErrorMessage="Only .md (Markdown) files are accepted."
              />
            </Box>

            {/* PDF upload */}
            <Box
              sx={{
                flex: 1,
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                Advertisement PDF{" "}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.disabled"
                >
                  (.pdf — max 50 MB)
                </Typography>
              </Typography>
              <FileUpload
                accept=".pdf,application/pdf"
                maxSizeMB={50}
                label="Drop PDF file or click to browse"
                onFileChange={(f) => setAdvFile(f)}
                disabled={isSubmitting}
                validateFile={(f) =>
                  f.type === "application/pdf" || f.name.endsWith(".pdf")
                }
                validateErrorMessage="Only PDF files are accepted."
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <Divider />

      {/* ── Actions ── */}
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Close fontSize="small" />}
          onClick={handleClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={
            isSubmitting ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <Add fontSize="small" />
            )
          }
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving…" : "Add Job"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddJobModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default React.memo(AddJobModal);

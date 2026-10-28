import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CheckCircle,
  CloudUpload,
  Description,
  PictureAsPdf,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import AppDialogTitle from "../core/AppDialogTitle";
import AppAlert from "../AppAlert";
import FileUpload from "../core/FileUpload";
import Notes from "../Notes";
import { uploadJobFiles } from "../../services/JobService";
import { getToastNotification } from "../../helpers";

function UploadJobFilesModal({ open, job, onClose, onSuccess }) {
  const theme = useTheme();

  const [mdFile, setMdFile] = useState(null);
  const [advFile, setAdvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  const hasExistingAdv = Boolean(job?.advFileName);
  const hasExistingDesc = Boolean(job?.viewPageDescription);

  const handleClose = () => {
    if (isSubmitting) return;
    setMdFile(null);
    setAdvFile(null);
    setAlert(null);
    onClose();
  };

  const handleUpload = async () => {
    if (!mdFile && !advFile) {
      setAlert({
        type: "error",
        message: "Please select at least one file (Markdown or PDF) to upload.",
      });
      return;
    }

    const formData = new FormData();
    if (mdFile) {
      formData.append("file", mdFile);
    }
    if (advFile) {
      formData.append("advFile", advFile);
    }

    try {
      setIsSubmitting(true);
      setAlert(null);

      await uploadJobFiles(job?.applicationId || job?.id, formData);

      toast.success(
        `Files uploaded successfully for "${job?.title || "Job"}"!`,
        getToastNotification(),
      );

      handleClose();
      onSuccess?.();
    } catch (err) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.message ||
        "Failed to upload files. Please try again.";
      setAlert({
        type: "error",
        message: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <AppDialogTitle
        Icon={<CloudUpload fontSize="small" />}
        onClose={handleClose}
        title={`Upload Files — ${job?.title || "Job"}`}
        bgColor="info.main"
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

        {/* Existing files info */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            bgcolor: (t) => t.palette.action.hover,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Job: {job?.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Application ID: {job?.applicationId || job?.id}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {hasExistingDesc ? (
              <Chip
                icon={<CheckCircle fontSize="small" />}
                label="Markdown Description Present"
                size="small"
                color="success"
                variant="outlined"
              />
            ) : (
              <Chip
                label="No Markdown Description"
                size="small"
                variant="outlined"
              />
            )}

            {hasExistingAdv ? (
              <Chip
                icon={<PictureAsPdf fontSize="small" />}
                label="PDF Advertisement Present"
                size="small"
                color="info"
                variant="outlined"
              />
            ) : (
              <Chip
                label="No PDF Advertisement"
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </Paper>

        {/* File upload areas */}
        <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
          {/* Markdown detail file */}
          <Box sx={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Description fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Job Detail File{" "}
                <Typography component="span" variant="caption" color="text.secondary">
                  (.md — max 5 MB)
                </Typography>
              </Typography>
            </Box>

            <FileUpload
              accept=".md,text/markdown"
              maxSizeMB={5}
              label="Drop Markdown (.md) file or click to browse"
              onFileChange={(f) => setMdFile(f)}
              disabled={isSubmitting}
              validateFile={(f) =>
                f.name.endsWith(".md") || f.type === "text/markdown"
              }
              validateErrorMessage="Only .md (Markdown) files are accepted."
            />
          </Box>

          {/* Advertisement PDF file */}
          <Box sx={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PictureAsPdf fontSize="small" color="error" />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Advertisement PDF{" "}
                <Typography component="span" variant="caption" color="text.secondary">
                  (.pdf — max 50 MB)
                </Typography>
              </Typography>
            </Box>

            <FileUpload
              accept=".pdf,application/pdf"
              maxSizeMB={50}
              label="Drop Advertisement (.pdf) file or click to browse"
              onFileChange={(f) => setAdvFile(f)}
              disabled={isSubmitting}
              validateFile={(f) =>
                f.type === "application/pdf" || f.name.endsWith(".pdf")
              }
              validateErrorMessage="Only PDF files are accepted."
            />
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Notes
            note="Uploading a new file will overwrite the existing file/description for this job."
            noteColor={theme.palette.info.main}
          />
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={(!mdFile && !advFile) || isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <CloudUpload fontSize="small" />
            )
          }
        >
          {isSubmitting ? "Uploading..." : "Upload Files"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UploadJobFilesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  job: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default React.memo(UploadJobFilesModal);

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import React, { useCallback } from "react";
import AddNoticeDialogDataLayout from "../../layouts/data/AddNoticeDialogDataLayout";
import useAddNoticeAlert from "../../hooks/dialogs/useAddNoticeAlert";
import TagsInput from "../core/TagsInput";
import useTagsInput from "../../hooks/core/useTagsInput";
import FileUpload from "../core/FileUpload";
import { Add, Close, Drafts, OpenInNew } from "@mui/icons-material";
import AppAlert from "../AppAlert";
import Notes from "../../components/Notes";
import useAppCss from "../../hooks/useAppCss";
import useAppMdEditor from "../../hooks/core/useAppMdEditor";
import MarkdownEditorModal from "./MarkdownEditorModal";
import FlexBox from "../styled/FlexBox";

function AddNoticeAlert({ onClose, onSuccess, isOpen }) {
  const theme = useTheme();
  const {
    handleTextboxOnChange,
    setForm,
    setNoticeAdvFile,
    form,
    alert,
    handleAdd,
    handleAlertOnClose,
    isSubmitting,
    handleSaveAsDraft,
    resetForm,
  } = useAddNoticeAlert(isOpen);
  const { handleAddTag, handleRemoveTag } = useTagsInput(setForm);
  const { RequiredFieldCss } = useAppCss();
  const { showMdEditor, handleMdEditorDialog, handleMdEditorSubmitBtnClick } =
    useAppMdEditor(setForm);

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  }, [isSubmitting, resetForm, onClose]);

  const handleAddBtnClick = useCallback(
    async function (e) {
      e.preventDefault();
      await handleAdd(onSuccess, onClose);
    },
    [handleAdd, onSuccess, onClose],
  );

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullWidth>
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
          <NotificationImportantIcon fontSize="small" />
          Add New Job Alert
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ py: 3 }}>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <AppAlert
              alert={alert}
              handleAlertOnClose={handleAlertOnClose}
              type={alert?.type}
            />

            {AddNoticeDialogDataLayout.map((field) => (
              <TextField
                key={field.id}
                id={field.id}
                name={field.name}
                label={field.label}
                type={field.type}
                required={field.required}
                multiline={field.multiline}
                fullWidth
                value={form[field.name]}
                placeholder={field.placeholder}
                rows={field.rows}
                onChange={handleTextboxOnChange}
                slotProps={field.slotProps ? field.slotProps : {}}
                sx={RequiredFieldCss}
                helperText={field.helperText}
              />
            ))}

            <FlexBox sx={{ my: 1, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<OpenInNew fontSize="small" />}
                onClick={handleMdEditorDialog}
                disabled={form.noticeDesc.length > 2500}
              >
                Open Editor
              </Button>
            </FlexBox>

            <TagsInput
              tags={form.tags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              disabled={isSubmitting}
              isRequired
            />

            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600, pl: 1 }}
              >
                Notice Advertisement File
              </Typography>

              <FileUpload
                accept=".md,text/markdown"
                maxSizeMB={5}
                label="Drop Markdown file or click to browse (max 5MB)"
                onFileChange={(f) => setNoticeAdvFile(f)}
                validateFile={(f) =>
                  f.name.endsWith(".md") || f.type === "text/markdown"
                }
                validateErrorMessage="Only .md (Markdown) files are accepted."
              />
            </Box>
          </Box>

          <Box component="div" sx={{ my: 1 }}>
            <Notes
              note="All the fields marked with asterisk are mandatory to fill."
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Only markdown files i.e., *.md are supported."
              noteColor={theme.palette.secondary.main}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="text"
            color="error"
            onClick={handleClose}
            startIcon={<Close fontSize="small" />}
            disabled={isSubmitting}
          >
            Close
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<Drafts fontSize="small" />}
            onClick={handleSaveAsDraft}
            disabled={isSubmitting}
          >
            Save as Draft
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
            disabled={isSubmitting || form.noticeDesc.length > 2500}
            onClick={handleAddBtnClick}
          >
            {isSubmitting ? "Adding…" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {showMdEditor && (
        <MarkdownEditorModal
          isOpen={showMdEditor}
          name="noticeDesc"
          initialValue={form.noticeDesc}
          onClose={handleMdEditorDialog}
          onSubmitHandler={handleMdEditorSubmitBtnClick}
        />
      )}
    </>
  );
}

export default AddNoticeAlert;

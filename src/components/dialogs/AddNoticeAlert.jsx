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
import { Add, Close } from "@mui/icons-material";
import AppAlert from "../AppAlert";
import Notes from "../../components/Notes";
import useAppCss from "../../hooks/useAppCss";

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
  } = useAddNoticeAlert();
  const { handleAddTag, handleRemoveTag } = useTagsInput(setForm);
  const { RequiredFieldCss } = useAppCss();

  const handleAddBtnClick = useCallback(
    async function (e) {
      e.preventDefault();
      await handleAdd(onSuccess, onClose);
    },
    [handleAdd],
  );

  return (
    <Dialog open={isOpen} maxWidth="lg" fullWidth>
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
            />
          ))}

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

      <DialogActions>
        <Button
          variant="text"
          color="error"
          onClick={onClose}
          startIcon={<Close fontSize="small" />}
        >
          Close
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={onClose}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={16} color="secondary" />
            ) : (
              <Add fontSize="small" />
            )
          }
          disabled={isSubmitting}
          onClick={handleAddBtnClick}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNoticeAlert;

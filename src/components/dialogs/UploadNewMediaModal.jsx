import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import { Close, UploadFile } from "@mui/icons-material";
import useUploadNewMediaModal from "../../hooks/dialogs/useUploadNewMediaModal";
import FileUpload from "../core/FileUpload";
import AppAlert from "../AppAlert";
import Notes from "../Notes";

function UploadNewMediaModal({ onClose, isOpen = false, onSuccess }) {
  const theme = useTheme();
  const { GlobalDialogTitle } = useAppCss();
  const {
    setFile,
    alert,
    handleAlertOnClose,
    handleNewFileUploadBtn,
    isLoading,
  } = useUploadNewMediaModal(onClose, onSuccess);

  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth>
      <Box
        sx={{
          ...GlobalDialogTitle,
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "start",
          py: 0,
          rowGap: 0,
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            p: 1,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={(theme) => ({
              color: "white",
              borderRadius: 2,
              "&:hover": {
                color: "white",
                backgroundColor: theme.palette.error.main,
              },
            })}
          >
            <Close fontSize="medium" />
          </IconButton>
        </Box>

        <DialogTitle sx={{ display: "flex", gap: 1 }}>
          <UploadFile fontSize="small" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: "Roboto" }}
          >
            Upload Media
          </Typography>
        </DialogTitle>
      </Box>

      <Divider />

      <DialogContent sx={{ my: 2 }}>
        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <Box component="div" sx={{ my: 1, pl: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            Please upload your media below by clicking on the Upload button or
            directly dropping the file in the highlighted area.
          </Typography>
        </Box>

        <FileUpload
          accept=".pdf,.png,.jpeg,.jpg"
          maxSizeMB={10}
          label="Drop pdf/image files or click to browse (max 10MB)"
          onFileChange={(f) => setFile(f)}
          validateFile={(f) =>
            f.name.endsWith(".pdf") ||
            f.name.endsWith(".jpg") ||
            f.name.endsWith(".png") ||
            f.name.endsWith(".jpeg")
          }
          validateErrorMessage="Only .pdf/.png/.jpeg/.jpg files are accepted."
          disabled={isLoading}
        />

        <Box component="div" sx={{ mt: 1 }}>
          <Notes
            note="Only PDF and image files are supported."
            noteColor={theme.palette.secondary.main}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="secondary" />
            ) : (
              <UploadFile fontSize="small" />
            )
          }
          onClick={handleNewFileUploadBtn}
          disabled={isLoading}
          color="success"
          size="small"
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UploadNewMediaModal;

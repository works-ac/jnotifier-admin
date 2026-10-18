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
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import { Close, Security, UploadFile } from "@mui/icons-material";
import useUploadNewMediaModal from "../../hooks/dialogs/useUploadNewMediaModal";
import FileUpload from "../core/FileUpload";
import Captcha from "../Captcha";
import AppAlert from "../AppAlert";
import Notes from "../Notes";

function UploadNewMediaModal({ onClose, isOpen = false, onSuccess }) {
  const theme = useTheme();
  const { GlobalDialogTitle, RequiredFieldCss } = useAppCss();
  const {
    setFile,
    captcha,
    handleCaptchaChange,
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

        {/* Captcha verification */}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mt: 2.5,
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Captcha />
          </Box>

          <TextField
            label="Captcha Code"
            name="captcha"
            placeholder="Ex:- edh26w"
            value={captcha}
            onChange={handleCaptchaChange}
            fullWidth
            required
            disabled={isLoading}
            sx={RequiredFieldCss}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Security fontSize="small" color="primary" />
                  </InputAdornment>
                ),
              },
            }}
            helperText="Please enter the captcha characters shown above."
          />
        </Box>

        <Box component="div" sx={{ mt: 1.5 }}>
          <Notes
            note="Only PDF and image files are supported."
            noteColor={theme.palette.secondary.main}
          />
          <Notes
            note="Fields marked with asterisk (*) are mandatory to fill."
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

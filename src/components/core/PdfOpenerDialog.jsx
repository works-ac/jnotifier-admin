import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import PdfViewer from "./PdfViewer";
import { Close, Fullscreen } from "@mui/icons-material";
import usePdfDialog from "../../hooks/core/usePdfDialog";

function PdfOpenerDialog({
  isOpen,
  onClose,
  pdfBlob,
  title,
  isDownloadable = false,
}) {
  const { isFullScreen, toggleFullScreen } = usePdfDialog();

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      aria-labelledby="pdf-opener-dialog-title"
      aria-describedby="pdf-opener-dialog-description"
      open={isOpen}
      fullScreen={isFullScreen}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton onClick={toggleFullScreen}>
          <Fullscreen fontSize="small" color="primary" />
        </IconButton>

        <IconButton onClick={onClose}>
          <Close fontSize="small" color="error" />
        </IconButton>
      </Box>

      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <PdfViewer file={pdfBlob} disableDownloadable={!isDownloadable} />
      </DialogContent>
    </Dialog>
  );
}

PdfOpenerDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pdfBlob: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  isDownloadable: PropTypes.bool,
};

export default React.memo(PdfOpenerDialog);

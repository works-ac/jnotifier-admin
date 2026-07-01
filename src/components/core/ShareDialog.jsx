import {
  CheckCircleOutlineOutlined,
  Close,
  ContentCopy,
  Link,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

/**
 * Reusable ShareDialog component.
 *
 * Props:
 *  - open        {boolean}  Whether the dialog is visible.
 *  - onClose     {Function} Callback to close the dialog.
 *  - url         {string}   The URL to display / copy. Falls back to globalThis.location.href.
 *  - title       {string}   Optional custom dialog title.
 */
function ShareDialog({
  open,
  onClose,
  url,
  title = "Share this link",
  recruitmentTitle,
  recruitmentDesc,
}) {
  const theme = useTheme();
  const shareUrl = url || globalThis.location.href;
  const content = `${recruitmentTitle}

  ${recruitmentDesc}

  CLICK THE LINK GIVEN BELOW TO APPLY 👇👇👇👇

  ${shareUrl}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silently fail if clipboard is not available
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="share-dialog-title"
      aria-describedby="share-dialog-description"
      PaperProps={{
        elevation: 6,
        sx: {
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle
        id="share-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.secondary.A700}`,
          pb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link fontSize="small" sx={{ color: theme.palette.primary.A700 }} />
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Tooltip title="Close">
          <IconButton
            id="share-dialog-close-btn"
            size="small"
            onClick={onClose}
            aria-label="close share dialog"
            sx={{
              color: theme.palette.secondary.main,
              "&:hover": { color: theme.palette.error.main },
              transition: "color 0.25s ease",
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      {/* ── Content ── */}
      <DialogContent sx={{ my: 2 }}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 0.75,
            color: theme.palette.secondary.main,
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Sharable Content
        </Typography>

        <TextField
          id="share-dialog-url-input"
          value={content}
          fullWidth
          disabled
          sx={{
            textAlign: "justify",
          }}
          multiline
        />

        {/* ── Copied caption ── */}
        <Typography
          id="share-dialog-copied-caption"
          variant="caption"
          sx={{
            display: "block",
            mt: 0.75,
            minHeight: "1.2em",
            color: copied ? theme.palette.success.main : "transparent",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            transition: "color 0.3s ease",
            userSelect: "none",
          }}
        >
          Url copied on the clipboard
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          startIcon={
            copied ? (
              <CheckCircleOutlineOutlined fontSize="small" />
            ) : (
              <ContentCopy fontSize="small" />
            )
          }
          onClick={handleCopy}
          color={copied ? "success" : "primary"}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  recruitmentTitle: PropTypes.string,
  recruitmentDesc: PropTypes.string,
};

export default React.memo(ShareDialog);

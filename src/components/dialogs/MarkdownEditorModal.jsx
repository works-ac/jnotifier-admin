import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import useAppCss from "../../hooks/useAppCss";
import { BorderColor, Close, Save } from "@mui/icons-material";
import { useSelector } from "react-redux";

function MarkdownEditorModal({ onClose, onSubmitHandler, isOpen, name = "" }) {
  const { GlobalPaperCss, GlobalDialogTitle } = useAppCss();
  const { shortDescription } = useSelector((state) => state.job);
  const [value, setValue] = useState(shortDescription || "");

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
          bgcolor: "primary.main",
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
          <BorderColor fontSize="small" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: "Roboto" }}
          >
            Markdown Editor
          </Typography>
        </DialogTitle>
      </Box>

      <DialogContent>
        <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: "justify" }}>
            Info:- Please use the markdown editor to format your content. You
            can use the toolbar above the editor to apply formatting, or you can
            write markdown syntax directly in the editor. The preview will
            update in real-time as you type. Use the full-screen mode (available
            at topmost right corner of the editor) for a better editing
            experience. Once you are done, click the "Save" button to save your
            changes.
          </Typography>

          <Divider sx={{ mb: 1 }} />

          <MDEditor value={value} onChange={setValue} height={500} />
        </Paper>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          size="small"
          color="success"
          startIcon={<Save fontSize="small" />}
          onClick={() => onSubmitHandler(value, name)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(MarkdownEditorModal);

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
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import { Close, Phone, WhatsApp } from "@mui/icons-material";
import useWhatsAppLinkGenModal from "../../hooks/dialogs/useWhatsAppLinkGenModal";
import Notes from "../Notes";

function WhatsAppLinkGeneratorModal({ onClose, isOpen }) {
  const theme = useTheme();
  const { GlobalDialogTitle, RequiredFieldCss } = useAppCss();
  const { details, showCnfTxt, handleSubmitBtn, handleTextBoxOnChange } =
    useWhatsAppLinkGenModal();

  return (
    <Dialog maxWidth="md" open={isOpen} fullWidth>
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
          <WhatsApp fontSize="small" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: "Roboto" }}
          >
            WhatsApp Link Generator
          </Typography>
        </DialogTitle>
      </Box>

      <DialogContent>
        <TextField
          label="Mobile"
          placeholder="Ex:- +91- 9646560123"
          value={details.mobile}
          name="mobile"
          onChange={handleTextBoxOnChange}
          sx={{ ...RequiredFieldCss, my: 1 }}
          required
          fullWidth
          autoComplete="off"
          autoFocus
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Phone fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          type="tel"
        />

        <TextField
          label="Message"
          placeholder="Please send your resume"
          value={details.message}
          name="message"
          onChange={handleTextBoxOnChange}
          fullWidth
          autoComplete="off"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Phone fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          type="tel"
          multiline
          sx={{ my: 1 }}
        />

        {showCnfTxt && (
          <Box component="div" sx={{ my: 1 }}>
            <Typography
              variant="body1"
              color="success"
              sx={{ fontWeight: 700 }}
            >
              Your link has been copied to the clipboard!!!
            </Typography>
          </Box>
        )}

        <Box component="div" sx={{ my: 1 }}>
          <Notes
            note="All the fields marked with asterisk (*) are mandatory to fill"
            noteColor={theme.palette.secondary.main}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleSubmitBtn(details.mobile, details.message)}
        >
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(WhatsAppLinkGeneratorModal);

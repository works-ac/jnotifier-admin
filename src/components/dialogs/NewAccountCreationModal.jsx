import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import { Close, PersonAdd } from "@mui/icons-material";
import AccountRegisterationPage from "../../pages/sa/AccountRegisterationPage";

function NewAccountCreationModal({ onClose, onSuccess, isOpen }) {
  const { GlobalDialogTitle } = useAppCss();

  return (
    <Dialog fullWidth maxWidth="lg" open={isOpen}>
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
          <PersonAdd fontSize="small" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: "Roboto" }}
          >
            New Admin Account Registration
          </Typography>
        </DialogTitle>
      </Box>

      <DialogContent>
        <AccountRegisterationPage onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}

export default NewAccountCreationModal;

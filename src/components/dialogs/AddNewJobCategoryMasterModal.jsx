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
import PropTypes from "prop-types";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import FlexBox from "../styled/FlexBox";
import { Add, Close, Work } from "@mui/icons-material";
import useAddNewJobCategoryMasterModal from "../../hooks/dialogs/useAddNewJobCategoryMasterModal";
import AppAlert from "../AppAlert";
import Notes from "../Notes";

function AddNewJobCategoryMasterModal({ isOpen, onClose, onSuccess }) {
  const theme = useTheme();
  const { GlobalDialogTitle, RequiredFieldCss } = useAppCss();
  const {
    handleTextboxOnChange,
    handleAlertOnClose,
    handleAddBtnClick,
    isSubmitting,
    alert,
    payload,
  } = useAddNewJobCategoryMasterModal(onSuccess, onClose);

  return (
    <Dialog maxWidth="lg" fullWidth open={isOpen}>
      <Box
        component="div"
        sx={{
          ...GlobalDialogTitle,
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          py: 0,
          rowGap: 0,
        }}
      >
        <FlexBox
          sx={{
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
              "&:hover": { backgroundColor: theme.palette.error.main },
            })}
          >
            <Close fontSize="medium" />
          </IconButton>
        </FlexBox>

        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Work fontSize="small" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: "Roboto" }}
          >
            Add Job Category
          </Typography>
        </DialogTitle>
      </Box>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <TextField
          label="Job Category Name"
          required
          fullWidth
          name="jobCategoryName"
          sx={RequiredFieldCss}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Work fontSize="small" color="primary" />
                </InputAdornment>
              ),
              style: {
                fontWeight: 700,
                color: theme.palette.primary.main,
              },
            },
          }}
          value={payload.jobCategoryName}
          onChange={handleTextboxOnChange}
          autoFocus
        />

        <Box component="div" sx={{ my: 1 }}>
          <Notes
            note="All fields marked with asterisk (*) are mandatory to fill."
            noteColor={theme.palette.secondary.main}
          />
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="contained"
          startIcon={
            isSubmitting ? (
              <CircularProgress size={16} color="secondary" />
            ) : (
              <Add fontSize="small" />
            )
          }
          size="small"
          disabled={isSubmitting}
          color="success"
          onClick={handleAddBtnClick}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddNewJobCategoryMasterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddNewJobCategoryMasterModal;

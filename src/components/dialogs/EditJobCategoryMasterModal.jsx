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
import useAppCss from "../../hooks/useAppCss";
import FlexBox from "../styled/FlexBox";
import { Close, Edit, Security, Work } from "@mui/icons-material";
import useEditJobCategoryMasterModal from "../../hooks/dialogs/useEditJobCategoryMasterModal";
import AppAlert from "../AppAlert";
import Notes from "../Notes";
import Captcha from "../Captcha";

function EditJobCategoryMasterModal({
  isOpen,
  onClose,
  onSuccess,
  categoryDetails,
}) {
  const theme = useTheme();
  const { GlobalDialogTitle, RequiredFieldCss } = useAppCss();
  const {
    handleTextboxOnChange,
    handleCaptchaChange,
    handleAlertOnClose,
    handleUpdateBtnClick,
    isSubmitting,
    alert,
    payload,
    captcha,
  } = useEditJobCategoryMasterModal(categoryDetails, onSuccess, onClose);

  return (
    <Dialog maxWidth="sm" fullWidth open={isOpen}>
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
          <Edit fontSize="small" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: "Roboto" }}
          >
            Edit Job Category
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
          placeholder="Ex:- IT, Banking, Teaching"
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
            disabled={isSubmitting}
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
              <Edit fontSize="small" />
            )
          }
          size="small"
          disabled={isSubmitting}
          color="warning"
          onClick={handleUpdateBtnClick}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditJobCategoryMasterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  categoryDetails: PropTypes.shape({
    id: PropTypes.number,
    categoryName: PropTypes.string,
    isActive: PropTypes.bool,
    isDeleted: PropTypes.bool,
  }),
};

export default EditJobCategoryMasterModal;

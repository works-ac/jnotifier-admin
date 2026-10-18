import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Business,
  Category,
  Edit,
  LocationOn,
  Male,
  Person,
  Phone,
  QuestionMark,
} from "@mui/icons-material";
import AppDialogTitle from "../core/AppDialogTitle";
import AppAlert from "../AppAlert";
import Notes from "../Notes";
import ConfirmationDialog from "../ConfirmationDialog";
import useAppCss from "../../hooks/useAppCss";
import useEditAccount from "../../hooks/dialogs/useEditAccount";

const CATEGORY_OPTIONS = ["GEN", "EWS", "OBC", "SC", "ST"];

const GENDER_OPTIONS = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "T", label: "Transgender" },
];

function EditAccount({ isOpen, onClose, onSuccess, profile }) {
  const theme = useTheme();
  const { RequiredFieldCss } = useAppCss();
  const {
    form,
    handleChange,
    validateForm,
    handleSubmit,
    isSubmitting,
    alert,
    handleAlertOnClose,
  } = useEditAccount(profile, isOpen);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    onClose();
  }, [isSubmitting, onClose]);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateForm()) {
        setShowConfirm(true);
      }
    },
    [validateForm],
  );

  const handleConfirmCancel = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const handleConfirmOk = useCallback(async () => {
    try {
      await handleSubmit(onSuccess, onClose);
    } finally {
      setShowConfirm(false);
    }
  }, [handleSubmit, onSuccess, onClose]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <AppDialogTitle
          Icon={<Edit fontSize="small" />}
          onClose={handleClose}
          title="Edit Account Profile"
          bgColor="warning.main"
        />

        <Divider />

        <DialogContent sx={{ py: 3 }}>
          <AppAlert
            alert={alert}
            handleAlertOnClose={handleAlertOnClose}
            type={alert?.type}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* Full Name */}
            <TextField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              fullWidth
              required
              disabled={isSubmitting}
              placeholder="e.g. John Doe"
              sx={{ fontWeight: 700, ...RequiredFieldCss }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              helperText="Full name must be between 3 and 64 characters."
            />

            {/* Mobile & Gender */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <TextField
                  label="Mobile Number"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  fullWidth
                  disabled={isSubmitting}
                  placeholder="e.g. 9876543210"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                  helperText="Optional. Must be exactly 10 digits."
                />
              </Box>

              <Box sx={{ flex: 1, minWidth: 200 }}>
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  fullWidth
                  required
                  disabled={isSubmitting}
                  sx={RequiredFieldCss}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Male fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                >
                  {GENDER_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>

            {/* Category */}
            <TextField
              select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
              disabled={isSubmitting}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Category fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              helperText="Optional. Select your applicable category."
            >
              <MenuItem value="">
                <em>None / Unspecified</em>
              </MenuItem>
              {CATEGORY_OPTIONS.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            {/* Company Name */}
            <TextField
              label="Company Name"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              fullWidth
              disabled={isSubmitting}
              placeholder="e.g. Acme Corporation"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              helperText="Optional. 4 to 64 characters."
            />

            {/* Company Address */}
            <TextField
              label="Company Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              multiline
              disabled={isSubmitting}
              placeholder="e.g. 123 Business Hub, 5th Floor, City"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1 }}
                    >
                      <LocationOn fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              helperText="Optional. 4 to 128 characters."
            />
          </Box>

          <Box component="div" sx={{ mt: 2 }}>
            <Notes
              note="Fields marked with asterisk (*) are required."
              noteColor={theme.palette.secondary.main}
            />
            <Notes
              note="Username, email and date of birth cannot be modified here for security reasons."
              noteColor={theme.palette.secondary.main}
            />
          </Box>
        </DialogContent>

        <Divider />

        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <Edit fontSize="small" />
              )
            }
            onClick={handleFormSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating…" : "Update Profile"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog before updating profile */}
      {showConfirm && (
        <ConfirmationDialog
          open={showConfirm}
          Icon={QuestionMark}
          heading="Confirm Update Profile"
          isLoading={isSubmitting}
          text={
            <Typography
              sx={{ textAlign: "justify", fontWeight: 600 }}
              variant="body2"
            >
              Are you sure you want to update your profile details? The changes will
              be applied immediately to your account.
            </Typography>
          }
          onCancel={handleConfirmCancel}
          onSuccess={handleConfirmOk}
        />
      )}
    </>
  );
}

EditAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  profile: PropTypes.object,
};

export default React.memo(EditAccount);

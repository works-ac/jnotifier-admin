import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Close, Edit, QuestionMark } from "@mui/icons-material";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import useUpdateNoticeAlert from "../../hooks/dialogs/useUpdateNoticeAlert";
import useTagsInput from "../../hooks/core/useTagsInput";
import TagsInput from "../core/TagsInput";
import AppAlert from "../AppAlert";
import Notes from "../Notes";
import useAppCss from "../../hooks/useAppCss";
import ConfirmationDialog from "../ConfirmationDialog";

/**
 * UpdateNoticeAlertModal
 *
 * Allows editing noticeTitle, noticeDesc and tags of an existing notice.
 * noticeDetailedAdv, isActive and isDeleted are intentionally excluded
 * per the product requirement — those fields are read-only.
 *
 * Flow:
 *  1. User edits fields and clicks "Update".
 *  2. A ConfirmationDialog is shown.
 *  3. On "OK", updateNotice API is called.
 */
function UpdateNoticeAlertModal({ isOpen, onClose, onSuccess, noticeDetails }) {
  const theme = useTheme();
  const { RequiredFieldCss } = useAppCss();

  const {
    form,
    setForm,
    handleTextboxOnChange,
    handleUpdate,
    isSubmitting,
    alert,
    handleAlertOnClose,
  } = useUpdateNoticeAlert(noticeDetails);

  const { handleAddTag, handleRemoveTag } = useTagsInput(setForm);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdateBtnClick = useCallback(function (e) {
    e.preventDefault();
    setShowConfirm(true);
  }, []);

  const handleConfirmOk = useCallback(
    async function () {
      await handleUpdate(onSuccess, onClose);
      setShowConfirm(false);
    },
    [handleUpdate, onSuccess, onClose],
  );

  const handleConfirmCancel = useCallback(function () {
    setShowConfirm(false);
  }, []);

  const fields = [
    {
      id: "noticeTitle",
      name: "noticeTitle",
      label: "Notice Title",
      type: "text",
      required: true,
      multiline: false,
      rows: undefined,
      placeholder: "e.g. RRB Recruitment Short Notice",
    },
    {
      id: "noticeDesc",
      name: "noticeDesc",
      label: "Notice Description",
      type: "text",
      required: true,
      multiline: true,
      rows: 4,
      placeholder: "Brief description of the notice",
    },
  ];

  return (
    <>
      <Dialog open={isOpen} maxWidth="lg" fullWidth>
        {/* ── Title bar ── */}
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 700,
            bgcolor: "warning.main",
            color: "white",
            py: 2,
          }}
        >
          <NotificationImportantIcon fontSize="small" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: "Roboto" }}
          >
            Update Notice
          </Typography>
        </DialogTitle>

        <Divider />

        {/* ── Form body ── */}
        <DialogContent sx={{ py: 3 }}>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <AppAlert
              alert={alert}
              handleAlertOnClose={handleAlertOnClose}
              type={alert?.type}
            />

            {fields.map((field) => (
              <TextField
                key={field.id}
                id={field.id}
                name={field.name}
                label={field.label}
                type={field.type}
                required={field.required}
                multiline={field.multiline}
                fullWidth
                value={form[field.name] ?? ""}
                placeholder={field.placeholder}
                rows={field.rows}
                onChange={handleTextboxOnChange}
                disabled={isSubmitting}
                sx={RequiredFieldCss}
              />
            ))}

            <TagsInput
              tags={form.tags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              disabled={isSubmitting}
              isRequired
            />
          </Box>

          <Box component="div" sx={{ my: 1 }}>
            <Notes
              note="All the fields marked with asterisk are mandatory to fill."
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Notice detailed advertisement is not editable."
              noteColor={theme.palette.secondary.main}
            />
          </Box>
        </DialogContent>

        <Divider />

        {/* ── Actions ── */}
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="text"
            color="error"
            onClick={onClose}
            disabled={isSubmitting}
            startIcon={<Close fontSize="small" />}
          >
            Close
          </Button>

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
            disabled={isSubmitting}
            onClick={handleUpdateBtnClick}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Confirmation before API call ── */}
      {showConfirm && (
        <ConfirmationDialog
          open={showConfirm}
          Icon={QuestionMark}
          heading="Confirm Update"
          isLoading={isSubmitting}
          text={
            <Typography
              sx={{ textAlign: "justify", fontWeight: 600 }}
              variant="body2"
            >
              Are you sure you want to update this job alert? The changes will
              be applied immediately and will be visible to users.
            </Typography>
          }
          onCancel={handleConfirmCancel}
          onSuccess={handleConfirmOk}
        />
      )}
    </>
  );
}

UpdateNoticeAlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  noticeDetails: PropTypes.object,
};

export default React.memo(UpdateNoticeAlertModal);

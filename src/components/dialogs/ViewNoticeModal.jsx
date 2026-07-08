import {
  Check,
  Close,
  DeleteForever,
  ExpandMore,
  Sell,
  Visibility,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import useAppCss from "../../hooks/useAppCss";
import Markdown from "react-markdown";
import useViewNoticeModal from "../../hooks/dialogs/useViewNoticeModal";
import CircularProgressLoader from "../../components/CircluarProgressLoader";
import PropTypes from "prop-types";

function ViewNoticeModal({
  isOpen = false,
  onClose = () => {},
  noticeDetails = {},
}) {
  const theme = useTheme();
  const {
    GlobalDialogTitle,
    GlobalNormalChipCss,
    GlobalChipCss,
    GlobalAccordianCss,
  } = useAppCss();
  const { isLoading, viewsDetails } = useViewNoticeModal();

  if (!isOpen) return null;

  if (isLoading)
    return (
      <CircularProgressLoader
        text="We're loading some of the data related to this notice, please wait..."
        takeHeight
      />
    );

  return (
    <Dialog maxWidth="lg" fullWidth open={isOpen}>
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
          <Visibility fontSize="small" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: "Roboto" }}
          >
            Notice Details
          </Typography>
        </DialogTitle>
      </Box>

      <DialogContent sx={{ my: 2 }}>
        <Box
          component="div"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {noticeDetails.title}
          </Typography>

          <Box component="div" sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={noticeDetails.isActive ? "Active" : "In-Active"}
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: noticeDetails.isActive
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                backgroundColor: "white",
                border: noticeDetails.isActive
                  ? `1px solid ${theme.palette.success.main}`
                  : `1px solid ${theme.palette.error.main}`,
                outline: "none",
                fontWeight: 700,
                fontFamily: "Roboto, Arial, sans-serif",
                textTransform: "uppercase",
              })}
              icon={
                noticeDetails?.isActive ? (
                  <Check fontSize="small" color="success" />
                ) : (
                  <Close fontSize="small" color="error" />
                )
              }
            />

            <Chip
              label={`${viewsDetails?.pageViews ?? 0} Views`}
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: theme.palette.success.main,
                backgroundColor: "white",
                border: `1px solid ${theme.palette.success.main}`,
                outline: "none",
                fontWeight: 700,
                fontFamily: "Roboto, Arial, sans-serif",
                textTransform: "uppercase",
              })}
              icon={<Visibility fontSize="small" color="success" />}
            />

            {noticeDetails?.isDeleted && (
              <Chip
                label="Deleted"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.error.main,
                  backgroundColor: "white",
                  border: `1px solid ${theme.palette.error.main}`,
                  outline: "none",
                  fontWeight: 700,
                  fontFamily: "Roboto, Arial, sans-serif",
                  textTransform: "uppercase",
                })}
                icon={<DeleteForever fontSize="small" color="error" />}
              />
            )}
          </Box>
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          {noticeDetails.tags
            ?.split(",")
            .filter((item) => item.trim())
            .map((item) => (
              <Chip
                label={item}
                key={item}
                sx={{
                  ...GlobalChipCss,
                  fontFamily: "Roboto, Arial, sans-serif",
                }}
                icon={<Sell fontSize="small" color="success" />}
              />
            ))}
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            textAlign: "justify",
          }}
        >
          <Markdown>{noticeDetails.noticeDescription}</Markdown>
        </Box>

        {noticeDetails.noticeDetailedAdv && (
          <Accordion sx={GlobalAccordianCss} defaultExpanded>
            <AccordionSummary
              aria-controls={`detailed-notice-content`}
              id={`detailed-notice-header`}
              expandIcon={<ExpandMore fontSize="small" />}
            >
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: theme.palette.primary.A700,
                }}
              >
                Detailed Notice
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box
                component="div"
                sx={{ mb: 2, fontFamily: "Arial", textAlign: "justify" }}
              >
                <Markdown>{noticeDetails?.noticeDetailedAdv}</Markdown>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </DialogContent>
    </Dialog>
  );
}

ViewNoticeModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  noticeDetails: PropTypes.object,
};

export default ViewNoticeModal;

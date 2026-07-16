import {
  Check,
  Close,
  DeleteForever,
  ExpandMore,
  Link,
  Refresh,
  Sell,
  Share,
  Visibility,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import useAppCss from "../../hooks/useAppCss";
import Markdown from "react-markdown";
import useViewNoticeModal from "../../hooks/dialogs/useViewNoticeModal";
import CircularProgressLoader from "../../components/CircluarProgressLoader";
import PropTypes from "prop-types";
import FlexBox from "../styled/FlexBox";
import useViews from "../../hooks/core/useViews";
import AppTooltip from "../core/AppTooltip";
import remarkGfm from "remark-gfm";
import ShareDialog from "../core/ShareDialog";
import dayjs from "dayjs";

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
  const {
    isLoading,
    viewsDetails,
    isRefreshing,
    handleRefreshPageViews,
    handleGetPageViews,
  } = useViews("/notice");
  const {
    handleCopyLinkBtn,
    handleShareDialogOnClose,
    isCopied,
    showShareDialog,
  } = useViewNoticeModal();

  useEffect(() => {
    if (isOpen && noticeDetails) {
      handleGetPageViews(noticeDetails.id);
    }
  }, [noticeDetails, isOpen]);

  const refreshView = useCallback(
    async function () {
      if (isOpen && noticeDetails) {
        await handleRefreshPageViews(noticeDetails.id);
      }
    },
    [noticeDetails, isOpen],
  );

  if (!isOpen) return null;

  if (isLoading)
    return (
      <CircularProgressLoader
        text="We're loading some of the data related to this notice, please wait..."
        takeHeight
      />
    );

  return (
    <>
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

        <DialogContent sx={{ mt: 2 }}>
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
                label={`${viewsDetails?.views ?? 0} Views`}
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

          <FlexBox sx={{ flexDirection: "column", mb: 1, pl: 0.5 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontFamily: "Roboto, Arial, sans-serif" }}
            >
              Notice ID: {noticeDetails?.id}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontFamily: "Roboto, Arial, sans-serif" }}
            >
              Post Date: {dayjs(noticeDetails?.createdAt).format("DD-MM-YYYY")}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontFamily: "Roboto, Arial, sans-serif" }}
            >
              Last modified date:{" "}
              {dayjs(noticeDetails?.updatedAt).format("DD-MM-YYYY")}
            </Typography>
          </FlexBox>

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

          <FlexBox sx={{ justifyContent: "flex-end", alignItems: "center" }}>
            <AppTooltip
              title="Click here to refresh the view count of this notice."
              placement="left-end"
            >
              <Chip
                label="Refresh"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  border: `1px solid ${theme.palette.primary.main}`,
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                })}
                icon={
                  isRefreshing ? (
                    <CircularProgress size={16} color="secondary" />
                  ) : (
                    <Refresh fontSize="small" color="primary" />
                  )
                }
                clickable
                onClick={refreshView}
              />
            </AppTooltip>
          </FlexBox>
          <Divider sx={{ my: 1 }} />

          <Box
            component="fieldset"
            sx={{
              borderRadius: 2,
              borderStyle: "dashed",
              mb: 1,
              borderColor: "primary.A700",
            }}
          >
            <Box component="legend">
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, color: "primary.A700" }}
              >
                Short Description
              </Typography>
            </Box>

            <Box
              component="div"
              sx={{
                mb: 1,
                textAlign: "justify",
              }}
            >
              <Markdown remarkPlugins={[remarkGfm]}>
                {noticeDetails?.noticeDescription}
              </Markdown>
            </Box>
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
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {noticeDetails?.noticeDetailedAdv}
                  </Markdown>
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: "secondary.A50" }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Share fontSize="small" />}
            size="small"
            onClick={handleShareDialogOnClose}
          >
            Share
          </Button>

          <Button
            variant="outlined"
            color={isCopied ? "success" : "secondary"}
            startIcon={
              isCopied ? <Check fontSize="small" /> : <Link fontSize="small" />
            }
            onClick={() =>
              handleCopyLinkBtn(
                import.meta.env.VITE_PRODUCTION_ADMIN_PANEL_URL +
                  "/notice/" +
                  noticeDetails?.id,
              )
            }
            size="small"
          >
            {isCopied ? "Copied" : "Copy Job Link"}
          </Button>
        </DialogActions>
      </Dialog>

      {showShareDialog && (
        <ShareDialog
          onClose={handleShareDialogOnClose}
          open={showShareDialog}
          recruitmentDesc={noticeDetails?.noticeDescription}
          recruitmentTitle={noticeDetails?.title}
          contentHeading="New Notice Update"
          url={
            import.meta.env.VITE_PRODUCTION_ADMIN_PANEL_URL +
            "/notice/" +
            noticeDetails?.id
          }
          title="Share Window"
        />
      )}
    </>
  );
}

ViewNoticeModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  noticeDetails: PropTypes.object,
};

export default ViewNoticeModal;

import {
  CalendarMonth,
  Check,
  Close,
  DeleteForever,
  Download,
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
import CircularProgressLoader from "../../components/CircluarProgressLoader";
import PropTypes from "prop-types";
import useViews from "../../hooks/core/useViews";
import FlexBox from "../styled/FlexBox";
import AppTooltip from "../core/AppTooltip";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";
import useViewJobModal from "../../hooks/dialogs/useViewJobModal";
import ShareDialog from "../core/ShareDialog";

function ViewJobModal({ isOpen = false, onClose = () => {}, jobDetails = {} }) {
  const theme = useTheme();
  const {
    GlobalDialogTitle,
    GlobalNormalChipCss,
    GlobalChipCss,
    GlobalAccordianCss,
  } = useAppCss();
  const {
    isLoading,
    isRefreshing,
    viewsDetails,
    handleGetPageViews,
    handleRefreshPageViews,
  } = useViews("/jobs");
  const {
    handleDownloadAdvPdfBtn,
    handleShareDialogOnClose,
    handleCopyLinkBtn,
    isCopied,
    showShareDialog,
    isDownloading,
  } = useViewJobModal(jobDetails);

  useEffect(() => {
    if (isOpen && jobDetails) {
      handleGetPageViews(jobDetails.applicationId);
    }
  }, [jobDetails, isOpen]);

  const refreshView = useCallback(
    async function () {
      if (isOpen && jobDetails) {
        await handleRefreshPageViews(jobDetails.applicationId);
      }
    },
    [jobDetails, isOpen],
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
              {jobDetails.title}
            </Typography>

            <Box component="div" sx={{ display: "flex", gap: 1 }}>
              <Chip
                label={jobDetails.status ? "Active" : "In-Active"}
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: jobDetails.status
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                  backgroundColor: "white",
                  border: jobDetails.status
                    ? `1px solid ${theme.palette.success.main}`
                    : `1px solid ${theme.palette.error.main}`,
                  outline: "none",
                  fontWeight: 700,
                  fontFamily: "Roboto, Arial, sans-serif",
                  textTransform: "uppercase",
                })}
                icon={
                  jobDetails?.status ? (
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

              {jobDetails?.isDeleted && (
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

          <FlexBox sx={{ my: 1, flexDirection: "column" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontFamily: "Roboto, Arial, sans-serif" }}
            >
              Application ID: {jobDetails?.applicationId}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontFamily: "Roboto, Arial, sans-serif" }}
            >
              Advertisement No: {jobDetails?.advNo}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontFamily: "Roboto, Arial, sans-serif" }}
            >
              Posted on: {dayjs(jobDetails?.createdOn).format("DD-MM-YYYY")}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontFamily: "Roboto, Arial, sans-serif" }}
            >
              Last modified date:{" "}
              {dayjs(jobDetails?.lastUpdatedOn).format("DD-MM-YYYY")}
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
            {jobDetails.tags
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

          <FlexBox sx={{ gap: 1 }}>
            <Chip
              label={jobDetails?.applicationStartDate}
              sx={GlobalChipCss}
              icon={<CalendarMonth fontSize="small" color="success" />}
            />

            <Chip
              label={jobDetails?.applicationEndDate}
              sx={GlobalChipCss}
              icon={<CalendarMonth fontSize="small" color="success" />}
            />
          </FlexBox>

          <FlexBox sx={{ justifyContent: "flex-end", alignItems: "center" }}>
            <AppTooltip
              title="Click here to refresh the view count of this job listing."
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
              <Markdown rehypePlugins={[remarkGfm]}>
                {jobDetails.shortDescription}
              </Markdown>
            </Box>
          </Box>

          {jobDetails.viewPageDescription && (
            <Accordion sx={GlobalAccordianCss} defaultExpanded>
              <AccordionSummary
                aria-controls={`detailed-jobs-content`}
                id={`detailed-jobs-header`}
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
                  Detailed Advertisement
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box
                  component="div"
                  sx={{ mb: 2, fontFamily: "Arial", textAlign: "justify" }}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {jobDetails?.viewPageDescription}
                  </Markdown>
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: "secondary.A50" }}>
          <Button
            variant="outlined"
            color="success"
            disabled={isDownloading}
            startIcon={
              isDownloading ? (
                <CircularProgress size={16} color="secondary" />
              ) : (
                <Download fontSize="small" />
              )
            }
            size="small"
            onClick={handleDownloadAdvPdfBtn}
          >
            Download Advertisement PDF
          </Button>

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
                  "/jobs/" +
                  jobDetails?.applicationId,
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
          recruitmentDesc={jobDetails?.shortDescription}
          recruitmentTitle={jobDetails?.title}
          url={
            import.meta.env.VITE_PRODUCTION_ADMIN_PANEL_URL +
            "/jobs/" +
            jobDetails?.applicationId
          }
          title="Share Window"
        />
      )}
    </>
  );
}

ViewJobModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  jobDetails: PropTypes.object,
};

export default ViewJobModal;

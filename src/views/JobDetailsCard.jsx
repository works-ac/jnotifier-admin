import {
  ContentCopy,
  Download,
  ExpandMore,
  InfoOutlined,
  OpenInNew,
  Share,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Markdown from "react-markdown";
import useAppCss from "../hooks/useAppCss";
import useJobDetails from "../hooks/useJobDetails";
import { useSelector } from "react-redux";
import { AppConstants } from "../app/AppConstants";
import Notes from "../components/Notes";
import ShareDialog from "../components/core/ShareDialog";
import PdfOpenerDialog from "../components/core/PdfOpenerDialog";

function JobDetailsCard({
  applicationId,
  title,
  applicationStartDate,
  applicationEndDate,
  tags,
  shortDescription,
  applyLink,
  advNo,
  viewPageDescription,
  advFilePath,
}) {
  const theme = useTheme();
  const md = theme.breakpoints.values.md;
  const { GlobalAccordianCss } = useAppCss();
  const {
    copyDetailedAdv,
    isCopying,
    shareDialogOpen,
    shareUrl,
    advertisement,
    isDownloading,
    isPdfDialogOpen,
    handlePdfDialogOnClose,
    openShareDialog,
    closeShareDialog,
    downloadAdv,
  } = useJobDetails();
  const { userAuthStatus } = useSelector((state) => state.auth);

  return (
    <Box
      component="div"
      sx={{ minHeight: "223px", maxWidth: `${md}px`, mx: "auto", mb: 2 }}
    >
      <Card variant="elevation" elevation={4}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700 }} color="primary">
            {title}
          </Typography>

          <Typography variant="caption" color="secondary">
            Advertisement No: {advNo}
          </Typography>

          <Box component="div" sx={{ display: "flex", flexWrap: "wrap" }}>
            {tags?.split(",")?.map((tag) => (
              <Chip
                label={tag.trim()}
                key={tag}
                sx={(theme) => ({
                  mr: 1,
                  mb: 1,
                  borderRadius: "8px",
                })}
                color="success"
                icon={<InfoOutlined fontSize="small" />}
              />
            ))}
          </Box>

          <Box
            component="div"
            sx={{
              display: "flex",
              columnGap: 1,
              flexWrap: "wrap",
              my: 1,
              flexDirection: "column",
            }}
          >
            <Typography variant="body2">
              Application Start Date: {applicationStartDate}
            </Typography>
            <Typography variant="body2">
              Application End Date: {applicationEndDate}
            </Typography>
          </Box>

          <Box
            component="div"
            sx={{ mb: 2, fontFamily: "Arial", textAlign: "justify" }}
          >
            <Markdown>{shortDescription}</Markdown>
          </Box>

          <Accordion sx={GlobalAccordianCss} defaultExpanded>
            <AccordionSummary
              aria-controls={`detailed-adv-content`}
              id={`detailed-adv-header`}
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
                <Markdown>{viewPageDescription}</Markdown>
              </Box>
            </AccordionDetails>

            <AccordionActions>
              <Button
                variant="outlined"
                startIcon={
                  isCopying ? (
                    <CircularProgress size={16} color="secondary" />
                  ) : (
                    <ContentCopy fontSize="small" />
                  )
                }
                onClick={() => copyDetailedAdv(viewPageDescription)}
                disabled={isCopying}
              >
                Copy
              </Button>

              <Button
                variant="outlined"
                startIcon={<Share fontSize="small" />}
                onClick={openShareDialog}
              >
                Share
              </Button>
            </AccordionActions>
          </Accordion>

          <Box sx={{ mt: 4 }}>
            <Notes
              note="Please note that detailed advertisement accordion is only a detailed summary of full advertisement. Please download full advertisement to know completely about this vacancy."
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Please register and login yourself to use apply now and download advertisement feature"
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Kindly double check your eligibility before applying in any vacancy."
              noteColor={theme.palette.secondary.main}
            />
          </Box>
        </CardContent>

        <CardActionArea
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 0.5,
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            href={applyLink}
            target="_blank"
            startIcon={<OpenInNew fontSize="small" />}
            disabled={
              userAuthStatus?.toLowerCase() !== AppConstants.USER_AUTH_STATUS
            }
          >
            Apply
          </Button>

          <Button
            variant="contained"
            startIcon={
              isDownloading ? (
                <CircularProgress size={16} color="secondary" />
              ) : (
                <Download fontSize="small" />
              )
            }
            disabled={
              userAuthStatus?.toLowerCase() !== AppConstants.USER_AUTH_STATUS ||
              isDownloading
            }
            onClick={async () => await downloadAdv(advFilePath)}
          >
            Download Advertisement
          </Button>
        </CardActionArea>
      </Card>

      <ShareDialog
        open={shareDialogOpen}
        onClose={closeShareDialog}
        url={shareUrl}
        recruitmentDesc={shortDescription}
        recruitmentTitle={title}
        title="Share this content"
      />

      {advertisement && !isDownloading && isPdfDialogOpen && (
        <PdfOpenerDialog
          isOpen={isPdfDialogOpen}
          onClose={handlePdfDialogOnClose}
          pdfBlob={advertisement}
          title={title}
        />
      )}
    </Box>
  );
}

JobDetailsCard.propTypes = {
  applicationId: PropTypes.string,
  title: PropTypes.string.isRequired,
  applicationStartDate: PropTypes.string.isRequired,
  applicationEndDate: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  shortDescription: PropTypes.string.isRequired,
  applyLink: PropTypes.string.isRequired,
  advNo: PropTypes.string.isRequired,
  viewPageDescription: PropTypes.string.isRequired,
  advFilePath: PropTypes.string,
};

export default React.memo(JobDetailsCard);

import { InfoOutlineRounded, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Markdown from "react-markdown";

function JobListingCard({
  applicationId,
  title,
  applicationStartDate,
  applicationEndDate,
  tags,
  shortDescription,
  viewMoreLink,
  advNo,
}) {
  const theme = useTheme();
  const md = theme.breakpoints.values.md;

  return (
    <Box
      component="div"
      sx={{ maxWidth: `${md}px`, mx: "auto", mb: 2 }}
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
                label={tag?.trim()}
                key={tag}
                sx={(theme) => ({
                  mr: 1,
                  mb: 1,
                  borderRadius: "8px",
                })}
                color="success"
                icon={<InfoOutlineRounded fontSize="small" />}
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

          <Divider />

          <Box sx={{ textAlign: "justify", p: 1 }}>
            <Typography
              variant="body1"
              sx={{
                my: 1,
                py: 1,
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Description
            </Typography>

            <Markdown>{shortDescription}</Markdown>
          </Box>
        </CardContent>

        <CardActionArea
          sx={{ display: "flex", justifyContent: "flex-end", p: 0.5 }}
        >
          <Button
            variant="contained"
            startIcon={<Visibility fontSize="small" />}
            href={viewMoreLink}
            target="_blank"
          >
            View
          </Button>
        </CardActionArea>
      </Card>
    </Box>
  );
}

JobListingCard.propTypes = {
  applicationId: PropTypes.string,
  title: PropTypes.string.isRequired,
  applicationStartDate: PropTypes.string,
  applicationEndDate: PropTypes.string,
  tags: PropTypes.array,
  shortDescription: PropTypes.string,
  viewMoreLink: PropTypes.string,
  advNo: PropTypes.string.isRequired,
};

export default React.memo(JobListingCard);

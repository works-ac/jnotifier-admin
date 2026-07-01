import { Visibility } from "@mui/icons-material";
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

function ResultsListingCard({
  applicationId,
  title,
  applicationStartDate,
  applicationEndDate,
  tags,
  shortDescription,
  resultLink,
  advNo,
}) {
  const theme = useTheme();
  const md = theme.breakpoints.values.md;

  return (
    <Box
      component="div"
      sx={{ minHeight: "223px", maxWidth: `${md}px`, mx: "auto", mb: 2 }}
    >
      <Card variant="elevation" elevation={4}>
        <CardContent>
          <Typography variant="h2" sx={{ fontWeight: 700 }} color="primary">
            {title}
          </Typography>

          <Typography variant="caption" color="secondary">
            Advertisement No: {advNo}
          </Typography>

          <Box component="div" sx={{ display: "flex", flexWrap: "wrap" }}>
            {tags?.map((tag) => (
              <Chip
                label={tag}
                key={tag}
                sx={(theme) => ({
                  mr: 1,
                  mb: 1,
                  borderRadius: "8px",
                })}
                color="success"
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

          <Box
            component="div"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
            sx={{ mb: 2, fontFamily: "Arial", textAlign: "justify" }}
          ></Box>
        </CardContent>

        <CardActionArea
          sx={{ display: "flex", justifyContent: "flex-end", p: 0.5 }}
        >
          <Button
            variant="contained"
            startIcon={<Visibility fontSize="small" />}
            href={resultLink}
            target="_blank"
          >
            Show result
          </Button>
        </CardActionArea>
      </Card>
    </Box>
  );
}

ResultsListingCard.propTypes = {
  applicationId: PropTypes.string,
  title: PropTypes.string.isRequired,
  applicationStartDate: PropTypes.string,
  applicationEndDate: PropTypes.string,
  tags: PropTypes.array,
  shortDescription: PropTypes.string,
  resultLink: PropTypes.string,
  advNo: PropTypes.string.isRequired,
};

export default React.memo(ResultsListingCard);

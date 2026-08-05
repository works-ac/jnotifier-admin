import React from "react";
import { Box, Typography } from "@mui/material";
import ResponsiveImage from "../components/core/ResponsiveImage";

function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexGrow: 1,
        gap: 3,
      }}
    >
      <ResponsiveImage
        src="/logo.png"
        alt="JNotifier Logo"
        aspectRatio="1/1"
        maxWidth="240px"
      />

      <Typography variant="h2" sx={{ fontWeight: 900 }} color="primary">
        Welcome to Job Notifier
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: 700, textAlign: "center", fontStyle: "oblique" }}
        color="primary"
      >
        a product of Coding Works
      </Typography>
    </Box>
  );
}

export default React.memo(HomePage);

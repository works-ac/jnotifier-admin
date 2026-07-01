import React from "react";
import { Box, Typography } from "@mui/material";

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
      <Box
        component="img"
        src="/logo.png"
        alt="JNotifier Logo"
        sx={{
          width: 240,
          height: 240,
          objectFit: "contain",
          borderRadius: "50%",
        }}
      />

      <Typography variant="h4" sx={{ fontWeight: 700 }} color="primary">
        Welcome to JNotifier Admin Panel
      </Typography>
    </Box>
  );
}

export default React.memo(HomePage);

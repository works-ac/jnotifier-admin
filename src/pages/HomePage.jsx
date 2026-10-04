import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import NavbarLogo from "../components/core/NavbarLogo";
import { useSelector } from "react-redux";
import { getRoleName } from "../helpers";

function HomePage() {
  const { userRole } = useSelector((state) => state.auth);
  const appVersion = import.meta.env.VITE_APP_VERSION ?? "0.0.0";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexGrow: 1,
        gap: 1,
      }}
    >
      <NavbarLogo src="/logo.png" alt="Job Notifier Logo" height={256} />

      <Typography
        variant="h2"
        sx={{ fontWeight: 900, fontFamily: "Roboto, sans-serif" }}
        color="primary"
      >
        Welcome to Job Notifier Admin Panel
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          fontStyle: "oblique",
          fontFamily: "Roboto, sans-serif",
        }}
        color="primary"
      >
        a product of Coding Works
      </Typography>

      <Divider
        sx={{
          width: "50%",
          maxWidth: "80%",
          borderColor: "secondary.main",
          my: 0.5,
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          fontFamily: "Roboto, sans-serif",
        }}
        color="primary"
      >
        v{appVersion}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          fontFamily: "Roboto, sans-serif",
        }}
        color="primary"
      >
        You're currently logged in as {getRoleName(userRole)}
      </Typography>
    </Box>
  );
}

export default React.memo(HomePage);

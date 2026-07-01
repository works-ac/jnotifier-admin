import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import useHeader from "../hooks/useHeader";

function Header() {
  const { appConnectivity, isLoading } = useHeader();

  const getConnectivityText = (status) => {
    if (status === "pong") return "ONLINE";
    return "Offline";
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box component="div" sx={{ maxWidth: "3rem", maxHeight: "3rem" }}>
              <Box
                component="img"
                src="/logo.png"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
              >
                Job Notifier
              </Typography>
              <Typography
                variant="caption"
                color="secondary"
                sx={{ fontWeight: 500 }}
              >
                Admin Panel
              </Typography>
            </Box>
          </Box>

          {/* Connectivity indicator */}
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            Connectivity:{" "}
            {isLoading
              ? "Checking…"
              : getConnectivityText(appConnectivity)}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default React.memo(Header);

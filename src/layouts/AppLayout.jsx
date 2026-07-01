import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/core/Sidebar";

/**
 * AppLayout — root layout for all routes.
 *
 * Responsibilities:
 *   - Render the collapsible left-side Sidebar.
 *   - Render the Outlet (page content) in the remaining space.
 *
 * Authentication is handled at the route level in AppRouter via
 * <CheckAuthStatus> wrappers — NOT here.
 */
export default function AppLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((prev) => !prev)}
      />

      {/* Main content area fills all remaining horizontal space */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "../components/core/Sidebar";
import Appbar from "../components/Appbar";
import Footer from "../components/core/Footer";
import { AppConstants } from "../app/AppConstants";

/**
 * AppLayout — root layout for all routes.
 *
 * Responsibilities:
 *   - Render the collapsible left-side Sidebar ONLY when the user is authenticated.
 *   - Render the top Appbar ONLY when the user is authenticated.
 *   - Render the Outlet (page content) in the remaining space.
 *   - Render the Footer below the Outlet.
 *
 * Authentication is handled at the route level in AppRouter via
 * <CheckAuthStatus> wrappers — NOT here. AppLayout merely reads the
 * already-resolved auth status from Redux to decide sidebar & appbar visibility.
 */
export default function AppLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { userAuthStatus } = useSelector((state) => state.auth);

  const isAuthenticated =
    userAuthStatus?.trim().toLowerCase() === AppConstants.USER_AUTH_STATUS;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar is only visible to authenticated users */}
      {isAuthenticated && (
        <Sidebar
          expanded={sidebarExpanded}
          onToggle={() => setSidebarExpanded((prev) => !prev)}
        />
      )}

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
        {/* Top Appbar for authenticated users */}
        {isAuthenticated && <Appbar />}
        
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

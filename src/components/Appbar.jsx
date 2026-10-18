import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import useAppbar from "../hooks/useAppbar";
import ConfirmationDialog from "./ConfirmationDialog";

/**
 * Appbar Component
 *
 * Displays a top navigation bar for authenticated users featuring:
 * - Welcome message with the logged-in user's name on the left
 * - Logout button on the right
 * - Arranged using justifyContent: "space-between"
 */
function Appbar() {
  const {
    loggedInName,
    profilePicture,
    isLoggingOut,
    showLogoutConfirm,
    openLogoutConfirm,
    closeLogoutConfirm,
    handleConfirmLogout,
  } = useAppbar();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer,
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 3 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Welcome, <logged in name> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              src={profilePicture}
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              {loggedInName?.charAt(0)?.toUpperCase() || "A"}
            </Avatar>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: "text.primary",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Welcome,{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                {loggedInName}
              </Box>
            </Typography>
          </Box>

          {/* Logout button */}
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={
              isLoggingOut ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <Logout fontSize="small" />
              )
            }
            disabled={isLoggingOut}
            onClick={openLogoutConfirm}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Logout confirmation dialog */}
      <ConfirmationDialog
        open={showLogoutConfirm}
        heading="Confirm Logout"
        Icon={Logout}
        text="Are you sure you want to logout?"
        isLoading={isLoggingOut}
        onSuccess={handleConfirmLogout}
        onCancel={closeLogoutConfirm}
      />
    </>
  );
}

export default React.memo(Appbar);

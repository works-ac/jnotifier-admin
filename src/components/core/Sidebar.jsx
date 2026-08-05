import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import { SidebarNavData } from "../../data/SidebarData";
import { getRoleName } from "../../helpers";

const DRAWER_EXPANDED_WIDTH = 240;
const DRAWER_COLLAPSED_WIDTH = 64;

/**
 * Returns only the nav items that the current user's role is allowed to see.
 * If an item has no `roles` field (or roles is null/empty), it is always visible.
 *
 * @param {Array}       navData  – full SidebarNavData array
 * @param {string|null} userRole – role string from Redux (e.g. "ADMIN", "USER")
 * @returns {Array}
 */
function filterNavByRole(navData, userRole) {
  return navData.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true;
    if (!userRole) return false;
    return item.roles.includes(userRole.toUpperCase());
  });
}

/**
 * Sidebar — collapsible left-side permanent Drawer with role-based menu rendering.
 *
 * Props:
 *   expanded  – boolean
 *   onToggle  – () => void
 *
 * State consumed from Redux:
 *   auth.userRole – drives which menu items are visible
 */
function Sidebar({ expanded, onToggle }) {
  const drawerWidth = expanded ? DRAWER_EXPANDED_WIDTH : DRAWER_COLLAPSED_WIDTH;
  const { userRole } = useSelector((state) => state.auth);
  const appVersion = import.meta.env.VITE_APP_VERSION ?? "0.0.0";

  const visibleNavItems = filterNavByRole(SidebarNavData, userRole);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: expanded
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          boxShadow: "2px 0 8px rgba(0,0,0,0.06)",
        },
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: expanded
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowX: "hidden",
        }}
      >
        {/* ── Logo / Branding header ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: expanded ? "space-between" : "center",
            px: expanded ? 2 : 1,
            py: 1.5,
            minHeight: 64,
          }}
        >
          {expanded ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                sx={{
                  width: 36,
                  height: 36,
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap" }}
              >
                Job Notifier
              </Typography>
              <IconButton
                onClick={onToggle}
                size="small"
                sx={{
                  bgcolor: "action.hover",
                  "&:hover": { bgcolor: "action.selected" },
                }}
                aria-label="Collapse sidebar"
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            /* Collapsed: clicking the logo expands the sidebar */
            <IconButton onClick={onToggle} aria-label="Expand sidebar">
              <Box
                component="img"
                src="/logo.png"
                sx={{
                  width: 48,
                  height: 48,
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          )}
        </Box>

        <Divider />

        {/* ── Role-filtered navigation items ── */}
        <List sx={{ flexGrow: 1, pt: 1 }}>
          {visibleNavItems.map((item) =>
            item.children ? (
              <NavGroup
                key={item.id}
                item={item}
                sidebarExpanded={expanded}
                onExpandSidebar={onToggle}
              />
            ) : (
              <NavItem key={item.id} item={item} sidebarExpanded={expanded} />
            ),
          )}
        </List>

        <Divider />

        {/* ── Footer ── */}
        {expanded && (
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Job Notifier Admin Panel
            </Typography>

            {userRole && (
              <Typography
                variant="caption"
                color="secondary"
                sx={{ display: "block", fontWeight: 700 }}
              >
                Role: {getRoleName(userRole)}
              </Typography>
            )}

            <Typography
              variant="caption"
              color="secondary"
              sx={{ display: "block", fontWeight: 700 }}
            >
              Version: v{appVersion}
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

Sidebar.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default React.memo(Sidebar);

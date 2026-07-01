import React, { useEffect, useRef, useState } from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";

/**
 * NavGroup — expandable/collapsible sidebar navigation group.
 *
 * Props:
 *   item             – { id, label, icon, children: [{ id, label, icon, href }] }
 *   sidebarExpanded  – boolean: sidebar is wide (true) or icon-only (false)
 *   onExpandSidebar  – () => void: called when user clicks the group icon while
 *                      the sidebar is collapsed — expands the sidebar so the
 *                      sub-menu becomes visible.
 *
 * Behaviour:
 *   - Collapsed sidebar: clicking the group icon calls onExpandSidebar() and
 *     queues the sub-menu to open once the sidebar has expanded.
 *   - Expanded sidebar: clicking the group header toggles the sub-menu.
 *   - Sub-menu closes automatically when the sidebar collapses.
 *   - Group header gets the active (warning.main) highlight when any child
 *     route is currently active.
 */
function NavGroup({ item, sidebarExpanded, onExpandSidebar }) {
  const [open, setOpen] = useState(false);
  const pendingOpenRef = useRef(false); // queued open while sidebar was collapsed
  const location = useLocation();
  const Icon = item.icon;

  // Detect whether any child is the current route
  const hasActiveChild = item.children.some(
    (child) => location.pathname === child.href || location.pathname.startsWith(child.href + "/"),
  );

  // When the sidebar expands and we had a pending open request, open the sub-menu
  useEffect(() => {
    if (sidebarExpanded && pendingOpenRef.current) {
      pendingOpenRef.current = false;
      setOpen(true);
    }
  }, [sidebarExpanded]);

  // Close sub-menu when sidebar collapses
  useEffect(() => {
    if (!sidebarExpanded) setOpen(false);
  }, [sidebarExpanded]);

  const handleToggle = () => {
    if (!sidebarExpanded) {
      // Sidebar is collapsed — expand it first, then open sub-menu
      pendingOpenRef.current = true;
      onExpandSidebar?.();
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* ── Group header button ── */}
      <Tooltip title={!sidebarExpanded ? item.label : ""} placement="right" arrow>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={handleToggle}
            sx={{
              minHeight: 48,
              px: 2,
              justifyContent: sidebarExpanded ? "initial" : "center",
              borderRadius: "10px",
              mx: 1,
              mb: 0.5,
              transition: "background 0.2s",
              // Highlight header when a child route is active
              ...(hasActiveChild && {
                bgcolor: "warning.main",
                color: "white",
                "& .MuiListItemIcon-root": { color: "white" },
                "&:hover": { bgcolor: "warning.dark" },
              }),
              ...(!hasActiveChild && {
                "&:hover": { bgcolor: "action.hover" },
              }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sidebarExpanded ? 2 : "auto",
                justifyContent: "center",
                color: hasActiveChild ? "inherit" : "secondary.main",
              }}
            >
              <Icon fontSize="small" />
            </ListItemIcon>

            {sidebarExpanded && (
              <>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: { fontSize: "0.875rem", fontWeight: 600 },
                  }}
                />
                {open ? (
                  <ExpandLessIcon fontSize="small" sx={{ color: hasActiveChild ? "inherit" : "text.secondary" }} />
                ) : (
                  <ExpandMoreIcon fontSize="small" sx={{ color: hasActiveChild ? "inherit" : "text.secondary" }} />
                )}
              </>
            )}
          </ListItemButton>
        </ListItem>
      </Tooltip>

      {/* ── Collapsible children (only visible when sidebar is expanded) ── */}
      {sidebarExpanded && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children.map((child) => {
              const ChildIcon = child.icon;
              return (
                <ListItem key={child.id} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    component={RouterLink}
                    to={child.href}
                    end
                    sx={{
                      minHeight: 40,
                      pl: 5,
                      pr: 2,
                      borderRadius: "10px",
                      mx: 1,
                      mb: 0.5,
                      transition: "background 0.2s",
                      "&.active": {
                        bgcolor: "warning.main",
                        color: "white",
                        "& .MuiListItemIcon-root": { color: "white" },
                      },
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
                      <ChildIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={child.label}
                      slotProps={{
                        primary: { fontSize: "0.8rem", fontWeight: 500 },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}

NavGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.elementType.isRequired,
        href: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  sidebarExpanded: PropTypes.bool.isRequired,
  onExpandSidebar: PropTypes.func,
};

export default React.memo(NavGroup);

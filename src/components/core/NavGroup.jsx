import React, { useEffect, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
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

/**
 * NavGroup — an expandable/collapsible sidebar navigation group.
 *
 * Props:
 *   item          – { id, label, icon, children: [{ id, label, icon, href }] }
 *   sidebarExpanded – boolean; controls collapsed vs expanded layout
 *
 * Behaviour:
 *   - Sub-menu only opens when the sidebar is expanded.
 *   - Sub-menu closes automatically when the sidebar collapses.
 */
function NavGroup({ item, sidebarExpanded }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  // Close sub-menu when sidebar collapses
  useEffect(() => {
    if (!sidebarExpanded) setOpen(false);
  }, [sidebarExpanded]);

  const handleToggle = () => {
    // Prevent opening sub-menu while sidebar is in icon-only mode
    if (!sidebarExpanded) return;
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* Group header button */}
      <Tooltip
        title={!sidebarExpanded ? item.label : ""}
        placement="right"
        arrow
      >
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
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sidebarExpanded ? 2 : "auto",
                justifyContent: "center",
                color: "secondary.main",
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
                  <ExpandLessIcon
                    fontSize="small"
                    sx={{ color: "text.secondary" }}
                  />
                ) : (
                  <ExpandMoreIcon
                    fontSize="small"
                    sx={{ color: "text.secondary" }}
                  />
                )}
              </>
            )}
          </ListItemButton>
        </ListItem>
      </Tooltip>

      {/* Collapsible children — only rendered when sidebar is expanded */}
      {sidebarExpanded && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children.map((child) => {
              const ChildIcon = child.icon;
              return (
                <ListItem
                  key={child.id}
                  disablePadding
                  sx={{ display: "block" }}
                >
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
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 2,
                        color: "inherit",
                      }}
                    >
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

export default React.memo(NavGroup);

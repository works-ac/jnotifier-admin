import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

/**
 * NavItem — a simple, non-expandable sidebar navigation link.
 *
 * Props:
 *   item          – { id, label, icon, href }
 *   sidebarExpanded – boolean; controls collapsed vs expanded layout
 */
function NavItem({ item, sidebarExpanded }) {
  const Icon = item.icon;

  return (
    <Tooltip
      title={!sidebarExpanded ? item.label : ""}
      placement="right"
      arrow
    >
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          component={RouterLink}
          to={item.href}
          end
          sx={{
            minHeight: 48,
            px: 2,
            justifyContent: sidebarExpanded ? "initial" : "center",
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
              mr: sidebarExpanded ? 2 : "auto",
              justifyContent: "center",
              color: "secondary.main",
            }}
          >
            <Icon fontSize="small" />
          </ListItemIcon>

          {sidebarExpanded && (
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: { fontSize: "0.875rem", fontWeight: 600 },
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}

export default React.memo(NavItem);

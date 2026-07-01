import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

/**
 * Sidebar navigation data with role-based visibility.
 *
 * Each item may have:
 *   - id        : unique string key
 *   - label     : display text
 *   - icon      : MUI icon component
 *   - href      : route path (for simple items without children)
 *   - roles     : string[] — which roles can see this item.
 *                 Omitting `roles` (or setting it to null) means the item
 *                 is visible to ALL authenticated users.
 *   - children  : child nav items (makes this item an expandable group)
 *
 * Supported role values (must match what getMe() API returns):
 *   "ADMIN"  — full admin access
 *   "USER"   — regular user
 *   null/[]  — visible to everyone
 */
export const SidebarNavData = [
  // ── Visible to all authenticated users ──────────────────────────────────
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    href: "/",
    roles: null, // all roles
  },

  {
    id: "jobs",
    label: "Jobs",
    icon: WorkIcon,
    roles: ["ROLE_ADMIN"], // all roles
    children: [
      {
        id: "listed-jobs",
        label: "Listed Jobs",
        icon: SearchIcon,
        href: "/jobs/listed",
      },
    ],
  },

  {
    id: "account",
    label: "My Account",
    icon: PersonIcon,
    href: "/account",
    roles: null,
  },

  {
    id: "notifications",
    label: "Notifications",
    icon: NotificationsIcon,
    href: "/notifications",
    roles: null,
  },

  // ── Admin-only section ───────────────────────────────────────────────────
  {
    id: "admin",
    label: "Administration",
    icon: AdminPanelSettingsIcon,
    roles: ["ADMIN"], // only ADMIN can see this group
    children: [
      {
        id: "admin-users",
        label: "Manage Users",
        icon: PeopleIcon,
        href: "/admin/users",
      },
      {
        id: "admin-stats",
        label: "Statistics",
        icon: BarChartIcon,
        href: "/admin/stats",
      },
    ],
  },

  // ── Settings (all roles) ─────────────────────────────────────────────────
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
    roles: null,
    children: [
      {
        id: "settings-profile",
        label: "Edit Profile",
        icon: PersonIcon,
        href: "/settings/profile",
      },
      {
        id: "settings-info",
        label: "About",
        icon: InfoIcon,
        href: "/settings/about",
      },
    ],
  },
];

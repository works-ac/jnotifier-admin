import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import MovieIcon from "@mui/icons-material/Movie";
import {
  Dashboard,
  HelpCenter,
  People,
  Settings,
  Storage,
} from "@mui/icons-material";

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
 *   "ROLE_ADMIN"  — full admin access
 *   "ROLE_USER"   — regular user
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
      {
        id: "job-alerts",
        label: "Job Alerts",
        icon: AddAlertIcon,
        href: "/jobs/notices",
      },
    ],
  },
  {
    id: "media",
    label: "Media",
    icon: MovieIcon,
    roles: ["ROLE_ADMIN"],
    href: "/medias",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Dashboard,
    roles: ["ROLE_SUPERADMIN"],
    href: "/dashboard",
  },
  {
    id: "user-mgmt",
    label: "User Management",
    icon: People,
    roles: ["ROLE_SUPERADMIN"],
    href: "/sa/user-management",
  },
  {
    id: "masters",
    label: "Masters",
    icon: Storage,
    roles: ["ROLE_SUPERADMIN"],
    children: [
      {
        id: "job-categories",
        label: "Job Categories",
        icon: WorkIcon,
        href: "/masters/job-categories",
      },
    ],
  },
  {
    id: "utilities",
    label: "Utilities",
    icon: Settings,
    roles: ["ROLE_ADMIN"],
    href: "/utilities",
  },
  {
    id: "help",
    label: "Help Center",
    icon: HelpCenter,
    roles: ["ROLE_ADMIN", "ROLE_SUPERADMIN"],
    href: "/help",
  },
  {
    id: "account",
    label: "My Account",
    icon: PersonIcon,
    href: "/account",
    roles: null,
  },
];

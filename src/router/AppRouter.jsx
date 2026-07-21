import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import CheckAuthStatus from "../components/CheckAuthStatus";

// Pages
import HomePage from "../pages/HomePage";
import ResultsPage from "../pages/ResultsPage";
import NotFoundPage from "../pages/NotFoundPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import AccountsPage from "../pages/AccountsPage";
import AccountRegisterationPage from "../pages/AccountRegisterationPage";
import RecoverAccountPage from "../pages/RecoverAccountPage";
import ListedJobs from "../pages/ListedJobs";
import NoticeListingPage from "../pages/NoticeListingPage";
import MediaPage from "../pages/MediaPage";
import DashboardPage from "../pages/DashboardPage";
import CheckPermissionStatus from "../components/core/CheckPermissionStatus";
import JobCategoryMasterPage from "../pages/JobCategoryMasterPage";

/**
 * Route structure:
 *
 *  Public  (no auth required) — rendered as-is inside AppLayout:
 *    /account          → AccountsPage  (shows Login view when unauthenticated)
 *    /register         → AccountRegisterationPage
 *    /recover/account  → RecoverAccountPage
 *
 *  Protected (requires authentication) — wrapped with <CheckAuthStatus>:
 *    /                 → HomePage
 *    /results          → ResultsPage
 *    /jobs/:id         → JobDetailsPage
 *    *                 → NotFoundPage
 *
 *  CheckAuthStatus calls getMe(), stores the auth status + role in Redux,
 *  and redirects unauthenticated users to /account unless they're already
 *  on a public path.
 */
const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <CheckAuthStatus>
            <CheckPermissionStatus
              allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}
            >
              <HomePage />
            </CheckPermissionStatus>
          </CheckAuthStatus>
        ),
      },
      {
        path: "jobs/listed",
        element: (
          <CheckAuthStatus>
            <CheckPermissionStatus allowedRoles={["ROLE_ADMIN"]}>
              <ListedJobs />
            </CheckPermissionStatus>
          </CheckAuthStatus>
        ),
      },
      {
        path: "jobs/notices",
        element: (
          <CheckAuthStatus>
            <CheckPermissionStatus allowedRoles={["ROLE_ADMIN"]}>
              <NoticeListingPage />
            </CheckPermissionStatus>
          </CheckAuthStatus>
        ),
      },
      {
        path: "account",
        element: <AccountsPage />,
      },
      {
        path: "recover/account",
        element: <RecoverAccountPage />,
      },
      {
        path: "medias",
        element: (
          <CheckAuthStatus>
            <CheckPermissionStatus allowedRoles={["ROLE_ADMIN"]}>
              <MediaPage />
            </CheckPermissionStatus>
          </CheckAuthStatus>
        ),
      },
      {
        path: "dashboard",
        element: (
          <CheckAuthStatus>
            <CheckPermissionStatus allowedRoles={["ROLE_SUPERADMIN"]}>
              <DashboardPage />
            </CheckPermissionStatus>
          </CheckAuthStatus>
        ),
      },
      {
        path: "masters/job-categories",
        element: (
          <CheckAuthStatus>
            <CheckPermissionStatus allowedRoles={["ROLE_SUPERADMIN"]}>
              <JobCategoryMasterPage />
            </CheckPermissionStatus>
          </CheckAuthStatus>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default AppRoutes;

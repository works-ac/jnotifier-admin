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
            <HomePage />
          </CheckAuthStatus>
        ),
      },
      {
        path: "jobs/listed",
        element:
          <CheckAuthStatus>
            <ListedJobs />
          </CheckAuthStatus>
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
        path: "*",
        element: (
          <NotFoundPage />
        ),
      },
    ],
  },
]);

export default AppRoutes;

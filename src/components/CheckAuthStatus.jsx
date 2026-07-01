import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useAuthStatus from "../hooks/useAuthStatus";
import CircluarProgressLoader from "./CircluarProgressLoader";
import AppAlert from "./AppAlert";
import { AppConstants } from "../app/AppConstants";

/**
 * Public paths that are accessible WITHOUT authentication.
 * CheckAuthStatus will NOT redirect when the user is already on one of these.
 */
const PUBLIC_PATHS = ["/account", "/recover/account", "/register"];

/**
 * CheckAuthStatus — auth guard wrapper component.
 *
 * Usage:
 *   Wrap any route element that requires authentication:
 *   <CheckAuthStatus><ProtectedPage /></CheckAuthStatus>
 *
 * Behaviour:
 *   1. Calls getMe() on mount via useAuthStatus hook.
 *   2. Shows a full-page loading spinner while checking.
 *   3. If unauthenticated AND current path is NOT a public path → redirects to /account.
 *   4. Renders children once authenticated (or on a public path).
 */
function CheckAuthStatus({ children }) {
  const { alert, checkUserAuthStatus, handleAlertOnClose, isLoading } =
    useAuthStatus();
  const { userAuthStatus } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkUserAuthStatus();
  }, []);

  // After the check resolves, redirect if not authenticated and not on a public route
  useEffect(() => {
    if (isLoading) return;

    const isAuthenticated =
      userAuthStatus?.trim().toLowerCase() === AppConstants.USER_AUTH_STATUS;

    if (!isAuthenticated && !PUBLIC_PATHS.includes(location.pathname)) {
      navigate("/account", { replace: true });
    }
  }, [isLoading, userAuthStatus, location.pathname, navigate]);

  if (isLoading)
    return <CircluarProgressLoader text="Please wait..." takeHeight />;

  return (
    <>
      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {children}
    </>
  );
}

CheckAuthStatus.propTypes = {
  children: PropTypes.node,
};

export default React.memo(CheckAuthStatus);

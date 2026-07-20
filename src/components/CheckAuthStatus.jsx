import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useAuthStatus from "../hooks/useAuthStatus";
import CircluarProgressLoader from "./CircluarProgressLoader";
import AppAlert from "./AppAlert";
import { AppConstants } from "../app/AppConstants";

const PUBLIC_PATHS = ["/account", "/recover/account", "/register"];

function CheckAuthStatus({ children }) {
  const { alert, checkUserAuthStatus, handleAlertOnClose, isLoading } =
    useAuthStatus();
  const { userAuthStatus } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkUserAuthStatus();
  }, []);

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

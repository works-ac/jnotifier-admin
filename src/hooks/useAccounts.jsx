import { useCallback, useEffect, useState } from "react";
import { getMe, getUserProfile } from "../services/AccountsService";
import useAppAlert from "./useAppAlert";
import { useDispatch } from "react-redux";
import { setAuthUser, setUserAuthStatus } from "../redux/slices/AuthSlice";
import { UserProfile } from "../data/UserProfile";
import { AppConstants } from "../app/AppConstants";
import { logout } from "../services/SignupService";

function useAccounts() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [authStatus, setAuthStatus] = useState();
  const [profile, setProfile] = useState(UserProfile);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const dispatch = useDispatch();

  const checkUserAuthStatus = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      try {
        const response = await getMe();
        const message = response.data?.data?.message;

        setAuthStatus(message);
      } catch (error) {
        const message = error?.response?.data?.error;
        showErrorMsg(error);
        setAuthStatus(message);
      } finally {
        setIsLoading(false);
      }
    },
    [authStatus],
  );

  const loadProfile = useCallback(async function () {
    try {
      const response = await getUserProfile();
      const reply = response.data?.data;

      setProfile(reply);
      dispatch(setAuthUser(reply));
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async function () {
    setIsLoggingOut(true);

    try {
      await logout();
      globalThis.location.reload();
    } catch {
    } finally {
      setIsLoggingOut(false);
    }
  }, []);

  useEffect(() => {
    checkUserAuthStatus();
  }, []);

  useEffect(() => {
    dispatch(setUserAuthStatus({ authStatus }));
  }, [authStatus]);

  useEffect(() => {
    const status = authStatus?.trim()?.toLowerCase();
    if (status === AppConstants.USER_AUTH_STATUS) {
      setIsProfileLoading(true);
      reset();
      loadProfile();
    }
  }, [authStatus]);

  return {
    alert,
    handleAlertOnClose,
    isLoading,
    isProfileLoading,
    profile,
    isLoggingOut,
    handleLogout,
  };
}

export default useAccounts;

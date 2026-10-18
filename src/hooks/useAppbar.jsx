import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, setAuthUser } from "../redux/slices/AuthSlice";
import { getUserProfile } from "../services/AccountsService";
import { logout } from "../services/SignupService";
import { AppConstants } from "../app/AppConstants";

/**
 * useAppbar Hook
 *
 * Manages state and logic for the Appbar component:
 * - Reads user profile from Redux; fetches if not yet populated.
 * - Formats the logged-in user display name.
 * - Handles the logout flow with confirmation dialog.
 */
function useAppbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const dispatch = useDispatch();
  const { user, userAuthStatus } = useSelector((state) => state.auth);

  const isAuthenticated =
    userAuthStatus?.trim().toLowerCase() === AppConstants.USER_AUTH_STATUS;

  // Load profile if user is authenticated but user object is not yet loaded in Redux
  useEffect(() => {
    if (isAuthenticated && !user) {
      getUserProfile()
        .then((res) => {
          const profile = res.data?.data;
          if (profile) {
            dispatch(setAuthUser(profile));
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user profile in useAppbar:", err);
        });
    }
  }, [isAuthenticated, user, dispatch]);

  const loggedInName = useMemo(() => {
    return user?.fullName || user?.username || "Admin";
  }, [user]);

  const openLogoutConfirm = useCallback(() => {
    setShowLogoutConfirm(true);
  }, []);

  const closeLogoutConfirm = useCallback(() => {
    if (isLoggingOut) return;
    setShowLogoutConfirm(false);
  }, [isLoggingOut]);

  const handleConfirmLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      dispatch(clearAll());
      setShowLogoutConfirm(false);
      setIsLoggingOut(false);
      globalThis.location.reload();
    }
  }, [dispatch]);

  return {
    loggedInName,
    profilePicture: user?.profilePicture,
    isLoggingOut,
    showLogoutConfirm,
    openLogoutConfirm,
    closeLogoutConfirm,
    handleConfirmLogout,
  };
}

export default useAppbar;

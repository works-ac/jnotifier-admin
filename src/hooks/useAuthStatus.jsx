import { useCallback, useState } from "react";
import useAppAlert from "./useAppAlert";
import { getMe } from "../services/AccountsService";
import { useDispatch } from "react-redux";
import { setUserAuthStatus, setUserRole } from "../redux/slices/AuthSlice";

/**
 * useAuthStatus
 *
 * Calls getMe(), stores both the auth status AND the user's role in Redux.
 * The role drives role-based sidebar menu filtering via the Sidebar component.
 *
 * Expected getMe() response shape:
 *   { data: { data: { message: "authenticated", role: "ADMIN" | "USER" | ... } } }
 */
function useAuthStatus() {
  const [isLoading, setIsLoading] = useState(true); // true = assume loading until first check completes
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const dispatch = useDispatch();

  const checkUserAuthStatus = useCallback(async function () {
    setIsLoading(true);
    reset();

    try {
      const response = await getMe();
      const data = response.data?.data;
      const message = data?.message;
      const role = data?.role ?? null;

      const isAdminRole =
        role === "ROLE_ADMIN" ||
        role === "ROLE_SUPERADMIN" ||
        role === "ROLE_SYSADMIN";

      if (!isAdminRole) {
        dispatch(setUserAuthStatus({ authStatus: null }));
        dispatch(setUserRole({ role: null }));
        return;
      }

      dispatch(setUserAuthStatus({ authStatus: message }));
      dispatch(setUserRole({ role }));
    } catch (error) {
      showErrorMsg(error);
      dispatch(setUserAuthStatus({ authStatus: null }));
      dispatch(setUserRole({ role: null }));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, reset, showErrorMsg]);

  return { checkUserAuthStatus, isLoading, alert, handleAlertOnClose };
}

export default useAuthStatus;

import { useCallback, useEffect, useState } from "react";
import {
  getMe,
  getUserProfile,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../services/AccountsService";
import useAppAlert from "./useAppAlert";
import { useDispatch } from "react-redux";
import { setAuthUser, setUserAuthStatus } from "../redux/slices/AuthSlice";
import { UserProfile } from "../data/UserProfile";
import { AppConstants } from "../app/AppConstants";
import { logout } from "../services/SignupService";

const MAX_PHOTO_SIZE_BYTES = 1024 * 1024; // 1MB
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

function useAccounts() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);
  const [authStatus, setAuthStatus] = useState();
  const [profile, setProfile] = useState(UserProfile);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { alert, setAlert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
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

  const handleUploadPhoto = useCallback(
    async function (file) {
      if (!file) return;

      if (file.size > MAX_PHOTO_SIZE_BYTES) {
        setAlert({
          isOpen: true,
          message: "Profile picture size must not exceed 1MB.",
          type: "error",
        });
        return;
      }

      if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
        setAlert({
          isOpen: true,
          message: "Only JPG, PNG, and WEBP image files are accepted.",
          type: "error",
        });
        return;
      }

      setIsUploadingPhoto(true);
      reset();

      try {
        const formData = new FormData();
        formData.append("file", file);
        await uploadProfilePicture(formData);
        await loadProfile();
        setAlert({
          isOpen: true,
          message: "Profile picture updated successfully.",
          type: "success",
        });
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsUploadingPhoto(false);
      }
    },
    [loadProfile, reset, setAlert, showErrorMsg],
  );

  const handleDeletePhoto = useCallback(
    async function () {
      setIsDeletingPhoto(true);
      reset();

      try {
        await deleteProfilePicture();
        await loadProfile();
        setAlert({
          isOpen: true,
          message: "Profile picture deleted successfully.",
          type: "success",
        });
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsDeletingPhoto(false);
      }
    },
    [loadProfile, reset, setAlert, showErrorMsg],
  );

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
    loadProfile,
    isUploadingPhoto,
    isDeletingPhoto,
    handleUploadPhoto,
    handleDeletePhoto,
  };
}

export default useAccounts;

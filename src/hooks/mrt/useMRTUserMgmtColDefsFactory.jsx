import React, { useCallback, useMemo, useState } from "react";
import useAppCss from "../useAppCss";
import { Chip, IconButton, Paper, Typography } from "@mui/material";
import {
  Check,
  DeleteForever,
  Email,
  Female,
  Info,
  Login,
  Male,
  Pause,
  Phone,
  PlayArrow,
  Shield,
  Transgender,
  Warning,
} from "@mui/icons-material";
import { AppConstants } from "../../app/AppConstants";
import FlexBox from "../../components/styled/FlexBox";
import AppTooltip from "../../components/core/AppTooltip";
import { useDispatch } from "react-redux";
import { setLoginRes } from "../../redux/slices/AuthSlice";
import useAppAlert from "../useAppAlert";
import {
  activateUser,
  markUserAsDeleted,
  markUserAsSuspended,
} from "../../services/UserMgmtService";

function useMRTUserMgmtColDefsFactory() {
  const { GlobalNormalChipCss } = useAppCss();
  const [selectedRow, setSelectedRow] = useState();
  const [showCnfDialog, setShowCnfDialog] = useState({
    verify: false,
    suspend: false,
    delete: false,
    activate: false,
  });
  const [dialog, setDialog] = useState({
    verify: false,
    suspend: false,
    delete: false,
    activate: false,
  });
  const [loader, setLoader] = useState({
    suspension: false,
    deletion: false,
    activation: false,
  });
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const dispatch = useDispatch();

  const handleVerifyUserBtnClick = useCallback(function (rowData) {
    setSelectedRow(rowData);
    setShowCnfDialog((prev) => ({ ...prev, verify: true }));
  }, []);

  const handleSuspendUserBtnClick = useCallback(function (rowData) {
    setSelectedRow(rowData);
    setShowCnfDialog((prev) => ({ ...prev, suspend: true }));
  }, []);

  const handleDeleteUserBtnClick = useCallback(function (rowData) {
    setSelectedRow(rowData);
    setShowCnfDialog((prev) => ({ ...prev, delete: true }));
  }, []);

  const handleActivateUserBtnClick = useCallback(function (rowData) {
    setSelectedRow(rowData);
    setShowCnfDialog((prev) => ({ ...prev, activate: true }));
  }, []);

  const handleCnfDialogOnCancelBtnClick = useCallback(function (name) {
    setShowCnfDialog((prev) => ({ ...prev, [name]: false }));
  }, []);

  const handleVerifyCnfDialogOnSuccessBtnClick = useCallback(
    function () {
      setShowCnfDialog((prev) => ({ ...prev, verify: false }));
      setDialog((prev) => ({ ...prev, verify: true }));
      dispatch(setLoginRes({ email: selectedRow?.email }));
    },
    [selectedRow, dispatch],
  );

  const handleSuspendCnfDialogOnSuccessBtnClick = useCallback(
    async function (onSuccess) {
      setLoader((prev) => ({ ...prev, suspension: true }));
      reset();

      try {
        await markUserAsSuspended(selectedRow?.id);
        await onSuccess();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setLoader((prev) => ({ ...prev, suspension: false }));
        handleCnfDialogOnCancelBtnClick("suspend");
      }
    },
    [selectedRow],
  );

  const handleActivateCnfDialogOnSuccessBtnClick = useCallback(
    async function (onSuccess) {
      setLoader((prev) => ({ ...prev, activation: true }));
      reset();

      try {
        await activateUser(selectedRow?.id);
        await onSuccess();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setLoader((prev) => ({ ...prev, activation: false }));
        handleCnfDialogOnCancelBtnClick("activate");
      }
    },
    [selectedRow],
  );

  const handleDeleteCnfDialogOnSuccessBtnClick = useCallback(
    async function (onSuccess) {
      setLoader((prev) => ({ ...prev, deletion: true }));
      reset();

      try {
        await markUserAsDeleted(selectedRow?.id);
        await onSuccess();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setLoader((prev) => ({ ...prev, deletion: false }));
        handleCnfDialogOnCancelBtnClick("delete");
      }
    },
    [selectedRow],
  );

  const handleDialogOnClose = useCallback(function (name) {
    setDialog((prev) => ({ ...prev, [name]: false }));
  }, []);

  const MRTColumns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "User ID",
      },
      {
        header: "Personal Information",
        columns: [
          {
            accessorKey: "fullname",
            header: "Full Name",
          },
          {
            accessorKey: "mobile",
            header: "Phone Number",
            Cell: ({ cell }) => {
              const colValue = cell?.getValue();

              if (!colValue)
                return (
                  <Chip
                    label="Not Available"
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.error.main,
                      border: `1px solid ${theme.palette.error.main}`,
                      backgroundColor: "transparent",
                      opacity: "none",
                    })}
                    icon={<Warning fontSize="small" color="error" />}
                  />
                );
              else
                return (
                  <Chip
                    label={colValue}
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.main}`,
                      outline: "none",
                      backgroundColor: "transparent",
                    })}
                    icon={<Phone fontSize="small" color="success" />}
                  />
                );
            },
          },
          {
            accessorKey: "gender",
            header: "Gender",
            Cell: ({ cell }) => {
              const value = cell?.getValue();

              if (value === "M")
                return (
                  <Chip
                    label="Male"
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.main}`,
                      backgroundColor: "transparent",
                      opacity: "none",
                    })}
                    icon={<Male fontSize="small" color="success" />}
                  />
                );
              else if (value === "F")
                return (
                  <Chip
                    label="Female"
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.main}`,
                      backgroundColor: "transparent",
                      opacity: "none",
                    })}
                    icon={<Female fontSize="small" color="success" />}
                  />
                );
              else
                return (
                  <Chip
                    label="Transgender"
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.main}`,
                      backgroundColor: "transparent",
                      opacity: "none",
                    })}
                    icon={<Transgender fontSize="small" color="success" />}
                  />
                );
            },
          },
          {
            accessorKey: "dob",
            header: "Date of Birth",
          },
          {
            accessorKey: "category",
            header: "Category (GEN/ EWS/ OBC/ SC/ ST)",
            Cell: ({ cell }) => {
              const colValue = cell?.getValue();

              if (!colValue)
                return (
                  <Chip
                    label="Not Available"
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.error.main,
                      border: `1px solid ${theme.palette.error.main}`,
                      backgroundColor: "transparent",
                      opacity: "none",
                    })}
                    icon={<Warning fontSize="small" color="error" />}
                  />
                );
              else return colValue;
            },
          },
          {
            accessorKey: "isPwd",
            header:
              "User Disablity Status (i.e., whether a user is physically challenged or not)",
            Cell: ({ cell }) => {
              const colValue = cell?.getValue() ?? null;

              if (colValue === null)
                return (
                  <Chip
                    label="Not Available"
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.error.main,
                      border: `1px solid ${theme.palette.error.main}`,
                      backgroundColor: "transparent",
                      opacity: "none",
                    })}
                    icon={<Warning fontSize="small" color="error" />}
                  />
                );

              if (colValue)
                return (
                  <Chip
                    label="Physically Challenged"
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.error.main,
                      border: `1px solid ${theme.palette.error.main}`,
                      backgroundColor: "transparent",
                      opacity: "none",
                    })}
                  />
                );
              else
                return (
                  <Chip
                    label="Does not have any disability"
                    sx={(theme) => ({
                      ...GlobalNormalChipCss,
                      color: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.main}`,
                      backgroundColor: "transparent",
                      opacity: "none",
                    })}
                  />
                );
            },
          },
        ],
        Header: ({ column }) => {
          const value = column?.columnDef?.header ?? null;

          return (
            <FlexBox sx={{ gap: 1, alignItems: "center" }}>
              <Info fontSize="small" color="success" />
              <Typography
                variant="body1"
                color="success"
                sx={{ fontWeight: 700 }}
              >
                {value}
              </Typography>
            </FlexBox>
          );
        },
      },
      {
        header: "Login Information",
        columns: [
          {
            accessorKey: "email",
            header: "Email",
            Cell: ({ cell }) => {
              const value = cell?.getValue() ?? null;

              return (
                <Chip
                  label={value}
                  sx={(theme) => ({
                    ...GlobalNormalChipCss,
                    color: theme.palette.success.main,
                    border: `1px solid ${theme.palette.success.main}`,
                    outline: "none",
                    backgroundColor: "transparent",
                  })}
                  icon={<Email fontSize="small" color="success" />}
                />
              );
            },
          },
          {
            accessorKey: "username",
            header: "Username",
          },
        ],
        Header: ({ column }) => {
          const value = column?.columnDef?.header ?? null;

          return (
            <FlexBox sx={{ gap: 1, alignItems: "center" }}>
              <Login fontSize="small" color="success" />
              <Typography
                variant="body1"
                color="success"
                sx={{ fontWeight: 700 }}
              >
                {value}
              </Typography>
            </FlexBox>
          );
        },
      },
      {
        accessorKey: "companyName",
        header: "Company Name",
        Cell: ({ cell }) => {
          const colValue = cell?.getValue();

          if (!colValue)
            return (
              <Chip
                label="Not Available"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.error.main,
                  border: `1px solid ${theme.palette.error.main}`,
                  backgroundColor: "transparent",
                  opacity: "none",
                })}
                icon={<Warning fontSize="small" color="error" />}
              />
            );
          else return colValue;
        },
      },
      {
        accessorKey: "address",
        header: "Company Address",
        Cell: ({ cell }) => {
          const colValue = cell?.getValue();

          if (!colValue)
            return (
              <Chip
                label="Not Available"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.error.main,
                  border: `1px solid ${theme.palette.error.main}`,
                  backgroundColor: "transparent",
                  opacity: "none",
                })}
                icon={<Warning fontSize="small" color="error" />}
              />
            );
          else return colValue;
        },
      },
      {
        accessorKey: "roleName",
        header: "Role",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;

          if (value == AppConstants.ROLES.ADMIN) return "Admin";
          else return "User";
        },
      },
      {
        accessorKey: "isSuspended",
        header:
          "Account Suspension Status (i.e., account is on temporary hold)",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;

          if (value)
            return (
              <Chip
                label="Suspended"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.error.main,
                  border: `1px solid ${theme.palette.error.main}`,
                  backgroundColor: "transparent",
                  opacity: "none",
                })}
                icon={<Warning fontSize="small" color="error" />}
              />
            );
          else
            return (
              <Chip
                label="Active"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.success.main,
                  border: `1px solid ${theme.palette.success.main}`,
                  backgroundColor: "transparent",
                  opacity: "none",
                })}
              />
            );
        },
      },
      {
        accessorKey: "isDeleted",
        header: "Account Status (i.e., account is in non-recoverable mode)",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;

          if (!value)
            return (
              <Chip
                label="Active"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.success.main,
                  border: `1px solid ${theme.palette.success.main}`,
                  backgroundColor: "transparent",
                  opacity: "none",
                })}
              />
            );
          else
            return (
              <Chip
                label="DELETED"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.error.main,
                  border: `1px solid ${theme.palette.error.main}`,
                  backgroundColor: "transparent",
                  opacity: "none",
                })}
                icon={<DeleteForever fontSize="small" color="error" />}
              />
            );
        },
      },
      {
        accessorKey: "isEmailVerified",
        header: "Email Verification Status",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;

          if (value === null)
            return (
              <Chip
                label="Not Available"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.error.main,
                  border: `1px solid ${theme.palette.error.main}`,
                  backgroundColor: "transparent",
                  opacity: "none",
                })}
                icon={<Warning fontSize="small" color="error" />}
              />
            );

          if (!value)
            return (
              <Chip
                label="NOT VERIFIED"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.error.main,
                  border: `1px solid ${theme.palette.error.main}`,
                  backgroundColor: "transparent",
                  opacity: "none",
                })}
                icon={<Warning fontSize="small" color="error" />}
              />
            );

          return (
            <Chip
              label="VERIFIED"
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: theme.palette.success.main,
                border: `1px solid ${theme.palette.success.main}`,
                backgroundColor: "transparent",
                opacity: "none",
              })}
              icon={<Check fontSize="small" color="success" />}
            />
          );
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => {
          const rowData = row?.original;
          const isSuspended = rowData?.isSuspended ?? false;
          const isVerified = rowData?.isEmailVerified ?? false;
          const isDeleted = rowData?.isDeleted ?? false;

          if (isDeleted)
            return (
              <AppTooltip title="You cannot perform any further actions on this user as this user has been deleted.">
                <Chip
                  label="NOT AVAILABLE"
                  sx={(theme) => ({
                    ...GlobalNormalChipCss,
                    color: theme.palette.error.main,
                    border: `1px solid ${theme.palette.error.main}`,
                    outline: "none",
                    backgroundColor: "transparent",
                  })}
                  icon={<Warning fontSize="small" color="error" />}
                />
              </AppTooltip>
            );

          return (
            <Paper
              variant="elevation"
              elevation={1}
              sx={{ p: 1, width: "max-content" }}
            >
              <FlexBox sx={{ gap: 1, flexWrap: "wrap" }}>
                {!isVerified && (
                  <AppTooltip title="Verify user">
                    <IconButton
                      onClick={() => handleVerifyUserBtnClick(rowData)}
                    >
                      <Shield fontSize="small" color="success" />
                    </IconButton>
                  </AppTooltip>
                )}

                {!!isSuspended && (
                  <AppTooltip title="Activate this user">
                    <IconButton
                      onClick={() => handleActivateUserBtnClick(rowData)}
                    >
                      <PlayArrow fontSize="small" color="secondary" />
                    </IconButton>
                  </AppTooltip>
                )}

                {!isSuspended && (
                  <AppTooltip title="Suspend the user">
                    <IconButton
                      onClick={() => handleSuspendUserBtnClick(rowData)}
                    >
                      <Pause fontSize="small" color="warning" />
                    </IconButton>
                  </AppTooltip>
                )}

                <AppTooltip title="Delete this user (permanently)">
                  <IconButton onClick={() => handleDeleteUserBtnClick(rowData)}>
                    <DeleteForever fontSize="small" color="error" />
                  </IconButton>
                </AppTooltip>
              </FlexBox>
            </Paper>
          );
        },
      },
    ],
    [selectedRow],
  );

  return {
    MRTColumns,
    selectedRow,
    showCnfDialog,
    dialog,
    loader,
    alert,
    handleAlertOnClose,
    handleCnfDialogOnCancelBtnClick,
    handleVerifyCnfDialogOnSuccessBtnClick,
    handleDialogOnClose,
    handleSuspendCnfDialogOnSuccessBtnClick,
    handleActivateCnfDialogOnSuccessBtnClick,
    handleDeleteCnfDialogOnSuccessBtnClick,
  };
}

export default useMRTUserMgmtColDefsFactory;

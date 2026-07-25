import React, { useMemo } from "react";
import useAppCss from "../useAppCss";
import { Chip } from "@mui/material";
import {
  DeleteForever,
  Female,
  Male,
  Transgender,
  Warning,
} from "@mui/icons-material";
import { AppConstants } from "../../app/AppConstants";

function useMRTUserMgmtColDefsFactory() {
  const { GlobalNormalChipCss } = useAppCss();
  const MRTColumns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "User ID",
      },
      {
        accessorKey: "fullname",
        header: "Full Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "username",
        header: "Username",
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
          else return colValue;
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
                label="Deleted"
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
    ],
    [],
  );

  return { MRTColumns };
}

export default useMRTUserMgmtColDefsFactory;

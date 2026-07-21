import React, { useMemo } from "react";
import useAppCss from "../useAppCss";
import { Chip } from "@mui/material";
import dayjs from "dayjs";

function useMRTJobCategoriesMasterColDefsFactory() {
  const { GlobalNormalChipCss } = useAppCss();
  const MRTColumns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Job Category ID",
      },
      {
        accessorKey: "categoryName",
        header: "Job Category Name",
      },
      {
        accessorKey: "isActive",
        header: "Category Status",
        Cell: ({ cell }) => {
          const colVal = cell?.getValue() ?? false;

          if (colVal)
            return (
              <Chip
                label="Active"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.success.main,
                  border: `1px solid ${theme.palette.success.main}`,
                  backgroundColor: "transparent",
                  outline: "none",
                })}
              />
            );

          return (
            <Chip
              label="In-active"
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: theme.palette.error.main,
                border: `1px solid ${theme.palette.error.main}`,
                backgroundColor: "transparent",
                outline: "none",
              })}
            />
          );
        },
      },
      {
        accessorKey: "isDeleted",
        header: "Category Deletion Status",
        Cell: ({ cell }) => {
          const colVal = cell?.getValue() ?? false;

          if (!colVal)
            return (
              <Chip
                label="Not Deleted"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.success.main,
                  border: `1px solid ${theme.palette.success.main}`,
                  backgroundColor: "transparent",
                  outline: "none",
                })}
              />
            );

          return (
            <Chip
              label="Deleted"
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: theme.palette.error.main,
                border: `1px solid ${theme.palette.error.main}`,
                backgroundColor: "transparent",
                outline: "none",
              })}
            />
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Posted Date",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;
          const postedDate = dayjs(new Date(value)).format("DD-MM-YYYY");

          return postedDate;
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Last Modified Date",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;
          const postedDate = dayjs(new Date(value)).format("DD-MM-YYYY");

          return postedDate;
        },
      },
    ],
    [],
  );

  return { MRTColumns };
}

export default useMRTJobCategoriesMasterColDefsFactory;

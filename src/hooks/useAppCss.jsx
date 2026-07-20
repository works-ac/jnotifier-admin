import { useTheme } from "@mui/material";
import React, { useMemo } from "react";

function useAppCss() {
  const theme = useTheme();

  const RequiredFieldCss = useMemo(() => ({
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
  }));

  const RequiredSwitchCss = useMemo(() => ({
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  }));

  const GlobalPaperCss = useMemo(() => ({
    padding: { xs: "1.5rem", md: "2.5rem" },
    borderRadius: "16px",
    width: "100%",
    border: `1px solid ${theme.palette.secondary["A50"]}`,
    minHeight: "650px",
  }));

  const GlobalDialogDividerCss = useMemo(
    () => ({
      borderTop: `1px solid ${theme.palette.secondary[100]}`,
    }),
    [],
  );

  const GlobalAccordianCss = useMemo(
    () => ({
      mb: 1,
      border: 1,
      borderColor: theme.palette.primary.A700,
      borderRadius: 2,
      "&::before": { display: "none" },
    }),
    [],
  );

  const GlobalDialogTitle = useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      gap: 1,
      fontWeight: 700,
      bgcolor: "primary.main",
      color: "white",
      py: 2,
    }),
    [],
  );

  const GlobalTableCss = useMemo(
    () => ({
      muiTablePaperProps: {
        elevation: 3,
        sx: {
          borderRadius: "8px",
          overflow: "hidden",
          border: `1px solid ${theme.palette.secondary.A100}`,
        },
      },
      muiTableContainerProps: {
        sx: { maxHeight: "600px", minHeight: "150px" },
      },
      muiTableHeadCellProps: {
        sx: {
          fontWeight: "bold",
          color: theme.palette.primary.main,
          // width: "max-content",
          whiteSpace: "normal",
          wordBreak: "break-word",
          textAlign: "center",
          borderRight: `1px solid ${theme.palette.secondary.A100}`,
          borderBottom: `1px solid ${theme.palette.secondary.A100}`,
          borderTop: `1px solid ${theme.palette.secondary.A100}`,
        },
      },
      muiTableBodyCellProps: { sx: { color: "gray", fontWeight: 700 } },
      muiPaginationProps: {
        rowsPerPageOptions: [10, 20, 30, 40, 50, 100],
      },
      enableStickyHeader: true,
    }),
    [theme],
  );

  const GlobalChipCss = useMemo(
    () => ({
      borderRadius: "8px",
      backgroundColor: "white",
      border: `1px solid ${theme.palette.success.main}`,
      color: theme.palette.success.main,
    }),
    [],
  );

  const GlobalNormalChipCss = useMemo(
    () => ({
      borderRadius: "8px",
    }),
    [],
  );

  return {
    RequiredFieldCss,
    RequiredSwitchCss,
    GlobalPaperCss,
    GlobalAccordianCss,
    GlobalDialogDividerCss,
    GlobalTableCss,
    GlobalChipCss,
    GlobalDialogTitle,
    GlobalNormalChipCss,
  };
}

export default useAppCss;

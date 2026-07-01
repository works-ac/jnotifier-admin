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

  return {
    RequiredFieldCss,
    RequiredSwitchCss,
    GlobalPaperCss,
    GlobalAccordianCss,
    GlobalDialogDividerCss,
  };
}

export default useAppCss;

import { createTheme } from "@mui/material";

const AppTheme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 16,
    caption: {
      fontSize: "12px",
    },
    body1: {
      fontSize: "14px",
    },
    body2: {
      fontSize: "13px",
    },
    h1: {
      fontSize: "36px",
    },
    h2: {
      fontSize: "32px",
    },
    h3: {
      fontSize: "28px",
    },
    h4: {
      fontSize: "24px",
    },
    h5: {
      fontSize: "20px",
    },
    h6: {
      fontSize: "16px",
    },
  },
  palette: {
    primary: {
      main: "#000080",
      A700: "#2563eb",
      hover: "#000066",
      A300: "#7dd3fc",
    },
    secondary: {
      main: "#737373",
      A50: "#f8fafc",
      A100: "#cbd5e1",
      A200: "#e2e8f0",
      A50: "#f1f5f9",
      A700: "#e0e0e0",
    },
    success: { main: "#228B22", hover: "#1e7b1e", A400: "#34d399" },
    error: { main: "#b91c1c", hover: "#dc2626" },
    info: { main: "#2196f3", 700: "#67e8f9", 100: "#cffafe" },
    warning: { main: "#ff9933", hover: "#e68a00", A100: "#f7e8ec" },
    chip: { main: "#e3f2fd" },
    viewDetail: {
      main: "#3b82f6",
      hover: "#1d4ed8",
      hoverBackground: "#eff6ff",
    },
    edit: { main: "#eab308", hover: "#a16207", hoverBackground: "#fffbeb" },
    addRevoke: {
      main: "#ef4444",
      hover: "#dc2626",
      hoverBackground: "#fef2f2",
    },
    markAttendance: {
      main: "#9C27B0",
      hover: "#7B1FA2",
      hoverBackground: "#F3E5F5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          padding: "0.50rem 1.5rem",
          textTransform: "none", // Keeps your button text from forcing UPPERCASE
          transition: "all 0.35s ease-in-out",
          "&:active": {
            transform: "scale(1.02)",
            cursor: "pointer",
          },
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#e0e0e0",
          fontWeight: "bold",
          color: "#333",
          whiteSpace: "nowrap",
        },
        body: {
          padding: "8px 16px",
          whiteSpace: "nowrap",
        },
      },
    },
    // Fixed: Properly nested the custom Table Head Cell property target if using standard MUI tables
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontWeight: "bold",
            color: "#000080",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          "::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#cbd5e1",
            borderRadius: "8px",
          },
        },
      },
    },
  },
});

export default AppTheme;

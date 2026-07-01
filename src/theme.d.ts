import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    hover?: string;
    A50?: string;
    A100?: string;
    A200?: string;
    A300?: string;
    A400?: string;
    A500?: string;
    A600?: string;
    A700?: string;
    A800?: string;
    A900?: string;
  }

  interface SimplePaletteColorOptions {
    hover?: string;
    A50?: string;
    A100?: string;
    A200?: string;
    A300?: string;
    A400?: string;
    A500?: string;
    A600?: string;
    A700?: string;
    A800?: string;
    A900?: string;
  }
}

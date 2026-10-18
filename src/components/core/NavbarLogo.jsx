import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";

const NavbarLogo = ({
  src,
  alt = "App Logo",
  height = 40, // 40px is the sweet spot for MUI Navbars
  onClick,
  hidePadding = false,
  hideTooltip = false,
}) => {
  const content = (
    <IconButton
      onClick={onClick}
      disableRipple={!onClick}
      sx={{
        padding: hidePadding ? 0 : "8px",
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          backgroundColor: "transparent",
          opacity: onClick ? 0.8 : 1,
        },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          height: height,
          width: height,
          objectFit: "contain",
          imageRendering: "-webkit-optimize-contrast",
          borderRadius: "10px",
        }}
      />
    </IconButton>
  );

  if (hideTooltip) {
    return content;
  }

  return <Tooltip title="Home">{content}</Tooltip>;
};

export default React.memo(NavbarLogo);

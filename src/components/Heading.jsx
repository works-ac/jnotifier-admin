import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Heading({ text, Icon, color, iconColor, mb, hideAnimation = true }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const marginBottom = mb == null || mb == undefined ? 2 : mb;
  const headingRef = useRef(null);

  useGSAP(() => {
    if (!hideAnimation) return;

    gsap.from(headingRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: marginBottom,
        height: "inherit",
      }}
    >
      {Icon && (
        <Icon
          sx={{
            marginRight: !isMobile ? "0.5rem" : "0.25rem",
            color: iconColor,
            fontSize: !isMobile ? "2rem" : "1.12rem",
          }}
        />
      )}
      <Typography
        ref={headingRef}
        variant="h5"
        sx={{ fontWeight: "bold", color }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default React.memo(Heading);

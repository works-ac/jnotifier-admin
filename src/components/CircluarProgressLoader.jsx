import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function CircularProgressLoader({
  text,
  takeHeight = true,
  showSecondaryText = false,
  textVariant = "body1",
}) {
  const heightStyle = takeHeight ? { minHeight: "600px" } : {};
  const textColor = showSecondaryText ? "textSecondary" : "textPrimary";

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        gap: 1,
        ...heightStyle,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={16} color="secondary" />
      <Typography variant={textVariant} fontWeight={700} color={textColor}>
        {text}
      </Typography>
    </Box>
  );
}

export default React.memo(CircularProgressLoader);

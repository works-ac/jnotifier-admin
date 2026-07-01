import React from "react";
import useCaptcha from "../hooks/useCaptcha";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { RotateLeft } from "@mui/icons-material";
import { useSelector } from "react-redux";

function Captcha() {
  const { isLoading, reloadCaptcha } = useCaptcha();
  const { captchaImage } = useSelector((state) => state.captcha);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: { xs: 2, md: 1 },
        width: "100%",
        margin: "auto",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "70%",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={16} color="secondary" />
        </Box>
      ) : (
        <Box
          component="div"
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
        >
          <Box
            component="img"
            src={captchaImage}
            alt="Captcha"
            sx={{ height: 50, width: 150, objectFit: "contain" }}
          />

          <IconButton onClick={reloadCaptcha} color="primary">
            <RotateLeft sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default React.memo(Captcha);

import { Box, Typography } from "@mui/material";
import React from "react";
import NotFoungImg from "../assets/404.jpg";

function NotFoundPage() {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        component="img"
        src={NotFoungImg}
        width="50%"
        height="50%"
        sx={{ borderRadius: 10 }}
      />

      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        The page you're looking for does not exists or might have been moved to
        some other place.
      </Typography>
    </Box>
  );
}

export default React.memo(NotFoundPage);

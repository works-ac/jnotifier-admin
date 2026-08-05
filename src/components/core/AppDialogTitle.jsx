import { Box, DialogTitle, IconButton, Typography } from "@mui/material";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import FlexBox from "../styled/FlexBox";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";

function AppDialogTitle({ title, onClose, Icon }) {
  const { GlobalDialogTitle } = useAppCss();
  return (
    <Box
      component="div"
      sx={{
        ...GlobalDialogTitle,
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        py: 0,
        rowGap: 0,
      }}
    >
      <FlexBox
        sx={{
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          p: 1,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={(theme) => ({
            color: "white",
            borderRadius: 2,
            "&:hover": { backgroundColor: theme.palette.error.main },
          })}
        >
          <Close fontSize="medium" />
        </IconButton>
      </FlexBox>

      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {!!Icon && Icon}
        <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "Roboto" }}>
          {title}
        </Typography>
      </DialogTitle>
    </Box>
  );
}

AppDialogTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  Icon: PropTypes.elementType,
};

export default React.memo(AppDialogTitle);

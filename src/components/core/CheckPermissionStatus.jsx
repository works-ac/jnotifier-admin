import {
  Box,
  Container,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import useAppCss from "../../hooks/useAppCss";
import Heading from "../Heading";
import { Shield } from "@mui/icons-material";
import FlexBox from "../styled/FlexBox";
import ResponsiveImage from "./ResponsiveImage";
import PermissionDeniedImg from "../../assets/permission-denied.jpg";

function CheckPermissionStatus({ children, allowedRoles = [] }) {
  const theme = useTheme();
  const { userRole } = useSelector((state) => state.auth);
  const { GlobalPaperCss } = useAppCss();

  if (allowedRoles.includes(userRole)) return children;

  return (
    <Container maxWidth="xl" sx={{ my: 1 }}>
      <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
        <Heading
          Icon={Shield}
          color={theme.palette.primary.main}
          iconColor={theme.palette.warning.main}
          text="Access Denied"
        />

        <Divider />

        <FlexBox sx={{ flexDirection: "column", my: 2 }}>
          <ResponsiveImage
            alt="Permission Denied"
            src={PermissionDeniedImg}
            aspectRatio="1/1"
            maxWidth="100%"
            caption="You have not appropriate rights to view this page. Please contact system administrator to grant the access of this page to you."
          />
        </FlexBox>
      </Paper>
    </Container>
  );
}

CheckPermissionStatus.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.array.isRequired,
};

export default React.memo(CheckPermissionStatus);

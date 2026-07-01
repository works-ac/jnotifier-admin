import { Cancel } from "@mui/icons-material";
import { Alert, Container } from "@mui/material";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function AppAlert({
  alert,
  handleAlertOnClose,
  maxWidth,
  type,
  hideMarginAlongYAxis = false,
}) {
  const alertBoxRef = useRef();
  const my = hideMarginAlongYAxis ? 0 : 2;
  const width = maxWidth || "xs";
  const severity = type || "error";

  useEffect(() => {
    if (alert?.isOpen) {
      alertBoxRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [alert?.isOpen]);

  if (!alert.isOpen) return <></>;
  return (
    <Container maxWidth={width} sx={{ my }} ref={alertBoxRef}>
      <Alert
        severity={severity}
        sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
        {...(typeof handleAlertOnClose === "function"
          ? { onClose: handleAlertOnClose }
          : {})}
        icon={severity === "error" ? <Cancel fontSize="small" /> : null}
      >
        {alert.message}
      </Alert>
    </Container>
  );
}

AppAlert.propTypes = {
  alert: PropTypes.object.isRequired,
  handleAlertOnClose: PropTypes.func,
  maxWidth: PropTypes.string,
  type: PropTypes.string,
  hideMarginAlongYAxis: PropTypes.bool,
};

export default React.memo(AppAlert);

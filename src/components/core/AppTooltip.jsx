import { Tooltip, Zoom } from "@mui/material";
import React from "react";

function AppTooltip({ children, title, placement = "top" }) {
  return (
    <Tooltip
      placement={placement}
      arrow
      title={title}
      slots={{ transition: Zoom }}
    >
      {children}
    </Tooltip>
  );
}

export default AppTooltip;

import { Tooltip, Zoom } from "@mui/material";
import React from "react";

function AppTooltip({ children, title }) {
  return (
    <Tooltip placement="top" arrow title={title} slots={{ transition: Zoom }}>
      {children}
    </Tooltip>
  );
}

export default AppTooltip;

import { Paper } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";

function PaperComponent(props) {
  const nodeRef = React.useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle="#cnf-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default PaperComponent;

import { Dialog, DialogContent, useTheme } from "@mui/material";
import React from "react";
import AppDialogTitle from "../core/AppDialogTitle";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";

function HelpCenterVideoModal({ isOpen, onClose }) {
  const theme = useTheme();

  return (
    <Dialog maxWidth="lg" fullWidth open={isOpen}>
      <AppDialogTitle
        Icon={<FeaturedVideoIcon fontSize="small" />}
        onClose={onClose}
        title="Watch Video"
      />

      <DialogContent>
        <video
          height="360"
          controls
          poster="/video.png"
          style={{
            width: "100%",
            border: `1px solid ${theme.palette.secondary.A100}`,
            borderRadius: 10,
          }}
        >
          <source src="/video/about.mp4" type="video/mp4" />
        </video>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(HelpCenterVideoModal);

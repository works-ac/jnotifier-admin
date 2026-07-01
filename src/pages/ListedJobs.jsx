import { Box, Container, Divider, Paper, useTheme } from "@mui/material";
import React from "react";
import useAppCss from "../hooks/useAppCss";
import Heading from "../components/Heading";
import { Work } from "@mui/icons-material";

function ListedJobs() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();

  return (
    <Container maxWidth sx={{ my: 2 }}>
      <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
        <Heading
          Icon={Work}
          iconColor={theme.palette.warning.main}
          color={theme.palette.primary.main}
          text="Listed Jobs"
        />

        <Divider />
      </Paper>
    </Container>
  );
}

export default React.memo(ListedJobs);
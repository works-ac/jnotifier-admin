import { Button, Container, Divider, Paper, useTheme } from "@mui/material";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import Heading from "../../components/Heading";
import { GppBad, Home } from "@mui/icons-material";
import ResponsiveImage from "../../components/core/ResponsiveImage";
import FlexBox from "../../components/styled/FlexBox";

function ErrorPage() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();

  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
        <Heading
          Icon={GppBad}
          color={theme.palette.error.main}
          iconColor={theme.palette.error.main}
          text="Something bad has happened"
        />

        <Divider />

        <ResponsiveImage
          src="/error.jpg"
          alt="Error"
          aspectRatio="1/1"
          maxWidth="100%"
        />

        <FlexBox sx={{ justifyContent: "flex-end" }}>
          <Button
            href="/"
            startIcon={<Home fontSize="small" />}
            variant="outlined"
          >
            Go to Home
          </Button>
        </FlexBox>
      </Paper>
    </Container>
  );
}

export default React.memo(ErrorPage);

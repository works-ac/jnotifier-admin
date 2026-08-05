import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import React from "react";
import useAppCss from "../hooks/useAppCss";
import Heading from "../components/Heading";
import { HelpCenter, Visibility } from "@mui/icons-material";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import FlexBox from "../components/styled/FlexBox";
import useHelpCenter from "../hooks/features/useHelpCenter";
import HelpCenterVideoModal from "../components/dialogs/HelpCenterVideoModal";

function HelpCentrePage() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();
  const { handleDialogToggle, showDialog } = useHelpCenter();

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
          <Heading
            Icon={HelpCenter}
            color={theme.palette.primary.main}
            iconColor={theme.palette.warning.main}
            text="Help Center"
          />

          <Divider />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ my: 1 }}>
              <Card
                sx={{ border: `1px solid ${theme.palette.secondary.main}` }}
              >
                <CardHeader
                  title="Know your portal"
                  subheader="Click here to view the video of how to use this portal."
                  avatar={<FeaturedVideoIcon fontSize="small" />}
                />

                <FlexBox sx={{ justifyContent: "center" }}>
                  <CardMedia
                    component="img"
                    src="/video.png"
                    height={250}
                    sx={{
                      p: 1,
                      maxWidth: "375px",
                    }}
                  />
                </FlexBox>

                <CardActionArea>
                  <FlexBox sx={{ justifyContent: "flex-end", p: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<Visibility fontSize="small" />}
                      size="small"
                      onClick={handleDialogToggle}
                    >
                      Watch Video
                    </Button>
                  </FlexBox>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {showDialog && (
        <HelpCenterVideoModal
          isOpen={showDialog}
          onClose={handleDialogToggle}
        />
      )}
    </>
  );
}

export default React.memo(HelpCentrePage);

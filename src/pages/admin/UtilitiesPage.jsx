import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useAppCss from "../../hooks/useAppCss";
import Heading from "../../components/Heading";
import WhatsAppLogo from "../../assets/whatsapp.jpg";
import { Settings } from "@mui/icons-material";
import FlexBox from "../../components/styled/FlexBox";
import useUtilities from "../../hooks/features/useUtilities";
import WhatsAppLinkGeneratorModal from "../../components/dialogs/WhatsAppLinkGeneratorModal";

function UtilitiesPage() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();
  const { handleWhatsAppLinkGenDialog, showWhatsAppLinkGenDialog } =
    useUtilities();

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 1 }}>
        <Paper sx={GlobalPaperCss} variant="elevation" elevation={2}>
          <Heading
            Icon={Settings}
            color={theme.palette.primary.main}
            iconColor={theme.palette.warning.main}
            text="Utilities Page"
          />

          <Divider />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ my: 2 }}>
                <CardMedia
                  component="img"
                  src={WhatsAppLogo}
                  height={250}
                  width={250}
                  sx={{ my: 2 }}
                />

                <CardContent>
                  <Typography variant="h6">
                    This utility helps you generate a sharable WhatsApp link.
                    Click on the generate button and try it now.
                  </Typography>
                </CardContent>

                <CardActionArea>
                  <FlexBox sx={{ justifyContent: "flex-end", my: 1, mr: 0.25 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleWhatsAppLinkGenDialog}
                    >
                      Generate
                    </Button>
                  </FlexBox>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {showWhatsAppLinkGenDialog && (
        <WhatsAppLinkGeneratorModal
          isOpen={showWhatsAppLinkGenDialog}
          onClose={handleWhatsAppLinkGenDialog}
        />
      )}
    </>
  );
}

export default React.memo(UtilitiesPage);

import {
  Box,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import IndianFlag from "../assets/ind-flag.svg";
import CWLogo from "../assets/cw.jpeg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import useFooter from "../hooks/useFooter";

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { handleTelegramBtnClick, handleWhatsAppBtnClick } = useFooter();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey["A100"],
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box
            component="div"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Made in India
            </Typography>

            <Box component="img" src={IndianFlag} width={16} height={16}></Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: 700 }}
          >
            &copy; 2026 Coding Works
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: 700 }}
          >
            All Rights are reserved
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ fontWeight: 700 }}
        >
          Design developed and maintained by Gaurav Sahitya
        </Typography>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              align="right"
              sx={{ fontStyle: "oblique" }}
            >
              A product of Coding Works
            </Typography>

            <Box
              component="img"
              src={CWLogo}
              width={32}
              height={32}
              sx={{ borderRadius: 50 }}
            ></Box>
          </Box>
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            align="right"
            sx={{ fontStyle: "oblique" }}
          >
            This portal is best viewable at desktop and mobile devices.
          </Typography>
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="right"
            sx={{ fontStyle: "oblique", mr: 1 }}
          >
            Follow us on:
          </Typography>

          <IconButton onClick={handleWhatsAppBtnClick}>
            <WhatsAppIcon sx={{ fontSize: "24px" }} />
          </IconButton>

          <IconButton onClick={handleTelegramBtnClick}>
            <TelegramIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default React.memo(Footer);

import React from "react";
import useAppCss from "../hooks/useAppCss";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Heading from "../components/Heading";
import {
  AddAlert,
  Dashboard,
  Movie,
  Visibility,
  Work,
} from "@mui/icons-material";

function DashboardPage() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();

  return (
    <Container maxWidth="xl" sx={{ my: 1 }}>
      <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
        <Heading
          Icon={Dashboard}
          color={theme.palette.primary.main}
          iconColor={theme.palette.warning.main}
          text="Dashboard Page"
        />

        <Divider />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ my: 1 }}>
            <Card>
              <CardHeader
                title="Today's Views"
                subheader="No. of users visited the site today."
                action={
                  <IconButton>
                    <Visibility fontSize="small" color="primary" />
                  </IconButton>
                }
              />

              <CardContent>
                <Typography
                  variant="h1"
                  sx={(theme) => ({
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  })}
                >
                  45
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ my: 1 }}>
            <Card>
              <CardHeader
                title="Media Count"
                subheader="Total no. of media uploaded on the website by admin users."
                action={
                  <IconButton>
                    <Movie fontSize="small" color="primary" />
                  </IconButton>
                }
              />

              <CardContent>
                <Typography
                  variant="h1"
                  sx={(theme) => ({
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  })}
                >
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ my: 1 }}>
            <Card>
              <CardHeader
                title="Job Count"
                subheader="Total no. of jobs posted on the website by admin users."
                action={
                  <IconButton>
                    <Work fontSize="small" color="primary" />
                  </IconButton>
                }
              />

              <CardContent>
                <Typography
                  variant="h1"
                  sx={(theme) => ({
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  })}
                >
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ my: 1 }}>
            <Card>
              <CardHeader
                title="Notice Count"
                subheader="Total no. of notices posted on the website by admin users."
                action={
                  <IconButton>
                    <AddAlert fontSize="small" color="primary" />
                  </IconButton>
                }
              />

              <CardContent>
                <Typography
                  variant="h1"
                  sx={(theme) => ({
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  })}
                >
                  15
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default DashboardPage;

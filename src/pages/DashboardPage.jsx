import React, { useEffect } from "react";
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
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Heading from "../components/Heading";
import { Dashboard, Visibility } from "@mui/icons-material";
import useDashboard from "../hooks/features/useDashboard";
import AppAlert from "../components/AppAlert";

function DashboardPage() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();
  const { isLoading, views, alert, handleAlertOnClose, getDashboardAnalytics } =
    useDashboard();

  useEffect(() => {
    getDashboardAnalytics();
  }, []);

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

        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ my: 1 }}>
            {isLoading.todayViews ? (
              <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
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
                    {views.todayViews}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ my: 1 }}>
            {isLoading.totalViews ? (
              <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
              <Card>
                <CardHeader
                  title="Total Views"
                  subheader="No. of users visited the site till now."
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
                    {views.totalViews}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default DashboardPage;

import { useEffect } from "react";
import useAppCss from "../hooks/useAppCss";
import {
  Box,
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
import {
  Archive,
  Campaign,
  Dashboard,
  FolderZip,
  People,
  PermMedia,
  Visibility,
  Work,
} from "@mui/icons-material";
import useDashboard from "../hooks/features/useDashboard";
import AppAlert from "../components/AppAlert";

function DashboardPage() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();
  const {
    isLoading,
    views,
    stats,
    alert,
    handleAlertOnClose,
    getDashboardAnalytics,
  } = useDashboard();

  useEffect(() => {
    getDashboardAnalytics();
  }, [getDashboardAnalytics]);

  return (
    <Container maxWidth="xl" sx={{ my: 1 }}>
      <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
        <Heading
          Icon={Dashboard}
          color={theme.palette.primary.main}
          iconColor={theme.palette.warning.main}
          text="Dashboard"
        />

        <Divider />

        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        {/* Section 1: Traffic & Views */}
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "text.secondary", mb: 1 }}
          >
            Traffic & Views
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              {isLoading.todayViews ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.secondary.A100}`,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
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
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {views.todayViews}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {isLoading.totalViews ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.secondary.A100}`,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
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
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {views.totalViews}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 2: Portal Statistics */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "text.secondary", mb: 1 }}
          >
            Portal Overview & Content Statistics
          </Typography>

          <Grid container spacing={2}>
            {/* Total Jobs */}
            <Grid size={{ xs: 12, sm: 6 }}>
              {isLoading.stats ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.secondary.A100}`,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <CardHeader
                    title="Total Jobs"
                    subheader="Jobs created overall"
                    action={
                      <IconButton>
                        <Work fontSize="small" color="primary" />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {stats.totalJobs}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Total Notices */}
            <Grid size={{ xs: 12, sm: 6 }}>
              {isLoading.stats ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.secondary.A100}`,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <CardHeader
                    title="Total Notices"
                    subheader="Notices created overall"
                    action={
                      <IconButton>
                        <Campaign fontSize="small" color="warning" />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.warning.main,
                      }}
                    >
                      {stats.totalNotices}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Total Users */}
            <Grid size={{ xs: 12, sm: 6 }}>
              {isLoading.stats ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.secondary.A100}`,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <CardHeader
                    title="Total Users"
                    subheader="Users registered overall"
                    action={
                      <IconButton>
                        <People fontSize="small" color="success" />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.success.main,
                      }}
                    >
                      {stats.totalUsers}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Archived Jobs */}
            <Grid size={{ xs: 12, sm: 6 }}>
              {isLoading.stats ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.secondary.A100}`,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <CardHeader
                    title="Archived Jobs"
                    subheader="Jobs marked as archived"
                    action={
                      <IconButton>
                        <Archive fontSize="small" color="secondary" />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.secondary.main,
                      }}
                    >
                      {stats.archivedJobs}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Archived Notices */}
            <Grid size={{ xs: 12, sm: 6 }}>
              {isLoading.stats ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.secondary.A100}`,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <CardHeader
                    title="Archived Notices"
                    subheader="Notices marked as archived"
                    action={
                      <IconButton>
                        <FolderZip fontSize="small" color="warning" />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color:
                          theme.palette.warning.dark ||
                          theme.palette.warning.main,
                      }}
                    >
                      {stats.archivedNotices}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Total Medias */}
            <Grid size={{ xs: 12, sm: 6 }}>
              {isLoading.stats ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.secondary.A100}`,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <CardHeader
                    title="Total Medias"
                    subheader="Uploaded medias (excl. jobs & notices)"
                    action={
                      <IconButton>
                        <PermMedia fontSize="small" color="info" />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.info.main,
                      }}
                    >
                      {stats.totalMedias}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default DashboardPage;

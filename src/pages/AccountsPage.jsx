import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useAccounts from "../hooks/useAccounts";
import useAppCss from "../hooks/useAppCss";
import { useSelector } from "react-redux";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import { AppConstants } from "../app/AppConstants";
import Login from "../views/Login";
import {
  AlternateEmail,
  Cake,
  Category,
  Edit,
  ExpandMore,
  Logout,
  Male,
  Person,
} from "@mui/icons-material";
import { getInitials } from "../helpers";
import Heading from "../components/Heading";
import Notes from "../components/Notes";
import ConfirmationDialog from "../components/ConfirmationDialog";

function AccountsPage() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const theme = useTheme();
  const {
    alert,
    handleAlertOnClose,
    isLoading,
    isProfileLoading,
    profile,
    handleLogout,
    isLoggingOut,
  } = useAccounts();
  const { GlobalPaperCss, GlobalAccordianCss } = useAppCss();
  const { userAuthStatus } = useSelector((state) => state.auth);

  if (isLoading)
    return (
      <CircluarProgressLoader
        text="We're checking your authentication status, please wait..."
        takeHeight
      />
    );

  if (
    userAuthStatus &&
    userAuthStatus.trim().toLowerCase() !== AppConstants.USER_AUTH_STATUS
  )
    return <Login />;

  return (
    <Container maxWidth sx={{ my: 2 }}>
      <Paper variant="elevation" elevation={4} sx={GlobalPaperCss}>
        <Heading
          Icon={Person}
          color={theme.palette.primary.main}
          iconColor={theme.palette.warning.main}
          text="User Profile"
        />

        <Divider />

        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        {isProfileLoading && (
          <CircluarProgressLoader text="We're loading your profile please wait..." />
        )}

        {!isProfileLoading && (
          <>
            <Box component="div" sx={{ mb: 4 }}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  sx={(theme) => ({
                    backgroundColor: theme.palette.warning.main,
                    p: 5,
                    my: 2,
                    fontWeight: 700,
                    fontSize: "2rem",
                  })}
                >
                  {getInitials(profile.fullName)}
                </Avatar>

                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                  {profile?.fullName?.toWellFormed()?.toUpperCase() ?? ""}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Accordion sx={GlobalAccordianCss}>
                <AccordionSummary
                  aria-controls={`basic-info-content`}
                  id={`basic-info-header`}
                  expandIcon={<ExpandMore fontSize="small" />}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: theme.palette.primary.A700,
                    }}
                  >
                    Basic Info
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <TextField
                    value={profile?.username}
                    disabled
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment>
                            <Person
                              fontSize="small"
                              color="secondary"
                              sx={{ mr: 1 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ mb: 2 }}
                    label="Username"
                  />

                  <TextField
                    value={profile?.email}
                    disabled
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment>
                            <AlternateEmail
                              fontSize="small"
                              color="secondary"
                              sx={{ mr: 1 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ mb: 2 }}
                    label="Email"
                  />

                  <TextField
                    value={profile?.category}
                    disabled
                    fullWidth
                    sx={{ mb: 2 }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment>
                            <Category
                              fontSize="small"
                              color="secondary"
                              sx={{ mr: 1 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    label="Category"
                  />

                  <TextField
                    value={profile?.dob}
                    disabled
                    fullWidth
                    sx={{ mb: 2 }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment>
                            <Cake
                              fontSize="small"
                              color="secondary"
                              sx={{ mr: 1 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    label="D.O.B"
                  />

                  <TextField
                    value={profile?.gender === "M" ? "Male" : "Female"}
                    disabled
                    fullWidth
                    sx={{ mb: 2 }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment>
                            <Male
                              fontSize="small"
                              color="secondary"
                              sx={{ mr: 1 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    label="Gender"
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion sx={GlobalAccordianCss}>
                <AccordionSummary
                  aria-controls={`disability-info-content`}
                  id={`disability-info-header`}
                  expandIcon={<ExpandMore fontSize="small" />}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: theme.palette.primary.A700,
                    }}
                  >
                    Disability Info
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  {profile.isPwd === "false" && (
                    <Typography
                      variant="body1"
                      color="secondary"
                      sx={{ textAlign: "justify" }}
                    >
                      {AppConstants.NON_DISABLE_TEXT}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>

            <Notes
              note="Candidates having more than 40% disability are considered to be physically challenged people."
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Sensitive information like passwords etc are not displayed here due to security reasons."
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Date of birth is non-editable."
              noteColor={theme.palette.secondary.main}
            />

            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="success"
                startIcon={<Edit fontSize="small" />}
                disabled
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<Logout fontSize="small" />}
                disabled={isLoggingOut}
                onClick={() => setLogoutDialogOpen(true)}
              >
                Logout
              </Button>
            </Box>
          </>
        )}
      </Paper>

      <ConfirmationDialog
        open={logoutDialogOpen}
        heading="Confirm Logout"
        Icon={Logout}
        text="Are you sure you want to logout?"
        isLoading={isLoggingOut}
        onSuccess={() => {
          setLogoutDialogOpen(false);
          handleLogout();
        }}
        onCancel={() => setLogoutDialogOpen(false)}
      />
    </Container>
  );
}

export default React.memo(AccountsPage);

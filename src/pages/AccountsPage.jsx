import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
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
  Business,
  Cake,
  CameraAlt,
  Category,
  Delete,
  Edit,
  ExpandMore,
  LocationOn,
  Logout,
  Male,
  Person,
} from "@mui/icons-material";
import { getInitials } from "../helpers";
import Heading from "../components/Heading";
import Notes from "../components/Notes";
import ConfirmationDialog from "../components/ConfirmationDialog";
import EditAccount from "../components/dialogs/EditAccount";

function AccountsPage() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [photoUploadDialogOpen, setPhotoUploadDialogOpen] = useState(false);
  const [photoDeleteDialogOpen, setPhotoDeleteDialogOpen] = useState(false);
  const [pendingPhotoFile, setPendingPhotoFile] = useState(null);
  const theme = useTheme();
  const {
    alert,
    handleAlertOnClose,
    isLoading,
    isProfileLoading,
    profile,
    handleLogout,
    isLoggingOut,
    loadProfile,
    isUploadingPhoto,
    isDeletingPhoto,
    handleUploadPhoto,
    handleDeletePhoto,
  } = useAccounts();
  const { GlobalPaperCss, GlobalAccordianCss } = useAppCss();
  const { userAuthStatus } = useSelector((state) => state.auth);

  const onPhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = null;

    if (file.size > 1024 * 1024) {
      handleUploadPhoto(file);
      return;
    }

    setPendingPhotoFile(file);
    setPhotoUploadDialogOpen(true);
  };

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
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Tooltip title="Upload Profile Picture (Max 1MB)">
                      <IconButton
                        size="small"
                        component="label"
                        sx={(theme) => ({
                          backgroundColor: theme.palette.primary.main,
                          color: "#fff",
                          boxShadow: 2,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                          width: 38,
                          height: 38,
                        })}
                        disabled={isUploadingPhoto || isDeletingPhoto}
                      >
                        {isUploadingPhoto ? (
                          <CircularProgress size={18} color="inherit" />
                        ) : (
                          <CameraAlt fontSize="small" />
                        )}
                        <input
                          type="file"
                          hidden
                          accept="image/jpeg,image/png,image/webp"
                          onChange={onPhotoSelect}
                        />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <Avatar
                    src={profile?.profilePicture}
                    sx={(theme) => ({
                      backgroundColor: theme.palette.warning.main,
                      width: 110,
                      height: 110,
                      my: 1,
                      fontWeight: 700,
                      fontSize: "2.5rem",
                      boxShadow: 2,
                      border: `3px solid ${theme.palette.background.paper}`,
                    })}
                  >
                    {getInitials(profile.fullName)}
                  </Avatar>
                </Badge>

                {profile?.profilePicture && (
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    startIcon={
                      isDeletingPhoto ? (
                        <CircularProgress size={14} color="inherit" />
                      ) : (
                        <Delete fontSize="small" />
                      )
                    }
                    disabled={isDeletingPhoto || isUploadingPhoto}
                    onClick={() => setPhotoDeleteDialogOpen(true)}
                    sx={{ mt: 0.5, textTransform: "none", fontSize: "0.85rem" }}
                  >
                    Remove Photo
                  </Button>
                )}

                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, mt: 1 }}>
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

              <Accordion sx={GlobalAccordianCss}>
                <AccordionSummary
                  aria-controls="company-info-content"
                  id="company-info-header"
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
                    Company Details
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <TextField
                    value={profile?.companyName || ""}
                    disabled
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Business
                              fontSize="small"
                              color="secondary"
                              sx={{ mr: 1 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ mb: 2 }}
                    label="Company Name"
                  />

                  <TextField
                    value={profile?.address || ""}
                    disabled
                    fullWidth
                    multiline
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOn
                              fontSize="small"
                              color="secondary"
                              sx={{ mr: 1 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ mb: 2 }}
                    label="Company Address"
                  />
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
                onClick={() => setEditDialogOpen(true)}
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

      <ConfirmationDialog
        open={photoUploadDialogOpen}
        heading="Upload Profile Picture"
        Icon={CameraAlt}
        text={`Are you sure you want to upload this profile picture (${pendingPhotoFile ? (pendingPhotoFile.size / 1024).toFixed(1) : 0} KB)? It will be encrypted before storage.`}
        isLoading={isUploadingPhoto}
        onSuccess={async () => {
          setPhotoUploadDialogOpen(false);
          if (pendingPhotoFile) {
            await handleUploadPhoto(pendingPhotoFile);
            setPendingPhotoFile(null);
          }
        }}
        onCancel={() => {
          setPhotoUploadDialogOpen(false);
          setPendingPhotoFile(null);
        }}
      />

      <ConfirmationDialog
        open={photoDeleteDialogOpen}
        heading="Remove Profile Picture"
        Icon={Delete}
        text="Are you sure you want to remove your profile picture?"
        isLoading={isDeletingPhoto}
        onSuccess={async () => {
          setPhotoDeleteDialogOpen(false);
          await handleDeletePhoto();
        }}
        onCancel={() => setPhotoDeleteDialogOpen(false)}
      />

      {editDialogOpen && (
        <EditAccount
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSuccess={loadProfile}
          profile={profile}
        />
      )}
    </Container>
  );
}

export default React.memo(AccountsPage);

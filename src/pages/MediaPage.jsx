import React from "react";
import useAppCss from "../hooks/useAppCss";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Heading from "../components/Heading";
import MovieIcon from "@mui/icons-material/Movie";
import useMedia from "../hooks/features/useMedia";
import useMRTMediaColDefsFactory from "../hooks/mrt/useMRTMediaColDefsFactory";
import AppAlert from "../components/AppAlert";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import MRTContainer from "../components/styled/MRTContainer";
import FlexBox from "../components/styled/FlexBox";
import { QuestionMark, UploadFile } from "@mui/icons-material";
import UploadNewMediaModal from "../components/dialogs/UploadNewMediaModal";
import ConfirmationDialog from "../components/ConfirmationDialog";

function ResultsPage() {
  const theme = useTheme();
  const { GlobalPaperCss, GlobalTableCss } = useAppCss();
  const {
    handleAlertOnClose,
    setPagination,
    handleUploadDialogOnClose,
    showUploadDialog,
    alert,
    isLoading,
    media,
    pagination,
    paginationMetadata,
    fetchAllMedias,
  } = useMedia();
  const {
    MediaListingCols: columns,
    showCnfDialogs,
    loading,
    alert: cnfDialogAlert,
    handleAlertOnClose: handleCnfDialogAlertOnClose,
    handleMakeFilePrivateBtnClick,
    handleMakeFilePrivateCnfDialogOnCancelBtn,
    handleMakeFilePublicBtnClick,
    handleMakeFilePublicCnfDialogOnCancelBtn,
    handleMakeFilePrivateCnfDialogOnSuccessBtn,
    handleMakeFilePublicCnfDialogOnSuccessBtn,
    handleDeleteFileCnfDialogOnCancelBtn,
    handleDeleteFileCnfDialogOnSuccessBtn,
  } = useMRTMediaColDefsFactory(fetchAllMedias);

  const table = useMaterialReactTable({
    columns,
    data: media,
    ...GlobalTableCss,
    manualPagination: true,
    rowCount: paginationMetadata?.totalElements ?? 0,
    pageCount: paginationMetadata?.totalPages ?? 0,
    onPaginationChange: setPagination,
    state: { isLoading, pagination },
  });

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 1 }}>
        <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
          <Heading
            Icon={MovieIcon}
            color={theme.palette.primary.main}
            iconColor={theme.palette.warning.main}
            text="Media Listings"
          />

          <Divider />

          <AppAlert
            alert={alert}
            handleAlertOnClose={handleAlertOnClose}
            type={alert?.type}
          />

          <AppAlert
            alert={cnfDialogAlert}
            handleAlertOnClose={handleCnfDialogAlertOnClose}
            type={cnfDialogAlert?.type}
          />

          <FlexBox
            sx={{ my: 1, alignItems: "center", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="success"
              startIcon={<UploadFile fontSize="small" color="success" />}
              onClick={handleUploadDialogOnClose}
            >
              Upload Media
            </Button>
          </FlexBox>

          <MRTContainer>
            <MaterialReactTable table={table} />
          </MRTContainer>
        </Paper>
      </Container>

      {showUploadDialog && (
        <UploadNewMediaModal
          isOpen={showUploadDialog}
          onClose={handleUploadDialogOnClose}
          onSuccess={fetchAllMedias}
        />
      )}

      {showCnfDialogs.makePrivate && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={loading.makePrivate}
          onCancel={handleMakeFilePrivateCnfDialogOnCancelBtn}
          open={showCnfDialogs.makePrivate}
          text={
            <Typography variant="body1" sx={{ my: 1 }}>
              Are you sure you want to make this file private? Please note that
              this action will make this file in-accessible.
            </Typography>
          }
          onSuccess={handleMakeFilePrivateCnfDialogOnSuccessBtn}
        />
      )}

      {showCnfDialogs.makePublic && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={loading.makePublic}
          onCancel={handleMakeFilePublicCnfDialogOnCancelBtn}
          open={showCnfDialogs.makePublic}
          text={
            <Typography variant="body1" sx={{ my: 1 }}>
              Are you sure you want to make this file public? Please note that
              this action will make this file accessible to everyone on the
              internet.
            </Typography>
          }
          onSuccess={handleMakeFilePublicCnfDialogOnSuccessBtn}
        />
      )}

      {showCnfDialogs.delete && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={loading.delete}
          onCancel={handleDeleteFileCnfDialogOnCancelBtn}
          open={showCnfDialogs.delete}
          text={
            <Typography variant="body1" sx={{ my: 1, textAlign: "justify" }}>
              Are you sure you want to delete this file permanently? Please note
              that this action is{" "}
              <Box
                component="span"
                sx={(theme) => ({
                  fontWeight: 700,
                  color: theme.palette.error.main,
                })}
              >
                irreversible
              </Box>{" "}
              in nature and hence cannot be undone afterwards. Please also note
              that once deleted, complete action panel of this media will get
              disabled.
            </Typography>
          }
          onSuccess={handleDeleteFileCnfDialogOnSuccessBtn}
        />
      )}
    </>
  );
}

export default React.memo(ResultsPage);

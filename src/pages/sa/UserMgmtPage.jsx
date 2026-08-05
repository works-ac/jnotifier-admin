import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback } from "react";
import useAppCss from "../../hooks/useAppCss";
import Heading from "../../components/Heading";
import { People, PersonAddAlt, QuestionMark } from "@mui/icons-material";
import FlexBox from "../../components/styled/FlexBox";
import useUserMgmt from "../../hooks/features/useUserMgmt";
import AppAlert from "../../components/AppAlert";
import useMRTUserMgmtColDefsFactory from "../../hooks/mrt/useMRTUserMgmtColDefsFactory";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import NewAccountCreationModal from "../../components/dialogs/NewAccountCreationModal";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import UserAccountVerificationDialog from "../../components/dialogs/UserAccountVerificationDialog";
import Notes from "../../components/Notes";

function UserMgmtPage() {
  const theme = useTheme();
  const { GlobalPaperCss, GlobalTableCss } = useAppCss();
  const {
    alert,
    isLoading,
    pagination,
    users,
    paginationMetadata,
    showAccountCreationDialog,
    handleAlertOnClose,
    setPagination,
    fetchAllUserDetails,
    handleDialogOnClose,
  } = useUserMgmt();
  const {
    MRTColumns: columns,
    showCnfDialog,
    dialog,
    selectedRow,
    loader,
    alert: mrtAlert,
    handleAlertOnClose: mrtHandleAlertOnClose,
    handleSuspendCnfDialogOnSuccessBtnClick,
    handleVerifyCnfDialogOnSuccessBtnClick,
    handleCnfDialogOnCancelBtnClick,
    handleDialogOnClose: handleModalOnClose,
    handleActivateCnfDialogOnSuccessBtnClick,
    handleDeleteCnfDialogOnSuccessBtnClick,
  } = useMRTUserMgmtColDefsFactory();

  const table = useMaterialReactTable({
    columns,
    data: users,
    ...GlobalTableCss,
    manualPagination: true,
    rowCount: paginationMetadata?.totalElements ?? 0,
    pageCount: paginationMetadata?.totalPages ?? 0,
    onPaginationChange: setPagination,
    state: { isLoading, pagination },
  });

  const onSuccessHandler = useCallback(
    async function () {
      handleDialogOnClose();
      await fetchAllUserDetails();
    },
    [fetchAllUserDetails],
  );

  const onVerifyUserDialogSuccessHandler = useCallback(
    async function () {
      handleModalOnClose("verify");
      await fetchAllUserDetails();
    },
    [fetchAllUserDetails],
  );

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
          <Heading
            Icon={People}
            color={theme.palette.primary.main}
            iconColor={theme.palette.warning.main}
            text="User Management"
          />

          <Divider />

          <FlexBox sx={{ justifyContent: "flex-end", my: 1 }}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<PersonAddAlt fontSize="small" />}
              onClick={handleDialogOnClose}
            >
              Create an account
            </Button>
          </FlexBox>

          <AppAlert
            alert={alert}
            handleAlertOnClose={handleAlertOnClose}
            type={alert?.type}
          />

          <AppAlert
            alert={mrtAlert}
            handleAlertOnClose={mrtHandleAlertOnClose}
            type={mrtAlert?.type}
          />

          <Box component="div" sx={{ my: 1 }}>
            <MaterialReactTable table={table} />
          </Box>

          <Box component="div" sx={{ my: 1 }}>
            <Notes
              note="Due to security reasons, highly sensitive information are not displayed here."
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Kindly be cautious while deleting a user because once deleted you will not be able to perform any further actions on that user."
              noteColor={theme.palette.secondary.main}
            />
          </Box>
        </Paper>
      </Container>

      {showAccountCreationDialog && (
        <NewAccountCreationModal
          isOpen={showAccountCreationDialog}
          onClose={handleDialogOnClose}
          onSuccess={onSuccessHandler}
        />
      )}

      {showCnfDialog.verify && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={false}
          open={showCnfDialog.verify}
          text={
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Are you sure you want to verify this user? This may incur some
              charges.
            </Typography>
          }
          onCancel={() => handleCnfDialogOnCancelBtnClick("verify")}
          onSuccess={handleVerifyCnfDialogOnSuccessBtnClick}
        />
      )}

      {showCnfDialog.suspend && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={loader.suspension}
          open={showCnfDialog.suspend}
          text={
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Are you sure you want to suspend this user? Please note that once
              suspended, user will be temporarily prohibited from login.
            </Typography>
          }
          onCancel={() => handleCnfDialogOnCancelBtnClick("suspend")}
          onSuccess={() =>
            handleSuspendCnfDialogOnSuccessBtnClick(fetchAllUserDetails)
          }
        />
      )}

      {showCnfDialog.activate && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={loader.activation}
          open={showCnfDialog.activate}
          text={
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Are you sure you want to activate this user? Please note that this
              will resume login operation of this user.
            </Typography>
          }
          onCancel={() => handleCnfDialogOnCancelBtnClick("activate")}
          onSuccess={() =>
            handleActivateCnfDialogOnSuccessBtnClick(fetchAllUserDetails)
          }
        />
      )}

      {showCnfDialog.delete && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={loader.deletion}
          open={showCnfDialog.delete}
          text={
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Are you sure you want to delete this user? Please note that this
              action is irreversible. Once deleted, the user is permanently
              unrecoverable, and you will no longer be able to perform any
              actions on their account.
            </Typography>
          }
          onCancel={() => handleCnfDialogOnCancelBtnClick("delete")}
          onSuccess={() =>
            handleDeleteCnfDialogOnSuccessBtnClick(fetchAllUserDetails)
          }
        />
      )}

      {dialog.verify && (
        <UserAccountVerificationDialog
          email={selectedRow?.email}
          isOpen={dialog.verify}
          onClose={() => handleModalOnClose("verify")}
          onSuccess={onVerifyUserDialogSuccessHandler}
        />
      )}
    </>
  );
}

export default UserMgmtPage;

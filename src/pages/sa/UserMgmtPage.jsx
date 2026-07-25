import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import React, { useCallback } from "react";
import useAppCss from "../../hooks/useAppCss";
import Heading from "../../components/Heading";
import { People, PersonAddAlt } from "@mui/icons-material";
import FlexBox from "../../components/styled/FlexBox";
import useUserMgmt from "../../hooks/features/useUserMgmt";
import AppAlert from "../../components/AppAlert";
import useMRTUserMgmtColDefsFactory from "../../hooks/mrt/useMRTUserMgmtColDefsFactory";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import NewAccountCreationModal from "../../components/dialogs/NewAccountCreationModal";

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
  const { MRTColumns: columns } = useMRTUserMgmtColDefsFactory();

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

          <Box component="div" sx={{ my: 1 }}>
            <MaterialReactTable table={table} />
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
    </>
  );
}

export default UserMgmtPage;

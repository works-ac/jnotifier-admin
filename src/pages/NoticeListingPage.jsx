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
import { AddAlert, QuestionMark } from "@mui/icons-material";
import useNotices from "../hooks/features/useNotices";
import AppAlert from "../components/AppAlert";
import useMRTJobAlertColDefsFactory from "../hooks/mrt/useMRTJobAlertColDefsFactory";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ConfirmationDialog from "../components/ConfirmationDialog";

function NoticeListingPage() {
  const theme = useTheme();
  const { GlobalPaperCss, GlobalTableCss } = useAppCss();
  const {
    alert,
    handleAlertOnClose,
    isLoading,
    notices,
    paginationMetadata,
    setPagination,
    pagination,
  } = useNotices();

  const {
    JobAlertColumns: columns,
    showViewDialog,
    dialogContent,
    showDialog,
    loading,
    row,
    setShowDialog,
    setShowViewDialog,
    markAsArchived,
    activateJobAlert,
  } = useMRTJobAlertColDefsFactory();

  const table = useMaterialReactTable({
    columns,
    data: notices,
    ...GlobalTableCss,
    manualPagination: true,
    rowCount: paginationMetadata?.totalElements ?? 0,
    pageCount: paginationMetadata?.totalPages ?? 0,
    onPaginationChange: setPagination,
    state: { isLoading, pagination },
  });

  return (
    <>
      <Container maxWidth sx={{ my: 2 }}>
        <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
          <Heading
            Icon={AddAlert}
            color={theme.palette.primary.main}
            iconColor={theme.palette.warning.main}
            text="Job Alerts"
          />

          <Divider />

          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              my: 2,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<AddAlert fontSize="small" />}
              color="success"
            >
              Add Job Alert
            </Button>
          </Box>

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

      {showDialog && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={loading.archive || loading.activate}
          text={
            <Typography
              sx={{ textAlign: "justify", fontWeight: 700 }}
              variant="body1"
            >
              {dialogContent}
            </Typography>
          }
          open={showDialog}
          onCancel={() => setShowDialog(false)}
          onSuccess={row?.isActive ? markAsArchived : activateJobAlert}
        />
      )}
    </>
  );
}

export default React.memo(NoticeListingPage);

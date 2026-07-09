import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import useAppCss from "../hooks/useAppCss";
import Heading from "../components/Heading";
import { Add, SwapHoriz, Work } from "@mui/icons-material";
import useHome from "../hooks/useHome";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import AppAlert from "../components/AppAlert";
import useMRTColDefsFactory from "../hooks/mrt/useMRTColDefsFactory";
import AddJobModal from "../components/dialogs/AddJobModal";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ViewJobModal from "../components/dialogs/ViewJobModal";

function ListedJobs() {
  const theme = useTheme();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { GlobalPaperCss, GlobalTableCss } = useAppCss();
  const {
    alert,
    handleAlertOnClose,
    isLoading,
    jobs,
    paginationMetadata,
    setPagination,
    pagination,
  } = useHome();
  const {
    ListedJobsColumns: columns,
    cancelToggle,
    confirmToggle,
    setShowViewDialog,
    pendingToggle,
    isProcessing,
    jobDetails,
    showViewDialog,
  } = useMRTColDefsFactory();

  const table = useMaterialReactTable({
    columns,
    data: jobs,
    ...GlobalTableCss,
    manualPagination: true,
    rowCount: paginationMetadata?.totalElements ?? 0,
    pageCount: paginationMetadata?.totalPages ?? 0,
    onPaginationChange: setPagination,
    state: { isLoading, pagination },
  });

  /** Called by AddJobModal on successful creation — reset to page 1 to reload */
  const handleAddSuccess = () => {
    setAddModalOpen(false);
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  };

  return (
    <Container maxWidth sx={{ my: 2 }}>
      <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
        <Heading
          Icon={Work}
          iconColor={theme.palette.warning.main}
          color={theme.palette.primary.main}
          text="Listed Jobs"
        />

        <Divider />

        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        {/* Toolbar row */}
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mt: 1,
          }}
        >
          <Button
            variant="outlined"
            color="success"
            startIcon={<Add fontSize="small" />}
            onClick={() => setAddModalOpen(true)}
          >
            Add Job
          </Button>
        </Box>

        <Box component="div" sx={{ my: 2 }}>
          <MaterialReactTable table={table} />
        </Box>
      </Paper>

      <ConfirmationDialog
        open={!!pendingToggle}
        isLoading={isProcessing}
        Icon={SwapHoriz}
        heading="Confirm Status Change"
        text={
          pendingToggle
            ? `Are you sure you want to mark the job with application id "${pendingToggle.applicationId}" as ${pendingToggle.nextState ? "active" : "in-active"}?`
            : ""
        }
        onSuccess={confirmToggle}
        onCancel={cancelToggle}
      />

      <AddJobModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      {showViewDialog && (
        <ViewJobModal
          isOpen={showViewDialog}
          jobDetails={jobDetails}
          onClose={() => setShowViewDialog(false)}
        />
      )}
    </Container>
  );
}

export default React.memo(ListedJobs);

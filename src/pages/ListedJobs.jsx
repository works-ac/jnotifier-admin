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
import { Add, CloudUpload, SwapHoriz, Work } from "@mui/icons-material";
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
import EditJobModal from "../components/dialogs/EditJobModal";
import BulkJobCreationModal from "../components/dialogs/BulkJobCreationModal";
import UploadJobFilesModal from "../components/dialogs/UploadJobFilesModal";

function ListedJobs() {
  const theme = useTheme();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
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
    setShowEditDialog,
    setShowUploadFilesDialog,
    pendingToggle,
    isProcessing,
    jobDetails,
    showViewDialog,
    showEditDialog,
    showUploadFilesDialog,
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

  const pendingToggleStatusText = pendingToggle?.nextState
    ? "active"
    : "in-active";

  const confirmStatusText = pendingToggle
    ? `Are you sure you want to mark the job with application id "${pendingToggle.applicationId}" as ${pendingToggleStatusText}?`
    : "";

  /** Called by AddJobModal on successful creation — reset to page 1 to reload */
  const handleAddSuccess = () => {
    setAddModalOpen(false);
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  };

  /** Called by BulkJobCreationModal on successful bulk creation */
  const handleBulkSuccess = () => {
    setBulkModalOpen(false);
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  };

  const handleEditSuccess = () => {
    setShowEditDialog(false);
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  };

  const handleUploadFilesSuccess = () => {
    setShowUploadFilesDialog(false);
    setPagination({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize });
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
            gap: 1.5,
            mt: 1,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudUpload fontSize="small" />}
            onClick={() => setBulkModalOpen(true)}
          >
            Bulk Job Creation
          </Button>

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
        text={confirmStatusText}
        onSuccess={confirmToggle}
        onCancel={cancelToggle}
      />

      <AddJobModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      <BulkJobCreationModal
        open={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onSuccess={handleBulkSuccess}
      />

      {showViewDialog && (
        <ViewJobModal
          isOpen={showViewDialog}
          jobDetails={jobDetails}
          onClose={() => setShowViewDialog(false)}
        />
      )}

      {showEditDialog && (
        <EditJobModal
          open={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          onSuccess={handleEditSuccess}
          applicationDetails={jobDetails}
        />
      )}

      {showUploadFilesDialog && (
        <UploadJobFilesModal
          open={showUploadFilesDialog}
          job={jobDetails}
          onClose={() => setShowUploadFilesDialog(false)}
          onSuccess={handleUploadFilesSuccess}
        />
      )}
    </Container>
  );
}

export default React.memo(ListedJobs);

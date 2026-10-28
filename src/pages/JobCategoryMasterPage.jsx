import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import useAppCss from "../hooks/useAppCss";
import Heading from "../components/Heading";
import { Add, Category, QuestionMark } from "@mui/icons-material";
import useMRTJobCategoriesMasterColDefsFactory from "../hooks/mrt/useMRTJobCategoriesMasterColDefsFactory";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useJobCategoriesMaster from "../hooks/features/useJobCategoriesMaster";
import AppAlert from "../components/AppAlert";
import FlexBox from "../components/styled/FlexBox";
import AddNewJobCategoryMasterModal from "../components/dialogs/AddNewJobCategoryMasterModal";
import EditJobCategoryMasterModal from "../components/dialogs/EditJobCategoryMasterModal";
import ConfirmationDialog from "../components/ConfirmationDialog";

function JobCategoryMasterPage() {
  const theme = useTheme();
  const { GlobalPaperCss, GlobalTableCss } = useAppCss();
  const {
    handleAlertOnClose,
    setPagination,
    fetchAllJobCategories,
    handleAddDialogOnToggle,
    showAddDialog,
    alert,
    isLoading,
    jobCategories,
    pagination,
    paginationMetadata,
  } = useJobCategoriesMaster();

  const {
    MRTColumns: columns,
    showDialog,
    setShowDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    showEditDialog,
    setShowEditDialog,
    row,
    dialogContent,
    loading,
    deactivateCategory,
    activateCategory,
    deleteCategory,
  } = useMRTJobCategoriesMasterColDefsFactory(fetchAllJobCategories);

  const table = useMaterialReactTable({
    columns,
    data: jobCategories,
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
            Icon={Category}
            color={theme.palette.primary.main}
            iconColor={theme.palette.warning.main}
            text="Job Category Master"
          />

          <Divider />

          <AppAlert
            alert={alert}
            handleAlertOnClose={handleAlertOnClose}
            type={alert?.type}
          />

          <FlexBox
            sx={{ mt: 1, justifyContent: "flex-end", alignItems: "center" }}
          >
            <Button
              variant="outlined"
              color="success"
              size="small"
              startIcon={<Add fontSize="small" />}
              onClick={handleAddDialogOnToggle}
            >
              Add
            </Button>
          </FlexBox>

          <Box component="div" sx={{ my: 1 }}>
            <MaterialReactTable table={table} />
          </Box>
        </Paper>
      </Container>

      {showAddDialog && (
        <AddNewJobCategoryMasterModal
          isOpen={showAddDialog}
          onClose={handleAddDialogOnToggle}
          onSuccess={fetchAllJobCategories}
        />
      )}

      {showEditDialog && (
        <EditJobCategoryMasterModal
          key={row?.id}
          isOpen={showEditDialog}
          categoryDetails={row}
          onClose={() => setShowEditDialog(false)}
          onSuccess={fetchAllJobCategories}
        />
      )}

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
          onSuccess={row?.isActive ? deactivateCategory : activateCategory}
        />
      )}

      {showDeleteDialog && (
        <ConfirmationDialog
          Icon={QuestionMark}
          heading="Confirmation"
          isLoading={loading.delete}
          text={
            <Typography
              sx={{ textAlign: "justify", fontWeight: 700 }}
              variant="body1"
            >
              {dialogContent}
            </Typography>
          }
          open={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onSuccess={deleteCategory}
        />
      )}
    </>
  );
}

export default JobCategoryMasterPage;

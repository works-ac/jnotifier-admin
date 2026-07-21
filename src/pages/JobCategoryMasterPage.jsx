import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import React from "react";
import useAppCss from "../hooks/useAppCss";
import Heading from "../components/Heading";
import { Add, Category } from "@mui/icons-material";
import useMRTJobCategoriesMasterColDefsFactory from "../hooks/mrt/useMRTJobCategoriesMasterColDefsFactory";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useJobCategoriesMaster from "../hooks/features/useJobCategoriesMaster";
import AppAlert from "../components/AppAlert";
import FlexBox from "../components/styled/FlexBox";
import AddNewJobCategoryMasterModal from "../components/dialogs/AddNewJobCategoryMasterModal";

function JobCategoryMasterPage() {
  const theme = useTheme();
  const { GlobalPaperCss, GlobalTableCss } = useAppCss();
  const { MRTColumns: columns } = useMRTJobCategoriesMasterColDefsFactory();
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
    </>
  );
}

export default JobCategoryMasterPage;

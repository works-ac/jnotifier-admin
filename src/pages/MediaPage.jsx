import React from "react";
import useAppCss from "../hooks/useAppCss";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
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
import { UploadFile } from "@mui/icons-material";
import UploadNewMediaModal from "../components/dialogs/UploadNewMediaModal";

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
  const { MediaListingCols: columns } = useMRTMediaColDefsFactory();

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
    </>
  );
}

export default React.memo(ResultsPage);

import { useCallback, useMemo, useState } from "react";
import useAppCss from "../useAppCss";
import { Chip, IconButton, Paper } from "@mui/material";
import dayjs from "dayjs";
import { Delete, Edit, Pause, PlayCircle } from "@mui/icons-material";
import AppTooltip from "../../components/core/AppTooltip";
import { toast } from "react-toastify";
import { getToastNotification } from "../../helpers";
import {
  deleteJobCategory,
  markJobCategoryAsActive,
  markJobCategoryAsArchive,
} from "../../services/JobCategoriesMasterServices";

function useMRTJobCategoriesMasterColDefsFactory(onRefresh) {
  const { GlobalNormalChipCss } = useAppCss();
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [row, setRow] = useState(null);
  const [dialogContent, setDialogContent] = useState("");
  const [loading, setLoading] = useState({
    archive: false,
    activate: false,
    delete: false,
  });

  const handleEditBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowEditDialog(true);
  }, []);

  const handleMarkAsArchivedBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowDialog(true);
    setDialogContent(
      "Are you sure you want to mark this job category as in-active? This will make the category inactive.",
    );
  }, []);

  const handleMarkAsActiveBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowDialog(true);
    setDialogContent(
      "Are you sure you want to mark this job category as active? This will make the category active.",
    );
  }, []);

  const handleDeleteBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowDeleteDialog(true);
    setDialogContent(
      "Are you sure you want to delete this job category? This action cannot be undone.",
    );
  }, []);

  const deactivateCategory = useCallback(async function () {
    if (!row) return;

    setLoading((prev) => ({ ...prev, archive: true }));

    try {
      await markJobCategoryAsArchive(row.id);
      toast.success("Job category marked as in-active.", getToastNotification());
      setShowDialog(false);
      if (typeof onRefresh === "function") await onRefresh();
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ??
        error?.response?.data?.msg ??
        error?.message ??
        "Failed to mark this job category as in-active.";
      toast.error(message, getToastNotification());
    } finally {
      setLoading((prev) => ({ ...prev, archive: false }));
    }
  }, [row, onRefresh]);

  const activateCategory = useCallback(async function () {
    if (!row) return;

    setLoading((prev) => ({ ...prev, activate: true }));

    try {
      await markJobCategoryAsActive(row.id);
      toast.success("Job category marked as active.", getToastNotification());
      setShowDialog(false);
      if (typeof onRefresh === "function") await onRefresh();
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ??
        error?.response?.data?.msg ??
        error?.message ??
        "Failed to mark this job category as active.";
      toast.error(message, getToastNotification());
    } finally {
      setLoading((prev) => ({ ...prev, activate: false }));
    }
  }, [row, onRefresh]);

  const deleteCategory = useCallback(async function () {
    if (!row) return;

    setLoading((prev) => ({ ...prev, delete: true }));

    try {
      await deleteJobCategory(row.id);
      toast.success("Job category deleted successfully.", getToastNotification());
      setShowDeleteDialog(false);
      if (typeof onRefresh === "function") await onRefresh();
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ??
        error?.response?.data?.msg ??
        error?.message ??
        "Failed to delete this job category.";
      toast.error(message, getToastNotification());
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  }, [row, onRefresh]);

  const MRTColumns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Job Category ID",
        size: 100,
      },
      {
        accessorKey: "categoryName",
        header: "Job Category Name",
      },
      {
        accessorKey: "isActive",
        header: "Category Status",
        Cell: ({ cell }) => {
          const colVal = cell?.getValue() ?? false;

          if (colVal)
            return (
              <Chip
                label="Active"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.success.main,
                  border: `1px solid ${theme.palette.success.main}`,
                  backgroundColor: "transparent",
                  outline: "none",
                })}
              />
            );

          return (
            <Chip
              label="In-active"
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: theme.palette.error.main,
                border: `1px solid ${theme.palette.error.main}`,
                backgroundColor: "transparent",
                outline: "none",
              })}
            />
          );
        },
      },
      {
        accessorKey: "isDeleted",
        header: "Category Deletion Status",
        Cell: ({ cell }) => {
          const colVal = cell?.getValue() ?? false;

          if (!colVal)
            return (
              <Chip
                label="Not Deleted"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.success.main,
                  border: `1px solid ${theme.palette.success.main}`,
                  backgroundColor: "transparent",
                  outline: "none",
                })}
              />
            );

          return (
            <Chip
              label="Deleted"
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: theme.palette.error.main,
                border: `1px solid ${theme.palette.error.main}`,
                backgroundColor: "transparent",
                outline: "none",
              })}
            />
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Posted Date",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;
          const postedDate = dayjs(new Date(value)).format("DD-MM-YYYY");

          return postedDate;
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Last Modified Date",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;
          const postedDate = dayjs(new Date(value)).format("DD-MM-YYYY");

          return postedDate;
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => {
          const rowData = row?.original ?? {};
          const isActive = rowData?.isActive ?? false;
          const isDeleted = rowData?.isDeleted ?? false;

          return (
            <Paper
              variant="elevation"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                backgroundColor: "transparent",
                p: 0.5,
                maxWidth: "max-content",
              }}
              elevation={1}
            >
              {!isDeleted && (
                <AppTooltip title="Edit">
                  <IconButton
                    color="warning"
                    onClick={() => handleEditBtn(rowData)}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </AppTooltip>
              )}

              {isActive && !isDeleted && (
                <AppTooltip title="Mark this category as in-active">
                  <IconButton
                    color="warning"
                    onClick={() => handleMarkAsArchivedBtn(rowData)}
                    size="small"
                  >
                    <Pause fontSize="small" />
                  </IconButton>
                </AppTooltip>
              )}

              {!isActive && !isDeleted && (
                <AppTooltip title="Mark this category as active">
                  <IconButton
                    color="success"
                    onClick={() => handleMarkAsActiveBtn(rowData)}
                    size="small"
                  >
                    <PlayCircle fontSize="small" />
                  </IconButton>
                </AppTooltip>
              )}

              {!isDeleted && (
                <AppTooltip title="Delete this category">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteBtn(rowData)}
                    size="small"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </AppTooltip>
              )}
            </Paper>
          );
        },
      },
    ],
    [
      GlobalNormalChipCss,
      handleDeleteBtn,
      handleEditBtn,
      handleMarkAsActiveBtn,
      handleMarkAsArchivedBtn,
    ],
  );

  return {
    MRTColumns,
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
  };
}

export default useMRTJobCategoriesMasterColDefsFactory;

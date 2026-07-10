import React, { useCallback, useMemo, useState } from "react";
import useAppCss from "../useAppCss";
import Markdown from "react-markdown";
import { Box, Chip, CircularProgress, IconButton, Paper } from "@mui/material";
import dayjs from "dayjs";
import {
  Delete,
  DeleteForever,
  Edit,
  Pause,
  PlayCircle,
  Visibility,
} from "@mui/icons-material";
import AppTooltip from "../../components/core/AppTooltip";
import { toast } from "react-toastify";
import { getToastNotification } from "../../helpers";
import {
  deleteNotice,
  markNoticeAsActive,
  markNoticeAsArchived,
} from "../../services/NoticeService";
import useViews from "../core/useViews";

function useMRTJobAlertColDefsFactory() {
  const { GlobalChipCss } = useAppCss();
  const [showDialog, setShowDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [row, setRow] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);
  const [loading, setLoading] = useState({
    archive: false,
    activate: false,
    delete: false,
  });
  const { isLoading: isViewNoticeModalLoading } = useViews("/notice");

  const handleViewBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowViewDialog(true);
  }, []);

  const handleEditBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowEditDialog(true);
  }, []);

  const handleMarkAsArchivedBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowDialog(true);
    setDialogContent(
      "Are you sure you want to mark this job alert as archived? This will make the job alert inactive and it will no longer be visible to users in the job alerts listing.",
    );
  }, []);

  const handleMarkAsActiveBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowDialog(true);
    setDialogContent(
      "Are you sure you want to mark this job alert as active? This will make the job alert active and it will be visible to users in the job alerts listing.",
    );
  }, []);

  const handleDeleteNoticeBtn = useCallback(function (rowDetails) {
    setRow(rowDetails);
    setShowDeleteDialog(true);
    setDialogContent(
      "Are you sure you want to delete this job alert? This action cannot be undone as you will not able to recover this job alert from your admin panel.",
    );
  }, []);

  const markAsArchived = useCallback(
    async function () {
      if (!row) return;

      setLoading((prev) => ({ ...prev, archive: true }));

      try {
        await markNoticeAsArchived(row.id);
        globalThis.location.reload();
      } catch (error) {
        const message =
          error?.response?.error?.message ??
          "Failed to mark this job alert as archived.";
        toast.error(message, getToastNotification());
      } finally {
        setLoading((prev) => ({ ...prev, archive: false }));
      }
    },
    [row],
  );

  const activateJobAlert = useCallback(
    async function () {
      if (!row) return;

      setLoading((prev) => ({ ...prev, activate: true }));

      try {
        await markNoticeAsActive(row.id);
        globalThis.location.reload();
      } catch (error) {
        const message =
          error?.response?.error?.message ??
          "Failed to mark this job alert as active.";
        toast.error(message, getToastNotification());
      } finally {
        setLoading((prev) => ({ ...prev, activate: false }));
      }
    },
    [row],
  );

  const deleteJobAlert = useCallback(
    async function () {
      if (!row) return;

      setLoading((prev) => ({ ...prev, delete: true }));

      try {
        await deleteNotice(row.id);
        globalThis.location.reload();
      } catch (error) {
        const message =
          error?.response?.error?.message ??
          "Failed to mark this job alert as active.";
        toast.error(message, getToastNotification());
      } finally {
        setLoading((prev) => ({ ...prev, delete: false }));
      }
    },
    [row],
  );

  const JobAlertColumns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Notice Id",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        header: "Notice Description",
        accessorKey: "noticeDescription",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? "";

          if (!value) return null;

          return (
            <Box sx={{ textAlign: "justify" }}>
              <Markdown>{value}</Markdown>
            </Box>
          );
        },
      },
      {
        header: "Notice Tags",
        accessorKey: "tags",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? "";

          if (!value) return null;

          return value
            .split(",")
            .filter((item) => item.trim())
            .map((item) => (
              <Chip label={item} key={item} sx={{ ...GlobalChipCss, m: 1 }} />
            ));
        },
        size: 200,
      },
      {
        header: "Notice Status",
        accessorKey: "isActive",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;

          if (value === null) return null;

          if (value === false) {
            return (
              <Chip
                label="In-Active"
                sx={(theme) => ({
                  ...GlobalChipCss,
                  borderColor: theme.palette.error.main,
                  outline: "none",
                  color: theme.palette.error.main,
                })}
                color="error"
              />
            );
          }

          return (
            <Chip
              label="Active"
              sx={(theme) => ({
                ...GlobalChipCss,
                borderColor: theme.palette.success.main,
                outline: "none",
                color: theme.palette.success.main,
              })}
              color="success"
            />
          );
        },
        size: 200,
      },
      {
        header: "Notice Deletion Status",
        accessorKey: "isDeleted",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? null;

          if (value === null) return null;

          if (value === false) {
            return (
              <Chip
                label="Active"
                sx={(theme) => ({
                  ...GlobalChipCss,
                  borderColor: theme.palette.success.main,
                  outline: "none",
                  color: theme.palette.success.main,
                })}
                color="error"
              />
            );
          }

          return (
            <Chip
              label="Deleted"
              sx={(theme) => ({
                ...GlobalChipCss,
                borderColor: theme.palette.error.main,
                outline: "none",
                color: theme.palette.error.main,
              })}
              color="error"
              icon={<DeleteForever fontSize="small" color="error" />}
            />
          );
        },
        size: 200,
      },
      {
        accessorKey: "createdAt",
        header: "Post Date",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? "";

          if (!value) return null;

          const date = new Date(value);
          const formattedDate = dayjs(date).format("YYYY-MM-DD");

          return (
            <Chip label={formattedDate} sx={GlobalChipCss} variant="outlined" />
          );
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
                p: 1,
                maxWidth: "max-content",
              }}
              elevation={1}
            >
              {!isDeleted && (
                <AppTooltip title="Edit">
                  <IconButton
                    color="warning"
                    onClick={() => handleEditBtn(rowData)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </AppTooltip>
              )}

              {isActive && !isDeleted && (
                <AppTooltip title="Mark this job alert as archived">
                  <IconButton
                    color="success"
                    onClick={() => handleMarkAsArchivedBtn(rowData)}
                  >
                    <Pause fontSize="small" />
                  </IconButton>
                </AppTooltip>
              )}

              {!isActive && !isDeleted && (
                <AppTooltip title="Mark this job alert as active">
                  <IconButton
                    color="error"
                    onClick={() => handleMarkAsActiveBtn(rowData)}
                  >
                    <PlayCircle fontSize="small" />
                  </IconButton>
                </AppTooltip>
              )}

              {!isDeleted && (
                <AppTooltip title="Delete this job alert">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteNoticeBtn(rowData)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </AppTooltip>
              )}

              <AppTooltip title="View details">
                <IconButton
                  color="primary"
                  onClick={() => handleViewBtn(rowData)}
                  disabled={isViewNoticeModalLoading}
                >
                  {isViewNoticeModalLoading ? (
                    <CircularProgress size={16} color="secondary" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </AppTooltip>
            </Paper>
          );
        },
        size: 30,
      },
    ],
    [row, showDialog, handleViewBtn, showDeleteDialog, handleEditBtn],
  );

  return {
    JobAlertColumns,
    dialogContent,
    showDialog,
    showViewDialog,
    showEditDialog,
    loading,
    row,
    showDeleteDialog,
    markAsArchived,
    activateJobAlert,
    setShowDialog,
    setShowViewDialog,
    setShowDeleteDialog,
    setShowEditDialog,
    deleteJobAlert,
  };
}

export default useMRTJobAlertColDefsFactory;

import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CheckCircle,
  CloudDownload,
  CloudUpload,
  DateRangeTwoTone,
  Delete,
  Edit,
  Error as ErrorIcon,
  InsertDriveFile,
  OpenInNew,
  Sell,
  TableChart,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import AppDialogTitle from "../core/AppDialogTitle";
import AppAlert from "../AppAlert";
import useAppCss from "../../hooks/useAppCss";
import EditBulkJobRowModal from "./EditBulkJobRowModal";
import { parseBulkJobExcel } from "../../helpers/excelParser";
import { bulkCreateJobs, downloadBulkTemplate } from "../../services/JobService";
import { getToastNotification } from "../../helpers";

function BulkJobCreationModal({ open, onClose, onSuccess }) {
  const theme = useTheme();
  const { GlobalTableCss, GlobalChipCss } = useAppCss();
  const fileInputRef = useRef(null);

  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Row editing modal state
  const [editingRow, setEditingRow] = useState(null);

  const validCount = useMemo(
    () => rows.filter((r) => r.isValid).length,
    [rows],
  );
  const invalidCount = useMemo(
    () => rows.filter((r) => !r.isValid).length,
    [rows],
  );

  const handleDownloadTemplate = async () => {
    try {
      setIsDownloading(true);
      const response = await downloadBulkTemplate();
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bulk-job-creation-template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);
    } catch {
      setAlert({
        type: "error",
        message: "Failed to download template. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls") &&
      !file.type.includes("spreadsheet")
    ) {
      setAlert({
        type: "error",
        message: "Please upload a valid Excel file (.xlsx).",
      });
      return;
    }

    try {
      setIsParsing(true);
      setAlert(null);
      const parsed = await parseBulkJobExcel(file);
      setRows(parsed);
      setFileName(file.name);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.message || "Failed to parse the Excel file.",
      });
      setRows([]);
      setFileName("");
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpdateRow = useCallback((updatedRow) => {
    setRows((prev) =>
      prev.map((r) => (r.id === updatedRow.id ? updatedRow : r)),
    );
  }, []);

  const handleDeleteRow = useCallback((rowId) => {
    setRows((prev) => prev.filter((r) => r.id !== rowId));
  }, []);

  const handleReset = () => {
    setRows([]);
    setFileName("");
    setAlert(null);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    handleReset();
    onClose();
  };

  const handleSubmit = async () => {
    if (rows.length === 0) {
      setAlert({
        type: "error",
        message: "No jobs to submit.",
      });
      return;
    }

    if (invalidCount > 0) {
      setAlert({
        type: "error",
        message:
          "Please fix all validation errors in the preview before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    setAlert(null);

    try {
      // Map rows to request format for backend
      const payload = rows.map((r) => ({
        title: r.title,
        shortDescription: r.shortDescription,
        tags: r.tags,
        applicationStartDate: r.applicationStartDate,
        applicationEndDate: r.applicationEndDate,
        advNo: r.advNo || null,
        applyLink: r.applyLink,
        status: true,
      }));

      await bulkCreateJobs(payload);

      toast.success(
        `Successfully created ${rows.length} jobs!`,
        getToastNotification(),
      );
      handleReset();
      onSuccess?.();
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.message ||
        "Failed to create jobs. Please review errors and try again.";
      setAlert({
        type: "error",
        message: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "rowNumber",
        header: "#",
        size: 50,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {cell.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: "isValid",
        header: "Validation",
        size: 110,
        Cell: ({ row }) => {
          const isValid = row.original.isValid;
          const errors = row.original.errors || {};
          const errorList = Object.values(errors)
            .map((msg) => `• ${msg}`)
            .join("\n");

          if (isValid) {
            return (
              <Chip
                label="Valid"
                color="success"
                size="small"
                variant="outlined"
                icon={<CheckCircle fontSize="small" />}
              />
            );
          }

          return (
            <Tooltip
              title={
                <Box sx={{ whiteSpace: "pre-line", p: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    Errors:
                  </Typography>
                  <Typography variant="caption" component="div">
                    {errorList}
                  </Typography>
                </Box>
              }
              arrow
            >
              <Chip
                label="Errors"
                color="error"
                size="small"
                variant="outlined"
                icon={<ErrorIcon fontSize="small" />}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        Cell: ({ row, cell }) => {
          const hasError = Boolean(row.original.errors?.title);
          return (
            <Tooltip
              title={hasError ? row.original.errors.title : ""}
              arrow
              disableHoverListener={!hasError}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: hasError ? "error.main" : "inherit",
                }}
              >
                {cell.getValue()}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "applicationStartDate",
        header: "Start Date",
        Cell: ({ row, cell }) => {
          const val = cell.getValue();
          const hasError = Boolean(row.original.errors?.applicationStartDate);
          return (
            <Tooltip
              title={hasError ? row.original.errors.applicationStartDate : ""}
              arrow
              disableHoverListener={!hasError}
            >
              <Chip
                label={val ? dayjs(val).format("DD-MM-YYYY") : "Missing"}
                sx={GlobalChipCss}
                color={hasError ? "error" : "default"}
                icon={<DateRangeTwoTone fontSize="small" color={hasError ? "error" : "success"} />}
                variant="outlined"
              />
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "applicationEndDate",
        header: "End Date",
        Cell: ({ row, cell }) => {
          const val = cell.getValue();
          const hasError = Boolean(row.original.errors?.applicationEndDate);
          return (
            <Tooltip
              title={hasError ? row.original.errors.applicationEndDate : ""}
              arrow
              disableHoverListener={!hasError}
            >
              <Chip
                label={val ? dayjs(val).format("DD-MM-YYYY") : "Missing"}
                sx={GlobalChipCss}
                color={hasError ? "error" : "default"}
                icon={<DateRangeTwoTone fontSize="small" color={hasError ? "error" : "success"} />}
                variant="outlined"
              />
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        Cell: ({ cell }) => {
          const val = cell.getValue() || "";
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {val
                .split(",")
                .filter((t) => t.trim())
                .map((t) => (
                  <Chip
                    key={t}
                    label={t.trim()}
                    size="small"
                    sx={{ fontSize: "0.75rem" }}
                    icon={<Sell fontSize="inherit" color="success" />}
                  />
                ))}
            </Box>
          );
        },
      },
      {
        accessorKey: "advNo",
        header: "Adv No",
        size: 90,
      },
      {
        accessorKey: "applyLink",
        header: "Apply Link",
        Cell: ({ row, cell }) => {
          const val = cell.getValue() || "";
          const hasError = Boolean(row.original.errors?.applyLink);
          return (
            <Tooltip
              title={hasError ? row.original.errors.applyLink : val}
              arrow
            >
              <Box
                component="a"
                href={val}
                target="_blank"
                rel="noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  maxWidth: 150,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: hasError ? "error.main" : "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                <span>{val}</span>
                <OpenInNew fontSize="inherit" />
              </Box>
            </Tooltip>
          );
        },
      },
      {
        id: "actions",
        header: "Action",
        size: 90,
        Cell: ({ row }) => (
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              backgroundColor: "transparent",
            }}
          >
            <Tooltip title="Update Row" arrow>
              <IconButton
                size="small"
                color="warning"
                onClick={() => setEditingRow(row.original)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove Row" arrow>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeleteRow(row.original.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Paper>
        ),
      },
    ],
    [GlobalChipCss, handleDeleteRow],
  );

  const table = useMaterialReactTable({
    columns,
    data: rows,
    ...GlobalTableCss,
    enablePagination: true,
    enableSorting: true,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    initialState: {
      density: "compact",
      pagination: { pageSize: 10, pageIndex: 0 },
    },
    muiTablePaperProps: {
      elevation: 1,
      sx: {
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      },
    },
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 3, minHeight: "60vh" } }}
      >
        <AppDialogTitle
          Icon={<TableChart fontSize="small" />}
          onClose={handleClose}
          title="Bulk Job Creation"
          bgColor="primary.main"
        />

        <Divider />

        <DialogContent sx={{ py: 2.5 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            style={{ display: "none" }}
          />

          {alert && (
            <AppAlert
              alert={alert}
              handleAlertOnClose={() => setAlert(null)}
              type={alert.type}
            />
          )}

          {/* Action / Toolbar Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CloudUpload fontSize="small" />}
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsing || isSubmitting}
              >
                {fileName ? "Change Excel File" : "Upload Excel File"}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                startIcon={
                  isDownloading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <CloudDownload fontSize="small" />
                  )
                }
                onClick={handleDownloadTemplate}
                disabled={isDownloading}
              >
                Download Template
              </Button>

              {fileName && (
                <Chip
                  icon={<InsertDriveFile fontSize="small" />}
                  label={fileName}
                  variant="outlined"
                  color="primary"
                  onDelete={handleReset}
                />
              )}
            </Box>

            {rows.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={`Total: ${rows.length}`}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={`Valid: ${validCount}`}
                  color="success"
                  size="small"
                  variant="outlined"
                />
                {invalidCount > 0 && (
                  <Chip
                    label={`Invalid: ${invalidCount}`}
                    color="error"
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </Box>

          {isParsing && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                gap: 2,
              }}
            >
              <CircularProgress size={40} color="primary" />
              <Typography variant="body1" color="text.secondary">
                Reading and validating Excel sheet...
              </Typography>
            </Box>
          )}

          {/* If no rows loaded yet */}
          {!isParsing && rows.length === 0 && (
            <Paper
              variant="outlined"
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 3,
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: theme.palette.primary.light,
                bgcolor: (t) => t.palette.action.hover,
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUpload
                sx={{ fontSize: 56, color: "primary.main", mb: 1.5 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Upload Excel Sheet to Create Jobs in Bulk
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 500, mx: "auto", mb: 2 }}
              >
                Upload the completed <code>bulk-job-creation-template.xlsx</code>.
                You can create up to 25 jobs at a time. The uploaded jobs will be previewed below so you can update individual rows before saving.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUpload fontSize="small" />}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Select Excel File
              </Button>
            </Paper>
          )}

          {/* Preview Table */}
          {!isParsing && rows.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {invalidCount > 0 && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block", mb: 1, fontWeight: 600 }}
                >
                  * Some rows have errors (marked in red). Click the Edit button in the Action column to fix errors before submitting.
                </Typography>
              )}
              <MaterialReactTable table={table} />
            </Box>
          )}
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, py: 2 }}>
          {rows.length > 0 && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Clear
            </Button>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={
              rows.length === 0 || invalidCount > 0 || isSubmitting || isParsing
            }
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <CloudUpload fontSize="small" />
              )
            }
          >
            {isSubmitting
              ? "Creating Jobs..."
              : `Create ${validCount} Job${validCount !== 1 ? "s" : ""}`}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Per-row editing dialog */}
      {editingRow && (
        <EditBulkJobRowModal
          key={editingRow.id}
          open={Boolean(editingRow)}
          row={editingRow}
          onClose={() => setEditingRow(null)}
          onSave={handleUpdateRow}
        />
      )}
    </>
  );
}

BulkJobCreationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default React.memo(BulkJobCreationModal);

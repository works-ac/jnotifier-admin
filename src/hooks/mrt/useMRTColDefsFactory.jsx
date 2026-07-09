import {
  DateRangeTwoTone,
  Delete,
  Pause,
  PlayArrow,
  Sell,
  Visibility,
} from "@mui/icons-material";
import {
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import useAppCss from "../useAppCss";
import { Box } from "@mui/material";
import Markdown from "react-markdown";
import { manageJobState } from "../../services/JobService";
import { toast } from "react-toastify";
import { getToastNotification } from "../../helpers";

export default function useMRTColDefsFactory() {
  const { GlobalChipCss } = useAppCss();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);

  // ── Confirmation dialog state ────────────────────────────────────────────
  // Holds the job that is pending a status toggle; null means dialog is closed.
  const [pendingToggle, setPendingToggle] = useState(null);
  // { applicationId: string, nextState: boolean (the new isActive value) }

  /** Opens the confirmation dialog for a specific job */
  const requestToggle = (applicationId, nextState) => {
    setPendingToggle({ applicationId, nextState });
  };

  /** Called when user clicks "Ok" in the confirmation dialog */
  const confirmToggle = async () => {
    if (!pendingToggle) return;
    const { applicationId, nextState } = pendingToggle;

    setIsProcessing(true);
    try {
      await manageJobState(applicationId, nextState);
      globalThis.location.reload();
      toast.success(
        `Job ${applicationId} marked as ${nextState ? "active" : "in-active"}.`,
        getToastNotification(),
      );
    } catch (error) {
      toast.error(error?.message, getToastNotification());
    } finally {
      setIsProcessing(false);
      setPendingToggle(null);
    }
  };

  /** Dismiss the dialog without doing anything */
  const cancelToggle = () => {
    if (isProcessing) return; // prevent closing mid-request
    setPendingToggle(null);
  };

  const handleViewBtn = useCallback(async function (rowData) {
    if (!rowData) return;

    setJobDetails(rowData);
    setShowViewDialog(true);
  }, []);

  // ── Column definitions ───────────────────────────────────────────────────
  const ListedJobsColumns = useMemo(
    () => [
      { accessorKey: "applicationId", header: "Application Id" },
      { accessorKey: "title", header: "Title" },
      {
        accessorKey: "applicationStartDate",
        header: "Application Start Date",
        Cell: ({ cell }) => (
          <Chip
            label={cell?.getValue()}
            sx={GlobalChipCss}
            icon={<DateRangeTwoTone fontSize="small" color="success" />}
            variant="outlined"
          />
        ),
      },
      {
        accessorKey: "applicationEndDate",
        header: "Application End Date",
        Cell: ({ cell }) => (
          <Chip
            label={cell?.getValue()}
            sx={GlobalChipCss}
            icon={<DateRangeTwoTone fontSize="small" color="success" />}
            variant="outlined"
          />
        ),
      },
      {
        accessorKey: "createdOn",
        header: "Post Date",
        Cell: ({ cell }) => (
          <Chip
            label={new Date(cell?.getValue())
              ?.toLocaleDateString("en-IN")
              ?.split("/")
              ?.reverse()
              .join("-")}
            sx={GlobalChipCss}
            icon={<DateRangeTwoTone fontSize="small" color="success" />}
            variant="outlined"
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? "";

          if (value) {
            return (
              <Chip label="ACTIVE" sx={GlobalChipCss} variant="outlined" />
            );
          }

          return (
            <Chip
              label="IN-ACTIVE"
              sx={(theme) => ({
                ...GlobalChipCss,
                border: `1px solid ${theme.palette.error.main}`,
                color: theme.palette.error.main,
              })}
              variant="outlined"
            />
          );
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        Cell: ({ cell }) => {
          const value = cell?.getValue() ?? "";

          if (!value) return null;

          return value
            .split(",")
            .filter((item) => item.trim())
            .map((item) => (
              <Chip
                label={item}
                key={item}
                sx={{ ...GlobalChipCss, m: 1 }}
                icon={<Sell fontSize="small" color="success" />}
              />
            ));
        },
      },
      {
        accessorKey: "shortDescription",
        header: "Short Description",
        Cell: ({ cell }) => (
          <Box component="div" sx={{ textAlign: "justify" }}>
            <Markdown>{cell?.getValue()}</Markdown>
          </Box>
        ),
      },
      { accessorKey: "advNo", header: "Advertisement No", size: 10 },
      {
        id: "actions",
        header: "Actions",
        size: 10,
        Cell: ({ row }) => {
          const record = row.original;
          const isActive = record?.status;

          return (
            <Paper
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
              <Tooltip
                title={isActive ? "Mark as In-Active" : "Mark as Active"}
                arrow
              >
                <span>
                  <IconButton
                    color="primary"
                    disabled={isProcessing}
                    onClick={() =>
                      requestToggle(record.applicationId, !isActive)
                    }
                  >
                    {isProcessing ? (
                      <CircularProgress size={16} color="secondary" />
                    ) : isActive ? (
                      <Pause fontSize="small" color="success" />
                    ) : (
                      <PlayArrow fontSize="small" color="secondary" />
                    )}
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Views" arrow>
                <IconButton
                  color="primary"
                  onClick={() => handleViewBtn(row?.original)}
                >
                  <Visibility fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Job" arrow>
                <IconButton color="error">
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Paper>
          );
        },
      },
    ],
    [isProcessing],
  );

  return {
    ListedJobsColumns,
    pendingToggle,
    cancelToggle,
    confirmToggle,
    setShowViewDialog,
    isProcessing,
    showViewDialog,
    jobDetails,
  };
}

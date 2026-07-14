import React, { useCallback, useMemo } from "react";
import useAppCss from "../useAppCss";
import { Chip, IconButton, Paper } from "@mui/material";
import {
  CalendarMonth,
  CopyAll,
  Download,
  Public,
  Shield,
} from "@mui/icons-material";
import dayjs from "dayjs";
import AppTooltip from "../../components/core/AppTooltip";
import { convertIntoMB } from "../../helpers";

function useMRTMediaColDefsFactory() {
  const { GlobalNormalChipCss } = useAppCss();

  const copyFileLink = useCallback(async function (link) {
    const publicUrl = import.meta.env.VITE_API_BASE_URL + "/downloads/" + link;
    await navigator.clipboard.writeText(publicUrl);
  }, []);

  const downloadFile = useCallback(async function (link) {
    const publicUrl = import.meta.env.VITE_API_BASE_URL + "/downloads/" + link;
    globalThis.open(publicUrl, "_blank");
  }, []);

  const MediaListingCols = useMemo(
    () => [
      {
        accessorKey: "fileName",
        header: "File Name",
      },
      {
        accessorKey: "fileType",
        header: "File Type",
      },
      {
        accessorKey: "fileSize",
        header: "File Size",
        Cell: ({ cell }) => {
          const colVal = cell?.getValue() ?? 0;

          return `${convertIntoMB(colVal)} MB`;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Posted Date",
        Cell: ({ cell }) => {
          const rawDate = cell?.getValue() ? new Date(cell?.getValue()) : null;
          const postedDate = dayjs(rawDate).format("DD-MM-YYYY");

          return (
            <Chip
              label={postedDate}
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: theme.palette.success.main,
                border: `1px solid ${theme.palette.success.main}`,
                backgroundColor: "transparent",
                outline: "none",
              })}
              icon={<CalendarMonth fontSize="small" color="success" />}
            />
          );
        },
      },
      {
        accessorKey: "isPublic",
        header: "Public Access",
        Cell: ({ cell }) => {
          const colVal = cell?.getValue() ?? false;

          if (colVal)
            return (
              <Chip
                label="Accessible"
                sx={(theme) => ({
                  ...GlobalNormalChipCss,
                  color: theme.palette.success.main,
                  border: `1px solid ${theme.palette.success.main}`,
                  backgroundColor: "transparent",
                  outline: "none",
                })}
                icon={<Public fontSize="small" color="success" />}
              />
            );

          return (
            <Chip
              label="Not Accessible"
              sx={(theme) => ({
                ...GlobalNormalChipCss,
                color: theme.palette.error.main,
                border: `1px solid ${theme.palette.error.main}`,
                backgroundColor: "transparent",
                outline: "none",
              })}
              icon={<Shield fontSize="small" color="error" />}
            />
          );
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => {
          const rowData = row?.original ?? {};
          const fileUri = rowData?.fileUri ?? null;

          return (
            <Paper
              variant="elevation"
              elevation={2}
              sx={{ p: 1, maxWidth: "max-content" }}
            >
              <AppTooltip title="Copy file link">
                <IconButton
                  disabled={!fileUri}
                  onClick={() => copyFileLink(fileUri)}
                >
                  <CopyAll fontSize="small" />
                </IconButton>
              </AppTooltip>

              <AppTooltip title="Click here to download the file">
                <IconButton
                  disabled={!fileUri}
                  onClick={() => downloadFile(fileUri)}
                >
                  <Download fontSize="small" color="primary" />
                </IconButton>
              </AppTooltip>
            </Paper>
          );
        },
      },
    ],
    [],
  );

  return { MediaListingCols };
}

export default useMRTMediaColDefsFactory;

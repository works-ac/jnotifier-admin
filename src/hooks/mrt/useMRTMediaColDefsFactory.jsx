import React, { useCallback, useMemo, useState } from "react";
import useAppCss from "../useAppCss";
import { Chip, IconButton, Paper } from "@mui/material";
import {
  CalendarMonth,
  CopyAll,
  DeleteForever,
  Download,
  Pause,
  PlayArrow,
  Public,
  Shield,
  Warning,
} from "@mui/icons-material";
import dayjs from "dayjs";
import AppTooltip from "../../components/core/AppTooltip";
import { convertIntoMB } from "../../helpers";
import useAppAlert from "../useAppAlert";
import {
  changeMediaVisibility,
  deleteMedia,
} from "../../services/MediaService";
import FlexBox from "../../components/styled/FlexBox";

function useMRTMediaColDefsFactory(fetchAllMedias) {
  const { GlobalNormalChipCss } = useAppCss();
  const [showCnfDialogs, setShowCnfDialogs] = useState({
    makePrivate: false,
    makePublic: false,
    delete: false,
  });
  const [loading, setLoading] = useState({
    makePrivate: false,
    makePublic: false,
    delete: false,
  });
  const [id, setId] = useState({
    mediaId: null,
  });
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const copyFileLink = useCallback(async function (link, mediaId) {
    const publicUrl =
      import.meta.env.VITE_API_BASE_URL +
      "/downloads/" +
      link +
      "?mediaId=" +
      mediaId;

    await navigator.clipboard.writeText(publicUrl);
  }, []);

  const downloadFile = useCallback(async function (link, mediaId) {
    const publicUrl =
      import.meta.env.VITE_API_BASE_URL +
      "/downloads/" +
      link +
      "?mediaId=" +
      mediaId;

    globalThis.open(publicUrl, "_blank");
  }, []);

  const handleMakeFilePrivateBtnClick = useCallback(function (mediaId) {
    setId((prev) => ({ ...prev, mediaId }));
    setShowCnfDialogs((prev) => ({ ...prev, makePrivate: true }));
  }, []);

  const handleMakeFilePrivateCnfDialogOnCancelBtn = useCallback(function () {
    setShowCnfDialogs((prev) => ({ ...prev, makePrivate: false }));
  }, []);

  const handleMakeFilePrivateCnfDialogOnSuccessBtn = useCallback(
    async function () {
      reset();
      setLoading((prev) => ({ ...prev, makePrivate: true }));

      try {
        const payload = {
          mediaId: id.mediaId,
          visibility: false,
        };

        await changeMediaVisibility(payload);
        if (typeof fetchAllMedias === "function") await fetchAllMedias();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setLoading((prev) => ({ ...prev, makePrivate: false }));
        setShowCnfDialogs((prev) => ({ ...prev, makePrivate: false }));
      }
    },
    [id, fetchAllMedias, reset, showErrorMsg],
  );

  const handleMakeFilePublicBtnClick = useCallback(function (mediaId) {
    setId((prev) => ({ ...prev, mediaId }));
    setShowCnfDialogs((prev) => ({ ...prev, makePublic: true }));
  }, []);

  const handleDeleteFileBtnClick = useCallback(function (mediaId) {
    setId((prev) => ({ ...prev, mediaId }));
    setShowCnfDialogs((prev) => ({ ...prev, delete: true }));
  }, []);

  const handleMakeFilePublicCnfDialogOnCancelBtn = useCallback(function () {
    setShowCnfDialogs((prev) => ({ ...prev, makePublic: false }));
  }, []);

  const handleMakeFilePublicCnfDialogOnSuccessBtn = useCallback(
    async function () {
      reset();
      setLoading((prev) => ({ ...prev, makePublic: true }));

      try {
        const payload = {
          mediaId: id.mediaId,
          visibility: true,
        };

        await changeMediaVisibility(payload);
        if (typeof fetchAllMedias === "function") await fetchAllMedias();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setLoading((prev) => ({ ...prev, makePublic: false }));
        setShowCnfDialogs((prev) => ({ ...prev, makePublic: false }));
      }
    },
    [id, fetchAllMedias, reset, showErrorMsg],
  );

  const handleDeleteFileCnfDialogOnCancelBtn = useCallback(function () {
    setShowCnfDialogs((prev) => ({ ...prev, delete: false }));
  }, []);

  const handleDeleteFileCnfDialogOnSuccessBtn = useCallback(
    async function () {
      reset();
      setLoading((prev) => ({ ...prev, delete: true }));

      try {
        await deleteMedia(id.mediaId);
        if (typeof fetchAllMedias === "function") await fetchAllMedias();
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setLoading((prev) => ({ ...prev, delete: false }));
        setShowCnfDialogs((prev) => ({ ...prev, delete: false }));
      }
    },
    [id],
  );

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
        Cell: ({ cell, row }) => {
          const colVal = cell?.getValue() ?? false;
          const isDeleted = row?.original?.isDeleted ?? false;

          if (colVal && !isDeleted)
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
          const isActive = rowData?.isPublic ?? false;
          const isDeleted = rowData?.isDeleted ?? false;
          const mediaId = rowData?.id ?? null;

          if (isDeleted)
            return (
              <FlexBox sx={{ justifyContent: "center" }}>
                <Chip
                  label="Not Available"
                  sx={(theme) => ({
                    ...GlobalNormalChipCss,
                    color: theme.palette.error.main,
                    border: `1px solid ${theme.palette.error.main}`,
                    backgroundColor: "transparent",
                    outline: "none",
                  })}
                  icon={<Warning fontSize="small" color="error" />}
                />
              </FlexBox>
            );

          return (
            <Paper
              variant="elevation"
              elevation={2}
              sx={{ p: 1, maxWidth: "max-content" }}
            >
              <AppTooltip title="Copy file link">
                <IconButton
                  disabled={!fileUri}
                  onClick={() => copyFileLink(fileUri, mediaId)}
                >
                  <CopyAll fontSize="small" />
                </IconButton>
              </AppTooltip>

              <AppTooltip title="Click here to download the file">
                <IconButton
                  disabled={!fileUri}
                  onClick={() => downloadFile(fileUri, mediaId)}
                >
                  <Download fontSize="small" color="primary" />
                </IconButton>
              </AppTooltip>

              {isActive && (
                <AppTooltip title="Click here to make the file private">
                  <IconButton
                    onClick={() => handleMakeFilePrivateBtnClick(mediaId)}
                  >
                    <Pause fontSize="small" color="warning" />
                  </IconButton>
                </AppTooltip>
              )}

              {!isActive && (
                <AppTooltip title="Click here to make the file public">
                  <IconButton
                    onClick={() => handleMakeFilePublicBtnClick(mediaId)}
                  >
                    <PlayArrow fontSize="small" color="secondary" />
                  </IconButton>
                </AppTooltip>
              )}

              <AppTooltip title="Click here to delete the file permanently.">
                <IconButton onClick={() => handleDeleteFileBtnClick(mediaId)}>
                  <DeleteForever fontSize="small" color="error" />
                </IconButton>
              </AppTooltip>
            </Paper>
          );
        },
        size: 200,
      },
    ],
    [],
  );

  return {
    MediaListingCols,
    showCnfDialogs,
    loading,
    alert,
    handleAlertOnClose,
    handleMakeFilePrivateBtnClick,
    handleMakeFilePrivateCnfDialogOnCancelBtn,
    handleMakeFilePublicBtnClick,
    handleMakeFilePublicCnfDialogOnCancelBtn,
    handleMakeFilePrivateCnfDialogOnSuccessBtn,
    handleMakeFilePublicCnfDialogOnSuccessBtn,
    handleDeleteFileCnfDialogOnCancelBtn,
    handleDeleteFileCnfDialogOnSuccessBtn,
  };
}

export default useMRTMediaColDefsFactory;

import { useCallback, useState } from "react";
import { downloadAdvertisement } from "../services/HomeServices";

function useJobDetails() {
  const [isCopying, setIsCopying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);
  const [advertisement, setAdvertisement] = useState(null);

  const copyDetailedAdv = useCallback(async function (text) {
    if (!text) return;
    setIsCopying(true);
    await navigator.clipboard.writeText(text);
    setIsCopying(false);
  }, []);

  const downloadAdv = useCallback(async function (uri) {
    setIsDownloading(true);
    const response = await downloadAdvertisement(uri);

    setAdvertisement(response.data);
    setIsDownloading(false);
    setIsPdfDialogOpen(true);
  }, []);

  const handlePdfDialogOnClose = useCallback(function () {
    setIsPdfDialogOpen((prev) => !prev);
  }, []);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const openShareDialog = useCallback(() => {
    setShareUrl(globalThis.location.href);
    setShareDialogOpen(true);
  }, []);

  const closeShareDialog = useCallback(() => {
    setShareDialogOpen(false);
  }, []);

  return {
    isCopying,
    shareDialogOpen,
    shareUrl,
    isDownloading,
    advertisement,
    isPdfDialogOpen,
    handlePdfDialogOnClose,
    downloadAdv,
    openShareDialog,
    copyDetailedAdv,
    closeShareDialog,
  };
}

export default useJobDetails;

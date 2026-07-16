import React, { useCallback, useState } from "react";
import { downloadAdvPdf } from "../../services/PublicService";
import {
  getErrorMsg,
  getToastNotification,
  handleDownload,
} from "../../helpers";
import { toast } from "react-toastify";

function useViewJobModal(jobDetails = {}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleDownloadAdvPdfBtn = useCallback(
    async function (e) {
      e.preventDefault();

      if (!jobDetails?.advUri || !jobDetails?.title) return;

      const uri = jobDetails.advUri.startsWith("/")
        ? jobDetails.advUri.slice(1)
        : jobDetails.advUri;
      const fileName =
        jobDetails.title.split(" ").join("-").toLowerCase().trim() + ".pdf";

      try {
        setIsDownloading(true);
        const response = await downloadAdvPdf(uri);
        const blob = new Blob([response.data], { type: "application/pdf" });

        handleDownload(blob, fileName);
      } catch (error) {
        console.error(error);
        const message = getErrorMsg(error);
        toast.error(message, getToastNotification());
      } finally {
        setIsDownloading(false);
      }
    },
    [jobDetails],
  );

  const handleShareDialogOnClose = useCallback(function () {
    setShowShareDialog((prev) => !prev);
  }, []);

  const handleCopyLinkBtn = useCallback(async function (url) {
    setIsCopied(true);
    await navigator.clipboard.writeText(url);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, []);

  return {
    isCopied,
    isDownloading,
    showShareDialog,
    handleCopyLinkBtn,
    handleShareDialogOnClose,
    handleDownloadAdvPdfBtn,
  };
}

export default useViewJobModal;

import React, { useCallback, useState } from "react";
import { getPageViews } from "../../services/ViewsService";

function useViewNoticeModal() {
  const [isCopied, setIsCopied] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

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
    showShareDialog,
    handleCopyLinkBtn,
    handleShareDialogOnClose,
  };
}

export default useViewNoticeModal;

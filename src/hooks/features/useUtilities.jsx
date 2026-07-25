import React, { useCallback, useState } from "react";

function useUtilities() {
  const [showWhatsAppLinkGenDialog, setShowWhatsAppLinkGenDialog] =
    useState(false);

  const handleWhatsAppLinkGenDialog = useCallback(function () {
    setShowWhatsAppLinkGenDialog((prev) => !prev);
  }, []);

  return { showWhatsAppLinkGenDialog, handleWhatsAppLinkGenDialog };
}

export default useUtilities;

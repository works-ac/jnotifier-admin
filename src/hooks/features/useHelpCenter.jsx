import React, { useCallback, useState } from "react";

function useHelpCenter() {
  const [showDialog, setShowDialog] = useState(false);

  const handleDialogToggle = useCallback(function () {
    setShowDialog((prev) => !prev);
  }, []);

  return { showDialog, handleDialogToggle };
}

export default useHelpCenter;

import React, { useCallback, useState } from "react";

function usePdfDialog() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = useCallback(function () {
    setIsFullScreen((prev) => !prev);
  }, []);

  return { isFullScreen, toggleFullScreen };
}

export default usePdfDialog;

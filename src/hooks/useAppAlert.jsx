import { useCallback, useState } from "react";

function useAppAlert() {
  const [alert, setAlert] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });

  const handleAlertOnClose = useCallback(
    function () {
      setAlert((prev) => ({
        ...prev,
        isOpen: false,
        message: "",
        type: "error",
      }));
    },
    [alert],
  );

  const reset = useCallback(function () {
    setAlert({ isOpen: false, message: "", type: "error" });
  }, []);

  const showErrorMsg = useCallback(
    function (error) {
      const message =
        error?.response?.data?.msg ??
        error?.response?.data?.error?.message ??
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong while processing your request, please try again!!!";

      setAlert((prev) => ({ ...prev, isOpen: true, message, type: "error" }));
    },
    [alert],
  );

  return { alert, setAlert, handleAlertOnClose, reset, showErrorMsg };
}

export default useAppAlert;

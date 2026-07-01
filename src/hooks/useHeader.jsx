import { useCallback, useEffect, useState } from "react";
import { ping } from "../services/AppService";
import useAppAlert from "./useAppAlert";

function useHeader() {
  const [appConnectivity, setAppConnectivity] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMsg, reset } = useAppAlert();

  const checkConnectivity = useCallback(async function () {
    setIsLoading(true);
    reset();

    try {
      const response = await ping();
      const message = response.data?.data?.message;

      setAppConnectivity(message);
    } catch (error) {
      console.error(error, "error");
      showErrorMsg(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkConnectivity();

    const intervalId = setInterval(() => {
      checkConnectivity();
    }, 60_000);

    return function () {
      clearInterval(intervalId);
    };
  }, []);

  return {
    appConnectivity,
    isLoading,
  };
}

export default useHeader;

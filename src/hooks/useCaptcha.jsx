import { useCallback, useEffect, useMemo, useState } from "react";
import { getCaptcha } from "../services/SignupService";
import { useDispatch } from "react-redux";
import { setCaptcha } from "../redux/slices/CaptchaSlice";
import { getErrorMsg, getToastNotification } from "../helpers";
import { toast } from "react-toastify";

function useCaptcha() {
  const [captchaUri, setCaptchaUri] = useState();
  const [captchaId, setCaptchaId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const appToastOptions = useMemo(() => getToastNotification(), []);

  const loadCaptcha = useCallback(async function () {
    try {
      const response = await getCaptcha();
      const uri = response.data?.data?.captchaImage;

      setCaptchaUri(uri);
      setCaptchaId(response.data?.data?.captchaId);
    } catch (error) {
      const message = getErrorMsg(error);
      toast.error(message, appToastOptions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reloadCaptcha = useCallback(
    async function () {
      setIsLoading(true);

      try {
        const response = await getCaptcha();
        const uri = response.data?.data?.captchaImage;

        setCaptchaUri(uri);
        setCaptchaId(response.data?.data?.captchaId);
      } catch (error) {
        const message = getErrorMsg(error);
        toast.error(message, appToastOptions);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  useEffect(() => {
    setIsLoading(true);
    loadCaptcha();
  }, []);

  useEffect(() => {
    dispatch(setCaptcha({ captchaId, captchaImage: captchaUri }));
  }, [captchaId, captchaUri]);

  return {
    isLoading,
    reloadCaptcha,
  };
}

export default useCaptcha;

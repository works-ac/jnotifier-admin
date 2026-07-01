import { useCallback } from "react";
import { AppVariables } from "../app/AppVariables";

function useFooter() {
  const handleWhatsAppBtnClick = useCallback(function () {
    window.open(AppVariables.WHATSAPP_CHANNEL_LINK, "_blank", {
      noopener: true,
      noreferrer: true,
    });
  }, []);

  const handleTelegramBtnClick = useCallback(function () {
    window.open(AppVariables.TELEGRAM_CHANNEL_LINK, "_blank", {
      noopener: true,
      noreferrer: true,
    });
  }, []);

  return { handleWhatsAppBtnClick, handleTelegramBtnClick };
}

export default useFooter;

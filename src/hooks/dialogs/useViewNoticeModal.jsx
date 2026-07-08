import React, { useCallback, useState } from "react";
import { getPageViews } from "../../services/ViewsService";
import { getToastNotification } from "../../helpers";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function useViewNoticeModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [viewsDetails, setViewsDetails] = useState(null);
  const location = useLocation();
  const visitedPage = globalThis.location.origin + "/notice";

  const handleGetPageViews = useCallback(async function (noticeId) {
    setIsLoading(true);

    try {
      const response = await getPageViews(`${visitedPage}/${noticeId}`);
      const data = response.data?.data ?? {};

      console.log(data);
      setViewsDetails(data);
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ?? "Failed to fetch page views";
      toast.error(message, getToastNotification());
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { viewsDetails, isLoading, handleGetPageViews };
}

export default useViewNoticeModal;

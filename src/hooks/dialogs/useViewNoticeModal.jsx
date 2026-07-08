import React, { useCallback, useState } from "react";
import { getPageViews } from "../../services/ViewsService";

function useViewNoticeModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [viewsDetails, setViewsDetails] = useState(null);
  const visitedPage = globalThis.location.origin + "/notice";

  const handleGetPageViews = useCallback(async function (noticeId) {
    setIsLoading(true);

    try {
      const response = await getPageViews(`${visitedPage}/${noticeId}`);
      const data = response.data?.data ?? {};

      console.log(data);
      setViewsDetails(data);
    } catch {
      setviewsDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { viewsDetails, isLoading, handleGetPageViews };
}

export default useViewNoticeModal;

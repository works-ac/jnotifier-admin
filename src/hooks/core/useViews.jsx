import React, { useCallback, useState } from "react";
import { getPageViews } from "../../services/ViewsService";

function useViews(relativeUrl) {
  const [isLoading, setIsLoading] = useState(false);
  const [viewsDetails, setViewsDetails] = useState(null);
  const visitedPage =
    import.meta.env.VITE_PRODUCTION_ADMIN_PANEL_URL + relativeUrl;

  const handleGetPageViews = useCallback(async function (noticeId) {
    setIsLoading(true);

    try {
      const response = await getPageViews(`${visitedPage}/${noticeId}`);
      const data = response.data?.data ?? {};

      setViewsDetails(data);
    } catch {
      setviewsDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { viewsDetails, isLoading, handleGetPageViews };
}

export default useViews;

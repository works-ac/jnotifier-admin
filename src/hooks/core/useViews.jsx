import React, { useCallback, useState } from "react";
import { getPageViews } from "../../services/ViewsService";

function useViews(relativeUrl) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewsDetails, setViewsDetails] = useState(null);
  const visitedPage =
    import.meta.env.VITE_PRODUCTION_ADMIN_PANEL_URL + relativeUrl;

  const handleGetPageViews = useCallback(
    async function (noticeId) {
      if (!noticeId || !relativeUrl || isLoading) return;

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
    },
    [isLoading, relativeUrl],
  );

  const handleRefreshPageViews = useCallback(
    async function (noticeId) {
      if (!noticeId || !relativeUrl || isRefreshing) return;

      setIsRefreshing(true);
      try {
        const response = await getPageViews(`${visitedPage}/${noticeId}`);
        const data = response.data?.data ?? {};

        setViewsDetails(data);
      } catch {
        setViewsDetails(null);
      } finally {
        setIsRefreshing(false);
      }
    },
    [isRefreshing, relativeUrl],
  );

  return {
    viewsDetails,
    isLoading,
    isRefreshing,
    handleRefreshPageViews,
    handleGetPageViews,
  };
}

export default useViews;

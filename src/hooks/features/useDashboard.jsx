import React, { useCallback, useState } from "react";
import useAppAlert from "../useAppAlert";
import { getTodayViews, getTotalViews } from "../../services/Dashboard";
import dayjs from "dayjs";

function useDashboard() {
  const [isLoading, setIsLoading] = useState({
    todayViews: false,
    totalViews: false,
  });
  const [views, setViews] = useState({ todayViews: 0, totalViews: 0 });
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchTodayViews = useCallback(async function () {
    reset();
    setIsLoading((prev) => ({ ...prev, todayViews: true }));

    try {
      const todayDate = dayjs().format("YYYY-MM-DD");
      const response = await getTodayViews(todayDate);
      const data = response?.data?.data;

      setViews((prev) => ({ ...prev, todayViews: data?.views ?? 0 }));
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, todayViews: false }));
    }
  }, []);

  const fetchTotalViews = useCallback(async function () {
    reset();
    setIsLoading((prev) => ({ ...prev, totalViews: true }));

    try {
      const response = await getTotalViews();
      const data = response?.data?.data;

      setViews((prev) => ({ ...prev, totalViews: data?.views ?? 0 }));
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, totalViews: false }));
    }
  }, []);

  const getDashboardAnalytics = useCallback(async function () {
    await Promise.all([fetchTodayViews(), fetchTotalViews()]);
  }, []);

  return {
    isLoading,
    views,
    alert,
    handleAlertOnClose,
    getDashboardAnalytics,
  };
}

export default useDashboard;

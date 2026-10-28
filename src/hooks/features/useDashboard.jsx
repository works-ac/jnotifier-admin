import { useCallback, useState } from "react";
import useAppAlert from "../useAppAlert";
import {
  getDashboardStats,
  getTodayViews,
  getTotalViews,
} from "../../services/Dashboard";
import dayjs from "dayjs";

function useDashboard() {
  const [isLoading, setIsLoading] = useState({
    todayViews: false,
    totalViews: false,
    stats: false,
  });
  const [views, setViews] = useState({ todayViews: 0, totalViews: 0 });
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalNotices: 0,
    totalUsers: 0,
    totalMedias: 0,
    archivedJobs: 0,
    archivedNotices: 0,
  });
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchTodayViews = useCallback(async function () {
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
  }, [showErrorMsg]);

  const fetchTotalViews = useCallback(async function () {
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
  }, [showErrorMsg]);

  const fetchDashboardStats = useCallback(async function () {
    setIsLoading((prev) => ({ ...prev, stats: true }));

    try {
      const response = await getDashboardStats();
      const data = response?.data?.data;

      setStats({
        totalJobs: data?.totalJobs ?? 0,
        totalNotices: data?.totalNotices ?? 0,
        totalUsers: data?.totalUsers ?? 0,
        totalMedias: data?.totalMedias ?? 0,
        archivedJobs: data?.archivedJobs ?? 0,
        archivedNotices: data?.archivedNotices ?? 0,
      });
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, stats: false }));
    }
  }, [showErrorMsg]);

  const getDashboardAnalytics = useCallback(async function () {
    reset();
    await Promise.all([
      fetchTodayViews(),
      fetchTotalViews(),
      fetchDashboardStats(),
    ]);
  }, [fetchTodayViews, fetchTotalViews, fetchDashboardStats, reset]);

  return {
    isLoading,
    views,
    stats,
    alert,
    handleAlertOnClose,
    getDashboardAnalytics,
  };
}

export default useDashboard;

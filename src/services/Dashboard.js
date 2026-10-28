import ApplicationApi from "../api/ApplicationApi";

const DASHBOARD_BASE_URI = "/dashboard/";

export async function getTodayViews(visitedDate) {
  return await ApplicationApi.get(DASHBOARD_BASE_URI + "today-views", {
    params: {
      visitedDate: visitedDate,
    },
  });
}

export async function getTotalViews() {
  return await ApplicationApi.get(DASHBOARD_BASE_URI + "total-views");
}

export async function getDashboardStats() {
  return await ApplicationApi.get(DASHBOARD_BASE_URI + "stats");
}

export async function getArchivedJobs() {
  return await ApplicationApi.get(DASHBOARD_BASE_URI + "archived-jobs");
}

export async function getArchivedNotices() {
  return await ApplicationApi.get(DASHBOARD_BASE_URI + "archived-notices");
}

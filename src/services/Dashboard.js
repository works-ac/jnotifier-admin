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

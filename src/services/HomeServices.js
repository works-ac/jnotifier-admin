import ApplicationApi from "../api/ApplicationApi";

const HOME_SERVICE_BASE_URL = "/public/";

export async function getJobs(payload) {
  const params = payload ?? { page: 0, size: 10 };
  return await ApplicationApi.get(HOME_SERVICE_BASE_URL + "jobs", { params });
}

export async function getJobById(applicationId) {
  return await ApplicationApi.get(
    HOME_SERVICE_BASE_URL + "applications/" + applicationId,
  );
}

export async function downloadAdvertisement(uri) {
  return await ApplicationApi.get("/public" + uri, {
    responseType: "blob",
    timeout: 0,
  });
}

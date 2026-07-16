import ApplicationApi from "../api/ApplicationApi";

const ADMIN_SERVICE_BASE_URL = "/admin/";

export async function createJob(payload) {
  return await ApplicationApi.post(
    ADMIN_SERVICE_BASE_URL + "applications",
    payload,
  );
}

export async function manageJobState(applicationId, isActive) {
  return await ApplicationApi.patch(
    ADMIN_SERVICE_BASE_URL + "applications/" + applicationId + "/status",
    { active: isActive },
  );
}

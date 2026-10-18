import ApplicationApi from "../api/ApplicationApi";

const ADMIN_SERVICE_BASE_URL = "/admin/";

export async function createJob(payload) {
  return await ApplicationApi.post(
    ADMIN_SERVICE_BASE_URL + "applications",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

export async function editJob(applicationId, payload) {
  return await ApplicationApi.put(
    ADMIN_SERVICE_BASE_URL + "applications/" + applicationId,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

export async function manageJobState(applicationId, isActive) {
  return await ApplicationApi.patch(
    ADMIN_SERVICE_BASE_URL + "applications/" + applicationId + "/status",
    { active: isActive },
  );
}

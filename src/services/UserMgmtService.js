import ApplicationApi from "../api/ApplicationApi";

const USERS_SERVICE_BASE_URI = "/users/";

export async function registerAdmin(payload) {
  return await ApplicationApi.post(
    USERS_SERVICE_BASE_URI + "register-admin",
    payload,
  );
}

export async function getUserDetails(params) {
  return await ApplicationApi.get(USERS_SERVICE_BASE_URI + "list", { params });
}

export async function markUserAsSuspended(userId) {
  return await ApplicationApi.patch(
    USERS_SERVICE_BASE_URI + "mark/suspended/" + userId,
  );
}

export async function activateUser(userId) {
  return await ApplicationApi.patch(
    USERS_SERVICE_BASE_URI + "mark/activate/" + userId,
  );
}

export async function markUserAsDeleted(userId) {
  return await ApplicationApi.delete(
    USERS_SERVICE_BASE_URI + "mark/deleted/" + userId,
  );
}

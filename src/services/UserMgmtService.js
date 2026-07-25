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

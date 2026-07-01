import ApplicationApi from "../api/ApplicationApi";

const ACCOUNTS_BASE_URI = "/users/";

export async function getMe() {
  return await ApplicationApi.get(ACCOUNTS_BASE_URI + "get-me");
}

export async function getUserProfile() {
  return await ApplicationApi.get(ACCOUNTS_BASE_URI + "profile");
}

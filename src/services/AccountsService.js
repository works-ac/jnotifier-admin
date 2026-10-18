import ApplicationApi from "../api/ApplicationApi";

const ACCOUNTS_BASE_URI = "/users/";

export async function getMe() {
  return await ApplicationApi.get(ACCOUNTS_BASE_URI + "get-me");
}

export async function getUserProfile() {
  return await ApplicationApi.get(ACCOUNTS_BASE_URI + "profile");
}

export async function uploadProfilePicture(formData) {
  return await ApplicationApi.post(ACCOUNTS_BASE_URI + "profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteProfilePicture() {
  return await ApplicationApi.delete(ACCOUNTS_BASE_URI + "profile-picture");
}

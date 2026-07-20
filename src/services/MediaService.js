import ApplicationApi from "../api/ApplicationApi";

const MEDIA_SERVICE_BASE_URL = "/media/";

export async function getAllMedia(payload) {
  const page = payload?.page ?? 0;
  const size = payload?.size ?? 10;

  return await ApplicationApi.get(MEDIA_SERVICE_BASE_URL + "list", {
    params: { page, size },
  });
}

export async function uploadNewMedia(payload) {
  return await ApplicationApi.post(MEDIA_SERVICE_BASE_URL + "add", payload);
}

export async function changeMediaVisibility(payload) {
  return await ApplicationApi.put(
    MEDIA_SERVICE_BASE_URL + "change/visibility",
    payload,
  );
}

export async function deleteMedia(mediaId) {
  return await ApplicationApi.delete(
    MEDIA_SERVICE_BASE_URL + "delete/" + mediaId,
  );
}

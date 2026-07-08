import ApplicationApi from "../api/ApplicationApi";

const NOTICE_SERVICE_BASE_URL = "/notice/";

export async function getAllActiveNotices(payload) {
  const page = payload?.page ?? 0;
  const size = payload?.size ?? 10;

  return await ApplicationApi.get(NOTICE_SERVICE_BASE_URL + "active", {
    params: { page, size },
  });
}

export async function getAllNotices(payload) {
  const page = payload?.page ?? 0;
  const size = payload?.size ?? 10;

  return await ApplicationApi.get(NOTICE_SERVICE_BASE_URL + "all", {
    params: { page, size },
  });
}

export async function markNoticeAsArchived(noticeId) {
  return await ApplicationApi.put(
    NOTICE_SERVICE_BASE_URL + "archive/" + noticeId,
  );
}

export async function markNoticeAsActive(noticeId) {
  return await ApplicationApi.put(
    NOTICE_SERVICE_BASE_URL + "activate/" + noticeId,
  );
}

export async function deleteNotice(noticeId) {
  return await ApplicationApi.delete(
    NOTICE_SERVICE_BASE_URL + "delete/" + noticeId,
  );
}

export async function addNotice(payload) {
  return await ApplicationApi.post(NOTICE_SERVICE_BASE_URL + "add", payload);
}

export async function updateNotice(payload) {
  return await ApplicationApi.put(NOTICE_SERVICE_BASE_URL + "update", payload);
}

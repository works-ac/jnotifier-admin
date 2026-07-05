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

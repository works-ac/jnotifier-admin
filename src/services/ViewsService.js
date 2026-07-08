import ApplicationApi from "../api/ApplicationApi";

const VIEWS_SERVICE_BASE_URL = "/views/";

export async function getPageViews(url) {
  return await ApplicationApi.post(
    VIEWS_SERVICE_BASE_URL + "calc-n-get",
    undefined,
    { headers: { "x-user-loc": url } },
  );
}

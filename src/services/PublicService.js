import ApplicationApi from "../api/ApplicationApi";

const PUBLIC_SERVICE_BASE_URL = "/public/";

export async function downloadAdvPdf(uri = "") {
  return await ApplicationApi.get(PUBLIC_SERVICE_BASE_URL + uri, {
    responseType: "blob",
    timeout: 0,
  });
}

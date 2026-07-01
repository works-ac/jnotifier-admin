import ApplicationApi from "../api/ApplicationApi";

const APP_SERVICE_BASE_URL = "/app/";

export async function ping() {
  return await ApplicationApi.get(APP_SERVICE_BASE_URL + "ping");
}

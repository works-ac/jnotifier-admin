import ApplicationApi from "../api/ApplicationApi";

const JOB_CATEGORIES_MASTER_BASE_URI = "/job-categories/master/";

export async function getAllJobCategories(payload) {
  return await ApplicationApi.get(JOB_CATEGORIES_MASTER_BASE_URI + "list", {
    params: payload,
  });
}

export async function addNewJobCategory(payload) {
  return await ApplicationApi.post(
    JOB_CATEGORIES_MASTER_BASE_URI + "add",
    payload,
  );
}

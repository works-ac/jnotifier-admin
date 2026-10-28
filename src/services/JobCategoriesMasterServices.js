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

export async function updateJobCategory(payload) {
  return await ApplicationApi.put(
    JOB_CATEGORIES_MASTER_BASE_URI + "update",
    payload,
  );
}

export async function markJobCategoryAsArchive(jobCategoryId) {
  return await ApplicationApi.patch(
    JOB_CATEGORIES_MASTER_BASE_URI + "mark/archive/" + jobCategoryId,
  );
}

export async function markJobCategoryAsActive(jobCategoryId) {
  return await ApplicationApi.patch(
    JOB_CATEGORIES_MASTER_BASE_URI + "mark/active/" + jobCategoryId,
  );
}

export async function deleteJobCategory(jobCategoryId) {
  return await ApplicationApi.delete(
    JOB_CATEGORIES_MASTER_BASE_URI + "mark/delete/" + jobCategoryId,
  );
}

import { useCallback, useEffect, useState } from "react";
import { getJobById, getJobs } from "../services/HomeServices";
import useAppAlert from "./useAppAlert";
import { JobListings } from "../data/HomePageData";
import { JobDetails } from "../data/JobDetailsPageData";
import { AppPaginationMetadata } from "../data/PaginationMetadata";

function useHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [isJobDetailsLoading, setIsJobDetailsLoading] = useState(false);
  const [jobs, setJobs] = useState(JobListings);
  const [paginationMetadata, setPaginationMetadata] = useState(
    AppPaginationMetadata,
  );
  // MRT pagination state shape: { pageIndex, pageSize }
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [jobDetails, setJobDetails] = useState(JobDetails);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchAllJobs = useCallback(async function () {
    setIsLoading(true);
    reset();

    try {
      // Map MRT's pageIndex/pageSize to the API's page/size params
      const response = await getJobs({ page: pagination.pageIndex, size: pagination.pageSize });
      const content = response.data?.data?.content || [];
      const paginationData = {
        pageNo: response.data?.data?.pageNo ?? -1,
        totalPages: response.data?.data?.totalPages ?? -1,
        last: response.data?.data?.last ?? true,
        totalElements: response.data?.data?.totalElements ?? -1,
      };

      setJobs(content);
      setPaginationMetadata(paginationData);
    } catch (error) {
      showErrorMsg(error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, [pagination]);

  const fetchJobByApplicationId = useCallback(async function (applicationId) {
    setIsJobDetailsLoading(true);
    reset();

    try {
      const response = await getJobById(applicationId);
      const content = response.data?.data || {};

      setJobDetails(content);
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsJobDetailsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllJobs();
  }, [pagination]);

  return {
    handleAlertOnClose,
    fetchJobByApplicationId,
    setPagination,
    jobs,
    isLoading,
    alert,
    isJobDetailsLoading,
    jobDetails,
    paginationMetadata,
    pagination
  };
}

export default useHome;

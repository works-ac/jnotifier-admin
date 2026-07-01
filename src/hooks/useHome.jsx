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
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [jobDetails, setJobDetails] = useState(JobDetails);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchAllJobs = useCallback(async function () {
    setIsLoading(true);
    reset();

    try {
      const response = await getJobs();
      const content = response.data?.data?.content || [];
      const pagination = {
        pageNo: response.data?.data?.pageNo ?? -1,
        totalPages: response.data?.data?.totalPages ?? -1,
        last: response.data?.data?.last ?? true,
        totalElements: response.data?.data?.totalElements ?? -1,
      };

      setJobs(content);
      setPaginationMetadata(pagination);
    } catch (error) {
      showErrorMsg(error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchNextJob = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page + 1,
        size: 10,
      };

      try {
        const response = await getJobs(payload);
        const content = response.data?.data?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.pageNo ?? -1,
          totalPages: response.data?.data?.totalPages ?? -1,
          last: response.data?.data?.last ?? true,
          totalElements: response.data?.data?.totalElements ?? -1,
        };

        setJobs(content);
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  const fetchPreviousJob = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page - 1,
        size: 10,
      };

      try {
        const response = await getJobs(payload);
        const content = response.data?.data?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.pageNo ?? -1,
          totalPages: response.data?.data?.totalPages ?? -1,
          last: response.data?.data?.last ?? true,
          totalElements: response.data?.data?.totalElements ?? -1,
        };

        setJobs(content);
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

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
  }, []);

  return {
    handleAlertOnClose,
    fetchJobByApplicationId,
    fetchNextJob,
    fetchPreviousJob,
    jobs,
    isLoading,
    alert,
    isJobDetailsLoading,
    jobDetails,
    paginationMetadata,
  };
}

export default useHome;

import React, { useCallback, useEffect, useState } from "react";
import useAppPagination from "../core/useAppPagination";
import { JobCategoriesMasterListings } from "../../data/JobCategoriesMasterListings";
import useAppAlert from "../useAppAlert";
import { getAllJobCategories } from "../../services/JobCategoriesMasterServices";

function useJobCategoriesMaster() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const {
    pagination,
    setPagination,
    paginationMetadata,
    setPaginationMetadata,
  } = useAppPagination();
  const [jobCategories, setJobCategories] = useState(
    JobCategoriesMasterListings,
  );
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchAllJobCategories = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      try {
        const response = await getAllJobCategories({
          page: pagination.pageIndex,
          size: pagination.pageSize,
        });

        const content = response.data?.data?.list?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.list?.pageNo ?? -1,
          totalPages: response.data?.data?.list?.totalPages ?? -1,
          last: response.data?.data?.list?.last ?? true,
          totalElements: response.data?.data?.list?.totalElements ?? -1,
        };

        setJobCategories(content);
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
        setJobCategories([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  const handleAddDialogOnToggle = useCallback(function () {
    setShowAddDialog((prev) => !prev);
  }, []);

  useEffect(() => {
    fetchAllJobCategories();
  }, [pagination]);

  return {
    handleAlertOnClose,
    setPagination,
    fetchAllJobCategories,
    handleAddDialogOnToggle,
    showAddDialog,
    jobCategories,
    isLoading,
    alert,
    paginationMetadata,
    pagination,
  };
}

export default useJobCategoriesMaster;

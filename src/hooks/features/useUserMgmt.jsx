import React, { useCallback, useEffect, useState } from "react";
import useAppPagination from "../core/useAppPagination";
import useAppAlert from "../useAppAlert";
import { getUserDetails } from "../../services/UserMgmtService";

function useUserMgmt() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showAccountCreationDialog, setShowAccountCreationDialog] =
    useState(false);
  const {
    pagination,
    setPagination,
    paginationMetadata,
    setPaginationMetadata,
  } = useAppPagination();
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchAllUserDetails = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      try {
        const response = await getUserDetails({
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

        setUsers(content);
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  const handleDialogOnClose = useCallback(() => {
    setShowAccountCreationDialog((prev) => !prev);
  }, []);

  useEffect(() => {
    fetchAllUserDetails();
  }, [pagination]);

  return {
    handleAlertOnClose,
    setPagination,
    fetchAllUserDetails,
    handleDialogOnClose,
    showAccountCreationDialog,
    users,
    isLoading,
    alert,
    paginationMetadata,
    pagination,
  };
}

export default useUserMgmt;

import React, { useCallback, useEffect, useState } from "react";
import useAppPagination from "../core/useAppPagination";
import { NoticeListings } from "../../data/NoticeListings";
import useAppAlert from "../useAppAlert";
import { getAllNotices } from "../../services/NoticeService";

function useNotices() {
  const {
    pagination,
    setPagination,
    paginationMetadata,
    setPaginationMetadata,
  } = useAppPagination();
  const [notices, setNotices] = useState(NoticeListings);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllNotices = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      try {
        const response = await getAllNotices({
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

        setNotices(content);
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
        setNotices([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  useEffect(() => {
    fetchAllNotices();
  }, [pagination]);

  return {
    handleAlertOnClose,
    notices,
    isLoading,
    alert,
    paginationMetadata,
    setPagination,
    pagination,
  };
}

export default useNotices;

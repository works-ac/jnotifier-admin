import React, { useCallback, useEffect, useState } from "react";
import useAppPagination from "../core/useAppPagination";
import { MediaListings } from "../../data/MediaListings";
import useAppAlert from "../useAppAlert";
import { getAllMedia } from "../../services/MediaService";

function useMedia() {
  const {
    pagination,
    setPagination,
    paginationMetadata,
    setPaginationMetadata,
  } = useAppPagination();
  const [media, setMedia] = useState(MediaListings);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchAllMedias = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      try {
        const response = await getAllMedia({
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

        setMedia(content);
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
        setMedia([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  const handleUploadDialogOnClose = useCallback(() => {
    setShowUploadDialog((prev) => !prev);
  }, []);

  useEffect(() => {
    fetchAllMedias();
  }, [pagination]);

  return {
    handleAlertOnClose,
    setPagination,
    fetchAllMedias,
    handleUploadDialogOnClose,
    showUploadDialog,
    media,
    isLoading,
    alert,
    paginationMetadata,
    pagination,
  };
}

export default useMedia;

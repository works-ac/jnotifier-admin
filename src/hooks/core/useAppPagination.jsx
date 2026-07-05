import React, { useState } from "react";
import { AppPaginationMetadata } from "../../data/PaginationMetadata";

function useAppPagination() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [paginationMetadata, setPaginationMetadata] = useState(
    AppPaginationMetadata,
  );

  return {
    pagination,
    paginationMetadata,
    setPagination,
    setPaginationMetadata,
  };
}

export default useAppPagination;

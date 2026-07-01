import React from "react";
import { ResultListing } from "../data/ResultsPageData";
import ResultsListingCard from "../views/ResultsListingCard";

function ResultsPage() {
  return (
    <>
      {ResultListing.map((job) => (
        <ResultsListingCard
          applicationId={job.applicationId}
          applicationEndDate={job.applicationEndDate}
          applicationStartDate={job.applicationStartDate}
          shortDescription={job.shortDescription}
          tags={job.tags}
          title={job.title}
          resultLink={job.resultLink}
          advNo={job.advNo}
          key={job.applicationId}
        />
      ))}
    </>
  );
}

export default React.memo(ResultsPage);

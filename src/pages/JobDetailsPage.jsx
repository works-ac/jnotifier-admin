import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDetailsCard from "../views/JobDetailsCard";
import useHome from "../hooks/useHome";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";

function JobDetailsPage() {
  const { applicationId } = useParams();
  const {
    alert,
    fetchJobByApplicationId,
    handleAlertOnClose,
    isJobDetailsLoading,
    jobDetails,
  } = useHome();

  useEffect(() => {
    document.title = `Job Notifier || ${jobDetails.title}`;
  }, [jobDetails]);

  useEffect(() => {
    fetchJobByApplicationId(applicationId);
  }, []);

  return (
    <>
      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {isJobDetailsLoading && (
        <CircluarProgressLoader
          text={`We're loading up the details of job bearing id ${applicationId}, please wait....`}
          takeHeight
        />
      )}

      {!isJobDetailsLoading && (
        <JobDetailsCard
          advNo={jobDetails.advNo}
          applicationEndDate={jobDetails.applicationEndDate}
          applicationStartDate={jobDetails.applicationStartDate}
          applicationId={jobDetails.applicationId}
          applyLink={jobDetails.applyLink}
          components={jobDetails.components}
          shortDescription={jobDetails.shortDescription}
          tags={jobDetails.tags}
          title={jobDetails.title}
          viewPageDescription={jobDetails.viewPageDescription}
          advFilePath={jobDetails.advFilePath}
        />
      )}
    </>
  );
}

export default JobDetailsPage;

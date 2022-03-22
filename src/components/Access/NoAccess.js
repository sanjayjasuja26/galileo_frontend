import React from "react";

const NoAccess = () => {
  return (
    <div className="email-confirmation">
      <p className="mb-0 alert">No Access:</p>
      <p className="other-info">
        Galileo Radiology Education is available only to partner academic
        medical institutions and hospitals.{" "}
      </p>
      <p className="other-info">
        Your email “user email” is not recognized as being from a partner
        institution.
      </p>
      <p className="other-info">
        If you think this is a mistake, or if you would like to partner with
        Galileo CDS Education, please email us at education@galileocds.com
      </p>
    </div>
  );
};

export default NoAccess;

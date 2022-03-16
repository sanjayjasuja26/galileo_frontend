import React from "react";

const PartialAccess = () => {
  return (
    <div class="email-confirmation">
      <p class="mb-0 alert">
        Partial Access: You currently only have partial access to Galileo
        Education
      </p>
      <p class="other-info">
        Galileo Radiology Education is available only to partner academic
        medical institutions and hospitals.
      </p>
      <p class="other-info">
        Your email “user email” is not recognized as being from a partner
        institution with full access.
      </p>

      <p class="other-info">
        If you think this is a mistake, or if you would like to partner with
        Galileo CDS Education, please email us at{" "}
        <span style={{color: "#FF0000"}}>education@galileocds.com</span>{" "}
      </p>
    </div>
  );
};

export default PartialAccess;

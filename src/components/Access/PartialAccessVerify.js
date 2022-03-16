import React from "react";

const PartialAccessVerify = () => {
  return (
    <div class="email-confirmation">
      <p class="mb-0 alert">Partial Access: Please confirm your email id.</p>
      <p class="other-info">
        Galileo Radiology Education is available only to partner academic
        medical institutions and hospitals.{" "}
      </p>
      <p class="other-info">
        Your email “user email” needs to be verified to grant you full access.
        Please check your email for the verification link. Alternatively, enter
        your five digit verification code below and press the ‘Verify’ button.{" "}
      </p>
      <div class="verification d-flex my-4">
        <strong>Verification Code:</strong>
        <div class="v-code d-flex">
          <div>
            <input class="form-control" />
          </div>
          <div>
            <input class="form-control" />
          </div>
          <div>
            <input class="form-control" />
          </div>
          <div>
            <input class="form-control" />
          </div>
          <div>
            <input class="form-control" />
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-primary">
            Verify
          </button>
        </div>
      </div>
      <p class="other-info">
        For help, please email us at education@galileocds.com{" "}
      </p>
    </div>
  );
};

export default PartialAccessVerify;

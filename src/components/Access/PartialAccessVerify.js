import React from "react";
import { useSelector } from "react-redux";
import { sendVarificationEmail } from "../../utils/helper";

const PartialAccessVerify = () => {

  const { user } = useSelector(state => state.auth);

  const sendOtp = () => {
    const sendEmailSuccess = sendVarificationEmail({
      name: `${user.firstName} ${user.lastName}`,
      email: user.user_email,
      message: Math.floor(1000 + Math.random() * 9000)
    })
  }

  return (
    <div className="email-confirmation">
      <p className="mb-0 alert">Partial Access: Please confirm your email id.</p>
      <p className="other-info">
        Galileo Radiology Education is available only to partner academic
        medical institutions and hospitals.{" "}
      </p>
      <p className="other-info">
        Your email “user email” needs to be verified to grant you full access.
        Please check your email for the verification link. Alternatively, enter
        your five digit verification code below and press the ‘Verify’ button.{" "}
      </p>
      <div className="verification d-flex my-4">
        <strong>Verification Code:</strong>
        <div className="v-code d-flex">
          <div>
            <input className="form-control" />
          </div>
          <div>
            <input className="form-control" />
          </div>
          <div>
            <input className="form-control" />
          </div>
          <div>
            <input className="form-control" />
          </div>
          <div>
            <input className="form-control" />
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary">
            Verify
          </button>
        </div>
      </div>
      <small className="text-decoration-underline pointer" onClick={sendOtp}>Resend OTP</small>
      <p className="other-info pt-2">
        For help, please email us at education@galileocds.com{" "}
      </p>
    </div>
  );
};

export default PartialAccessVerify;

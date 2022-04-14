import React from "react";
import { useDispatch } from "react-redux";
import { varifyEmail } from "../../redux/action/auth";

const PartialAccessVerify = () => {

  const dispatch = useDispatch();

  return (   
    <div className="email-confirmation">
      <p className="mb-0 alert">Partial Access: Please confirm your email id.</p>     
      <p className="other-info">   
        Galileo Radiology Education is available only to partner academic
        medical institutions and hospitals.{" "}
      </p>
      <p className="other-info">     
        Your email “user email” needs to be verified to grant you full access.
        Please check your email for the verification link.{" "}
      </p>        
      <div className="verification d-flex my-4">
        {/* <strong>Verification Code:</strong> */}
        {/* <div className="v-code d-flex">
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
        </div> */}
        <div>
          <button type="button" className="btn btn-primary" onClick={() => {
            dispatch(varifyEmail())
          }}>
            Send me verification link again
          </button>
        </div>
      </div>
      <p className="other-info pt-2">
        For help, please email us at education@galileocds.com{" "}
      </p>
    </div>
  );
};

export default PartialAccessVerify;

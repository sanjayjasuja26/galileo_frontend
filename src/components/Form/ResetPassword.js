import React from "react";
import { Formik, Form } from "formik";
import InputElement from "./components/InputElement";
import { PasswordIconSVG } from "../../assets/svgComponents";
import { useNavigate } from "react-router-dom";
import { resetPasswordValidation } from "../../utils/validation";
import { resetPassword } from "../../redux/action/auth";
import { useDispatch } from "react-redux";

const ResetPassword = ({ code, setIsLogin, setIsForgetPwd }) => {
  const history = useNavigate();

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validateOnChange={true}
      validationSchema={resetPasswordValidation}
      onSubmit={async (values, { resetForm }) => {
        if (values && code) {
         const success = dispatch(resetPassword({ code, password: values.password }));

         if(success){
           resetForm();
         }
        }
      }}
    >
      {({ errors, values, handleChange, handleSubmit }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <InputElement
            name="password"
            type="password"
            value={values.password}
            placeholder="********"
            className="form-control"
            label="New Password"
            handleChange={handleChange}
            icon={<PasswordIconSVG />}
            error={errors.password}
          />
          <InputElement
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            placeholder="********"
            className="form-control"
            label="Confirm Password"
            handleChange={handleChange}
            icon={<PasswordIconSVG />}
            error={errors.confirmPassword}
          />
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
          <div className="d-flex justify-content-between mt-3">
            <small
              className="pointer text-muted"
              onClick={() => {
                history("/auth");
                setIsLogin(false);
                setIsForgetPwd(true);
              }}
            >
              Resend Link
            </small>
            <small
              className="pointer text-muted"
              onClick={() => {
                history("/auth");
                setIsLogin(true);
              }}
            >
              Back to Login
            </small>
          </div>
          <div className="bottom-text important-link">
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;

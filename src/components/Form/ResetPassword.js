import React from "react";
import { Formik, Form } from "formik";
import InputElement from "./components/InputElement";
import { PasswordIconSVG } from "../../assets/svgComponents";
import { useNavigate } from "react-router-dom";
import { resetPasswordValidation } from "../../utils/validation";
import { resetPassword } from "../../redux/action/auth";

const ResetPassword = ({ code, setIsLogin, setIsForgetPwd }) => {
  const history = useNavigate();

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
         resetPassword({ code, password: values.password })
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

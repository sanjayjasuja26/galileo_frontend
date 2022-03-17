import React from "react";
import { Formik, Form } from "formik";
import { EmailIconSVG, PasswordIconSVG } from "../../assets/svgComponents";
import { loginFormSchema } from "../../utils/validation";

const LoginForm = ({ setIsLogin }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validateOnChange={true}
      validationSchema={loginFormSchema}
      onSubmit={(values, { resetForm }) => {
        if (values) {          
          console.log(values);
        }             
      }}
    >                 
      {({ touched, errors, values, handleChange, handleSubmit }) => (
        <form class="form" onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Institutional Email
            </label>
            <div class="username">
              <EmailIconSVG />
              <input
                value={values.email}
                onChange={handleChange}
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Johndoe@gmail.com"
              />
            </div>                             
            {
                (touched.email && errors.email !== '') &&
                <span>{errors.email}</span>
            }
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Password
            </label>
            <div class="username">
              <PasswordIconSVG />
              <input
                value={values.password}
                onChange={handleChange}
                type="password"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Password"
              />
            </div>     
            {
                (touched.email && errors.email !== '') &&
                <span>{errors.email}</span>
            }                   
          </div>            
          <div class="paasrd d-flex justify-content-between">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Remember me
              </label>
            </div>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" class="btn btn-primary">
            Login
          </button>
          <p>          
            Don’t have an account?{" "}
            <span onClick={() => setIsLogin(false)}>Signup</span>
          </p>            
          <div class="bottom-text important-link">
            <ul>                      
              <li>                                  
                <a href="#">About us</a>
              </li>              
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
        </form>
      )}
    </Formik>
  );                            
};

export default LoginForm;

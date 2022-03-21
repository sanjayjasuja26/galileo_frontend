import React from "react";
import { Formik, Form } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { EmailIconSVG, PasswordIconSVG } from "../../assets/svgComponents";
import { loginFormSchema } from "../../utils/validation";
import InputElement from "./components/InputElement";

const LoginForm = ({ setIsLogin }) => {
  return (                      
    <Formik
      initialValues={{   
        email: "",      
        password: "",
      }}             
      validateOnChange={true}
      validationSchema={loginFormSchema}
      onSubmit={async(values, { resetForm }) => {
        if (values) {                
          console.log(values);

          signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              console.log(userCredential.user);
            })
            .catch(error => console.log(error.message));
        }                  
      }}          
    >                                                                          
      {({ touched, errors, values, handleChange, handleSubmit }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <InputElement
            name="email"
            type="email"                  
            value={values.email}
            placeholder="Johndoe@gmail.com"
            className="form-control"
            label="Institutional Email"
            handleChange={handleChange}
            icon={<EmailIconSVG />}
            error={errors.email}
          />                                           
          <InputElement                           
            name="password"
            type="password"
            value={values.password}
            placeholder="********"
            className="form-control"
            label="Password"
            handleChange={handleChange}
            icon={<PasswordIconSVG />}
            error={errors.password}
          />    
          <div className="paasrd d-flex justify-content-between">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p>          
            Don’t have an account?{" "}
            <span onClick={() => setIsLogin(false)}>Signup</span>
          </p>            
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

export default LoginForm;
                          
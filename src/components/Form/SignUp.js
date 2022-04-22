import React from "react";
import { Formik, Form } from "formik";
import {
  EmailIconSVG,
  PasswordIconSVG,
  UserIconSVG,
} from "../../assets/svgComponents";
import { signUpFormSchema } from "../../utils/validation";
import InputElement from "./components/InputElement";
import { signUp, varifyEmail } from "../../redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../assets/loading.gif'

const SignUpForm = ({ setIsLogin }) => {

    const dispatch = useDispatch();
    const { authLoading } = useSelector(state => state.auth);

  return (
    <Formik
        initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }}
        validateOnChange={true}
        validationSchema={signUpFormSchema}
        onSubmit={async (values, { resetForm }) => {
            if(values) { 
                const signupSuccess = dispatch(signUp(values));        
                
                if(signupSuccess){
                    dispatch(varifyEmail());       
                    resetForm();
                    setIsLogin(true);
                }     
            }    
        }}     
    >            
    {({ errors, values, touched, handleChange, handleSubmit }) => (
        <Form className="form">
            <InputElement
                name="firstName"
                type="text"
                value={values.firstName}
                placeholder="John"
                className="form-control"
                label="First Name"
                handleChange={handleChange}
                icon={<UserIconSVG />}
                error={errors.firstName}
                touched={touched.firstName}
            />
            <InputElement
                name="lastName"   
                type="text"
                value={values.lastName}
                placeholder="Doe"
                className="form-control"
                label="Last Name"
                handleChange={handleChange}
                icon={<UserIconSVG />}
                error={errors.lastName}
                touched={touched.lastName}
            />
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
                touched={touched.email}
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
                touched={touched.password}
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
                touched={touched.confirmPassword}
            />    

        <button disabled={authLoading ? true : false} type="submit" className="btn btn-primary">
            {authLoading ? <img src={Loading} height="20" width="50" alt="" /> : 'Signup'}        
        </button>                              
        <p>
            Already have an account?{" "}
            <span className="pointer text-decoration-underline" onClick={() => setIsLogin(true)}>Login</span>
        </p>
        <div className="bottom-text important-link">
            <ul>
            <li>
                <a href="/">About us</a>
            </li>
            <li>
                <a href="/">Support</a>
            </li>
            </ul>
        </div>
        </Form>
    )}       
    </Formik>
  );
};

export default SignUpForm;

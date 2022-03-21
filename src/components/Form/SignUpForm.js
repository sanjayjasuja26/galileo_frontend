import React from "react";
import { Formik, Form } from "formik";
import {
  EmailIconSVG,
  PasswordIconSVG,
  UserIconSVG,
} from "../../assets/svgComponents";
import { signUpFormSchema } from "../../utils/validation";
import { db, auth } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import InputElement from "./components/InputElement";

const SignUpForm = ({ setIsLogin }) => {

    const checkDomainAndHandleCases = async (email) => {
        try {
            const domain = email.split('@')[1];
            let matchedDomain = null;

            const querySnapshot = await getDocs(collection(db, "domains"));
            querySnapshot.forEach((doc) => {
              if(doc.data().domain === domain){
                matchedDomain = doc.data()
              }
            });  
            
            if(!matchedDomain){
                // Scenario 4
            } else {      
                if(matchedDomain.allowed === 'Y'){
                    // Scenario 1
                } else if(matchedDomain.allowed === 'N'){
                    // Scenario 2
                } else if(matchedDomain.allowed === 'P'){
                    // Scenario 3
                } else {        
                    return;
                }    
            }

        } catch (error) {
            console.log(error);
        }
    }    

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
            if (values) {          
                console.log(values);    
                
                createUserWithEmailAndPassword(auth, values.email, values.password)     
                    .then(userCred => {
                        console.log(userCred.user);
                    }) 
                    .catch(err => console.log(err))

                checkDomainAndHandleCases(values.email);
            }      
        }}
    >      
    {({ touched, errors, values, handleChange, handleSubmit }) => (
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
            Signup
        </button>
        <p>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)}>Login</span>
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

export default SignUpForm;

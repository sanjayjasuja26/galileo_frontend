import React from "react";
import { Formik, Form } from "formik";
import {
  EmailIconSVG,
  PasswordIconSVG,
  UserIconSVG,
} from "../../assets/svgComponents";
import { signUpFormSchema } from "../../utils/validation";
import { db, auth } from '../../firebase';
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"; 
import InputElement from "./components/InputElement";
import { toast } from "react-toastify";

const SignUpForm = ({ setIsLogin }) => {

    const checkDomainAndHandleCases = async (values, id) => {
        try {
            const domain = values.email.split('@')[1];
            let matchedDomain = null;

            const querySnapshot = await getDocs(collection(db, "domains"));
            querySnapshot.forEach((doc) => {
              if(doc.data().domain === domain){
                matchedDomain = doc.data()
              }
            });  
            
            if(!matchedDomain){
                // Scenario 4: Create record in users and temp_users collection
                
                let user = await addDoc(collection(db, "users"), {
                    fname: values.firstName,
                    lname: values.lastName,
                    user_email: values.email,
                    role: "student",
                    date_created: Timestamp.fromDate(new Date()),
                    guid: id
                });

                let temp_user = await addDoc(collection(db, "temp_users"), {
                    guid: user.id,
                    allowed: "P",
                    date_start: Timestamp.fromDate(new Date()),
                });

                return true;
            } else {      
                if(matchedDomain.allowed === 'Y'){
                    // Scenario 1: Create record in users collection
                    await addDoc(collection(db, "users"), {
                        fname: values.firstName,
                        lname: values.lastName,
                        user_email: values.email,      
                        role: "student",
                        date_created: Timestamp.fromDate(new Date()),
                        guid: id
                    });
                    return true;
                } else if(matchedDomain.allowed === 'N'){
                    // Scenario 2: Delete user from auth
                    let user = getAuth().currentUser;
                    user.delete();
                    // TODO: Send email to Admin
                    return false;
                } else if(matchedDomain.allowed === 'P'){
                    // Scenario 3: Create record in users collection
                    await addDoc(collection(db, "users"), {
                        fname: values.firstName,
                        lname: values.lastName,
                        user_email: values.email,
                        role: "student",
                        date_created: Timestamp.fromDate(new Date()),
                        guid: id
                    });
                    return true;
                } else {        
                    return false;
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
                try {
                    const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password);
                    const userCreated = await checkDomainAndHandleCases(values, userCred.user.uid)

                    if(userCreated){
                        toast.success('SignUp success')
                        resetForm();
                        setIsLogin(true)
                    } else {
                        toast.error('Unauthenticated Email')
                    }
                } catch (err) {
                    if(err.code === 'auth/email-already-in-use'){
                        toast.error('Email already registered')
                    } else {
                        toast.error('Something went wrong')
                    }
                }                    
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

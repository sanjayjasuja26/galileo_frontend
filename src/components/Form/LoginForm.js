import React from "react";
import { Formik, Form } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { EmailIconSVG, PasswordIconSVG } from "../../assets/svgComponents";
import { loginFormSchema } from "../../utils/validation";
import InputElement from "./components/InputElement";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { getIPAddress } from "../../utils/helper";

const LoginForm = ({ setIsLogin }) => {

  const history = useNavigate();

  return (                      
    <Formik
      initialValues={{   
        email: "",      
        password: "",
      }}             
      validateOnChange={true}
      validationSchema={loginFormSchema}
      onSubmit={ async(values, { resetForm }) => {
        try {
          const currentIP = await getIPAddress();

          if (values && currentIP) {
            let user = null;

            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)       
               
            // Get User from users collection         
            const userQuery = await query(collection(db, "users"), where("guid", "==", userCredential.user.uid));

            const querySnapshot = await getDocs(userQuery);
            querySnapshot.forEach(docSnap => {
              user = docSnap.id;    
            })                                                    

            if(user){              
              const userLogQuery = await query(collection(db, "user_login_log"), where("guid", "==", user))

              const querySnapshot = await getDocs(userLogQuery);
              console.log(querySnapshot);          

              querySnapshot.forEach(docSnap => {
                // let data = docSnap.data();

                console.log(docSnap.exists());

                // if(docSnap.exists()){
                //   console.log('exist');
                //   updateDoc(doc(db, "user_login_log", docSnap.id), {
                //     ...data,
                //     login_details: [
                //       ...data.login_details,
                //       {
                //         ip: currentIP,
                //         date_time: Timestamp.fromDate(new Date())
                //       }
                //     ]
                //   })
                // } else {
                //   console.log('not exist');
                //   addDoc(collection(db, "user_login_log"), {
                //     guid: user,
                //     login_details: [
                //       { 
                //         ip: currentIP,
                //         date_time: Timestamp.fromDate(new Date())
                //       }
                //     ]
                //   })
                // }
              })
            }

            // TODO: Maintain Auth User
            history('/');
          }     
        } catch (error) {     
          console.log(error);                        
          if(error.code === 'auth/user-not-found'){
            toast.error('Invalid credentials')
          } else if(error.code === 'auth/wrong-password') {
            toast.error('Invalid credentials')
          } else {                   
            toast.error('Something went wrong')
          }
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
                          
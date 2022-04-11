import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { EmailIconSVG, PasswordIconSVG } from "../../assets/svgComponents";
import { loginFormSchema } from "../../utils/validation";
import InputElement from "./components/InputElement";
import { login } from "../../redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../assets/loading.gif';

const LoginForm = ({ setIsLogin, setIsForgetPwd }) => {

  const history = useNavigate();
  const dispatch = useDispatch();
  const { authLoading } = useSelector(state => state.auth);
  const [save, setSave] = useState(false);
  const [savedData, setSavedData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    let email = JSON.parse(localStorage.getItem('cred'))?.email;
    setSavedData({ 
      ...savedData, 
      email: email ? email : ''
    });           
    email && setSave(true)
  }, [])
                 
  const handleRememberMe = value => {
    setSave(value)            
    if(!value){                        
      localStorage.removeItem('cred');
    }
  }

  return (                      
    <Formik
      enableReinitialize={true}
      initialValues={savedData}                                  
      validateOnChange={true}
      validationSchema={loginFormSchema}
      onSubmit={ async(values, { resetForm }) => {
        if(values){
          if(save) {   
            localStorage.setItem('cred', JSON.stringify({
              email: values.email
            }))      
          }
          const loginSuccess = await dispatch(login(values));
          if(loginSuccess){
            resetForm();      
            history('/');                    
          }         
        }         
      }}                         
    >                                                                          
      {({ errors, touched, values, handleChange, handleSubmit }) => (
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
          <div className="paasrd d-flex justify-content-between">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"   
                checked={(save) ? true : false}
                id="flexCheckDefault"
                onChange={e => {
                  handleRememberMe(e.target.checked)
                }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me    
              </label>        
            </div>
            <small className="pointer text-muted" onClick={() => setIsForgetPwd(true)}>Forgot password</small>
          </div>
          <button type="submit" className="btn btn-primary">
            {authLoading ? <img src={Loading} height="15" width="70" alt="" /> : 'Login'}       
          </button>    
          <p>           
            Don’t have an account?{" "}    
            <span className="pointer text-decoration-underline" onClick={() => setIsLogin(false)}>Signup</span>
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
                          



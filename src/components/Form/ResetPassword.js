import React from 'react'
import { Formik, Form } from "formik";
import InputElement from './components/InputElement';
import { PasswordIconSVG } from '../../assets/svgComponents';
import { useNavigate } from 'react-router-dom';
import { resetPasswordValidation } from '../../utils/validation';

const ResetPassword = ({ code, setIsLogin }) => {

    const history = useNavigate();

  return (
    <Formik
        initialValues={{  
            password: "", 
            confirmPassword: ""
        }}            
        validateOnChange={true}
        validationSchema={resetPasswordValidation}
        onSubmit={async (values, { resetForm }) => {
          if(values && code){
          const passResetUrl = `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDXupbfINVUTAU85mwmbYQHmHp9OhyXa_E`;

            fetch(passResetUrl, { method: 'POST', body: JSON.stringify({ "oobCode": code, newPassword: "password" }), headers: { "Content-Type": "application/json" } }).then(async (res) => {
              const resJson = await res.json()
              //const email = resJson.email
              console.log(resJson)
              return "ok"
            }).catch((errVerifyingCode) => {
              console.log(errVerifyingCode)
              return "error"
            })
          }
        }}
    >
    {
      ({ touched, errors, values, handleChange, handleSubmit }) => (
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
            <div className='d-flex justify-content-center mt-3'>
              <small className="pointer text-muted" 
              onClick={() => {
                history('/auth')
                setIsLogin(true)
              }}>Back to Login?</small>
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
      )
    }
    </Formik>
  )
}

export default ResetPassword
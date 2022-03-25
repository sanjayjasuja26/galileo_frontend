import React from 'react';
import { Formik, Form } from "formik";
import InputElement from './components/InputElement'
import { EmailIconSVG } from '../../assets/svgComponents';
import { emailFormValidation } from '../../utils/validation';
import { sendResetPasswordEmail } from '../../utils/helper';

const ForgotPassword = ({ setIsForgetPwd, setIsLogin }) => {
  return (
      <Formik
        initialValues={{  
            email: ""
        }}
        validateOnChange={true}
        validationSchema={emailFormValidation}
        onSubmit={async (values, { resetForm }) => {
            const isEmailSend = await sendResetPasswordEmail(values.email);
            if(isEmailSend){
              resetForm();
            }
        }}
      >
        {
          ({ touched, errors, values, handleChange, handleSubmit }) => (
            <Form className="form" onSubmit={handleSubmit}>
                <InputElement 
                    name="email"
                    type="email"                  
                    value={values.email}
                    placeholder="Johndoe@gmail.com"
                    className="form-control"
                    label="Email"
                    handleChange={handleChange}
                    icon={<EmailIconSVG />}
                    error={errors.email}
                />
                 <button type="submit" className="btn btn-primary">
                    Send Email
                </button>
                <div className='d-flex justify-content-center mt-3'>
                  <small className="pointer text-muted" 
                  onClick={() => {
                    setIsForgetPwd(false)
                    setIsLogin(true)
                  }}>Back to Login</small>
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

export default ForgotPassword
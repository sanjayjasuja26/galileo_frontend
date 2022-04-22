import React from 'react'
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import InputElement from './components/InputElement';
import Loading from '../../assets/loading.gif';
import { EmailIconSVG, UserIconSVG } from '../../assets/svgComponents';
import { editProfileValidation } from '../../utils/validation';
import { editUserProfile } from '../../redux/action/auth';

const EditProfile = () => {

    const dispatch = useDispatch();
    const { user, authLoading } = useSelector(state => state.auth);
    
  return (
    <Formik
        initialValues={{
            firstName: user.fname ? user.fname : "",
            lastName: user.lname ? user.lname : "",
        }}                               
        validateOnChange={true}    
        validationSchema={editProfileValidation}
        onSubmit={async (values, { resetForm }) => {
            if(values && (values.firstName !== user.fname || values.lastName !== user.lname)){
                dispatch(editUserProfile(values));
            }
        }}                            
    >   
    {
        ({ errors, values, touched, handleChange, handleSubmit }) => (
            <Form className="form mt-3" onSubmit={handleSubmit}>
                    <InputElement         
                        name="firstName"
                        type="text"                 
                        value={values.firstName}
                        placeholder="John"
                        className="form-control"      
                        label="First Name"
                        id="profile_firstname"
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
                        id="profile_lastname"
                        handleChange={handleChange}
                        icon={<UserIconSVG />}
                        error={errors.lastName}
                        touched={touched.lastName}
                    />                                                    
                    <InputElement               
                        name="email"                  
                        type="email"  
                        disable={true}         
                        value={user.user_email}
                        placeholder={user.user_email ? `${user.user_email}` : "Johndoe@gmail.com" }               
                        className="form-control"
                        label="Institutional Email"
                        icon={<EmailIconSVG />}
                    />                   
                <button disabled={authLoading ? true : false} type="submit" className="btn btn-primary">
                    {
                        authLoading ? <img src={Loading} height="15" width="70" alt="" /> : 'Update'
                    }       
                </button>
            </Form>
        )
    }
    </Formik>
  )         
}

export default EditProfile
import React from 'react'
import { Formik, Form } from "formik";
import InputElement from './components/InputElement'
import { EmailIconSVG, UserIconSVG } from '../../assets/svgComponents';
import { editProfileValidation } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { editUserProfile } from '../../redux/action/auth';
import Loading from '../../assets/loading.gif';

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
        ({ errors, values, handleChange, handleSubmit }) => (
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
                    />                                                    
                    <InputElement               
                        name="email"                  
                        type="email"  
                        disable={true}         
                        value={user.user_email}
                        placeholder={user.user_email ? `${user.user_email}` : "Johndoe@gmail.com" }               
                        className="form-control"
                        label="Institutional Email"
                        handleChange={handleChange}
                        icon={<EmailIconSVG />}
                    />                   
                <button type="submit" className="btn btn-primary">
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
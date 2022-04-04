import React from 'react'
import { Formik, Form } from "formik";
import InputElement from './components/InputElement'
import { EmailIconSVG, UserIconSVG } from '../../assets/svgComponents';
import { editProfileValidation } from '../../utils/validation';
import { updateUserDocument } from '../../utils/helper';
import { toast } from 'react-toastify';     
import { useSelector } from 'react-redux';

const EditProfile = () => {

    const { user } = useSelector(state => state.auth);

  return (
    <Formik
        initialValues={{
            firstName: user.fname ? user.fname : "",
            lastName: user.lname ? user.lname : "",
        }}                               
        validateOnChange={true}    
        validationSchema={editProfileValidation}
        onSubmit={async (values, { resetForm }) => {
            if(values){
                const isUpdated = await updateUserDocument({ 
                    fname: values.firstName, 
                    lname: values.lastName, 
                })      

                if(isUpdated){
                    toast.success('Profile updated success');
                    resetForm();
                } else {
                    toast.error('Something went wrong')
                }
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
                        disable={true}         
                        value={user.user_email}
                        placeholder={user.user_email ? `${user.user_email}` : "Johndoe@gmail.com" }               
                        className="form-control"
                        label="Institutional Email"
                        handleChange={handleChange}
                        icon={<EmailIconSVG />}
                    />                   
                <button type="submit" className="btn btn-primary">
                    UPDATE       
                </button>
            </Form>
        )
    }
    </Formik>
  )         
}

export default EditProfile
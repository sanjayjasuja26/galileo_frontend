import React from 'react'
import { Formik, Form } from "formik";
import InputElement from './components/InputElement'
import { EmailIconSVG, UserIconSVG } from '../../assets/svgComponents';
import { editProfileValidation } from '../../utils/validation';

const EditProfile = () => {
  return (
    <Formik
        initialValues={{
            fname: "",
            lname: "",
            email: "",
        }}
        validateOnChange={true}
        validationSchema={editProfileValidation}
        onSubmit={async (values, { resetForm }) => {
            console.log(values);
        }}     
    >   
    {
        ({ errors, values, handleChange, handleSubmit }) => (
            <Form className="form mt-3">
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
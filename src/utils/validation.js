import { object, string, ref } from 'yup';

const textValidation = /^[a-zA-Z.]*$/;
const spaceValidation = /^\S*$/;

export const signUpFormSchema = object({
    firstName: string().matches(textValidation, 'Invalid First Name').min(4, 'First Name should be atleast 4 character long').required('First Name is required'),
    lastName: string().matches(textValidation, 'Invalid Last Name').min(4, 'Last Name should be atleast 4 character long').required('Last Name is required'),
    email: string().email('Please enter valid email').matches(spaceValidation, 'Please enter valid email').required('Email is required'),
    password: string().matches(spaceValidation, 'Password should not contain white space').min(6, 'Password should be atleast 6 character long').required('Password is required'),
    confirmPassword: string().trim().required("Confirm Password is required").oneOf([ref('password'), null], 'Passwords must match')
})

export const loginFormSchema = object({
    email: string().email('Please enter valid email').matches(spaceValidation, 'Please enter valid email').required('Email is required'),
    password: string().matches(spaceValidation, 'Password should not contain white space').min(6, 'Password should be atleast 6 character long').required('Password is required')
})
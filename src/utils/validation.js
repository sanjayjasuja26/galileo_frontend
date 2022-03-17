import { object, string } from 'yup';

export const loginFormSchema = object({
    email: string().email().trim().required('Email is required.'),
    password: string().trim().min(6, 'Password should be atleast 6 character long').required('Password is required.')
})
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { checkDomainAccess, checkDomainAndHandleCases, createDBLogs, getUserDoc } from '../../utils/helper';
import { 
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    ACCESS_TYPE,
    USER_LOGOUT,
    USER_LOGIN,              
} from '../types';    

export const signUp = (body) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    try {
        const userCred = await createUserWithEmailAndPassword(auth, body.email, body.password);
        const userCreated = await checkDomainAndHandleCases(body, userCred.user.uid)     
    
        if(userCreated){     
            toast.success('User SignUp success')
            dispatch({ type: AUTH_SUCCESS })
            return true;
        } else {           
            dispatch({ type: AUTH_ERROR })
            toast.error('Unauthenticated Email')
            return false;
        }  

    } catch (err) {  
        dispatch({ type: AUTH_ERROR })
        if(err.code === 'auth/email-already-in-use'){
            toast.error('Email already registered')
        } else {
            toast.error('Something went wrong')
        }
        return false;
    }            
}

export const login = (body) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    try {
        // Get AuthUser
        const userCredential = await signInWithEmailAndPassword(auth, body.email, body.password)       
        const user = await getUserDoc(userCredential);

        if(!user){
            dispatch({ type: AUTH_ERROR })
            toast.error('User not Found');
            return false;
        }

        // Generate DB Logs 
        await createDBLogs(body, user);

        // Check Access
        let access = await checkDomainAccess(body, user)

        // Maintain Auth User
        dispatch({ type: ACCESS_TYPE, payload: access })
        dispatch({ type: USER_LOGIN, payload: user })
        localStorage.setItem('user', user);   

        toast.success('User login success')
        return true;
    } catch (error) {    
      dispatch({ type: AUTH_ERROR })
      if(error.code === 'auth/user-not-found'){
        toast.error('Invalid credentials') 
      } else if(error.code === 'auth/wrong-password') {
        toast.error('Invalid credentials')
      } else {                    
        toast.error('Something went wrong')
      }
      return false;
    }    
}   

export const logOut = () => async (dispatch) => {
    // dispatch({ type: AUTH_LOADING })
    signOut(auth)
    .then(() => {
        toast.success('User logout success')
        dispatch({ type: USER_LOGOUT });
    })   
    .catch(error => {
        dispatch({ type: AUTH_ERROR })
        toast.error('Something went wrong')
    }) 
}

export const sendResetPasswordEmail = (email) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    try {
        await sendPasswordResetEmail(auth, email);
        dispatch({ type: AUTH_SUCCESS })
        toast.success('Please check your email');
        return true;
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
      if(err.code === 'auth/user-not-found'){
        toast.error('Email not registered');
      } else {
        toast.error('Something went wrong');
      }
    }
}

export const resetPassword = (body) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    try {
      const passResetUrl = `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDXupbfINVUTAU85mwmbYQHmHp9OhyXa_E`;
  
      const res = await fetch(passResetUrl, {
        method: "POST",
        body: JSON.stringify({
          oobCode: body.code,
          newPassword: body.password,
        }),
        headers: { "Content-Type": "application/json" },
      })
  
      const data = await res.json();
      console.log(data);
      if(data.code === 200){
        dispatch({ type: AUTH_SUCCESS })
        toast.success('Password reset success');
        return true;
      } else {
        dispatch({ type: AUTH_ERROR })
        toast.error('Oops!! Link has expired')
        return false;
      }
    } catch (err) {
        dispatch({ type: AUTH_ERROR })
        toast.error('Oops!! Link has expired')
        return false;
    }
}
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { checkDomainAccess, checkDomainAndHandleCases, createDBLogs, getUserDoc } from '../../utils/helper';
import { 
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    ACCESS_TYPE,              
} from '../types';    

export const signUp = (body) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    try {
        const userCred = await createUserWithEmailAndPassword(auth, body.email, body.password);
        const userCreated = await checkDomainAndHandleCases(body, userCred.user.uid)     
        
        const user = getUserDoc(userCred);
        if(!user){
            throw new Error('User not Found')
        }

        if(userCreated){     
            dispatch({ type: AUTH_SUCCESS, payload: user })
            toast.success('SignUp success')
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
    }            
}

export const login = (body) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    try {
        // Get AuthUser
        const userCredential = await signInWithEmailAndPassword(auth, body.email, body.password)       
        const user = getUserDoc(userCredential);

        if(!user){
            throw new Error('User not Found')
        }

        // Generate DB Logs 
        await createDBLogs(body, user);

        // Check Access
        let access = await checkDomainAccess(body, user)

        // Maintain Auth User
        dispatch({ type: ACCESS_TYPE, payload: access })
        dispatch({ type: AUTH_SUCCESS, payload: user })
        localStorage.setItem('user', user);   

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
    }    
}   
import { 
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    ACCESS_TYPE,
 } from '../types';

const INITIAL_STATE = {          
    user: null,
    authLoading: false,
    authError: false,
    access: ''
};
   
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LOADING:
            return {       
                ...state, 
                authLoading: true,
                authError: false,
                user: null,
            };
        case AUTH_SUCCESS:
            return {
                ...state, 
                authLoading: false,
                authError: false,
                user: action.payload,
            };
        case AUTH_ERROR:
            return {
                ...state, 
                authLoading: false,
                authError: true,
                user: null,
            };
        case ACCESS_TYPE:
            return {
                ...state,      
                access: action.payload
            }
        default: return state;
    }
};

export default reducer;
import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR,
    UPDATE_CASE_PAGE,
    SET_PAGINATION,
    SET_CASE_ACCESS,
    FETCH_DISEASES_LOADING,
    FETCH_DISEASES_SUCCESS,
    FETCH_DISEASES_ERROR,
    ATTEMPT_CASE_LOADING,
    ATTEMPT_CASE_SUCCESS,
    ATTEMPT_CASE_ERROR,
    GET_ATTEMPTED_CASE_LOADING,
    GET_ATTEMPTED_CASE_SUCCESS,
    GET_ATTEMPTED_CASE_ERROR
} from '../types';

const INITIAL_STATE = {
    cases: {
        loading: true,
        error: '',
        page: 1,
        total: 0,
        data: [],
        paginationIndex: [] 
    },
    diseases: {
        loading: true,
        error: '',
        page: 1,
        total: 0,
        data: [],
        paginationIndex: [] 
    },
    singleCase: null,
    caseAccess: '',
    caseAttempt: {
        loading: true,
        success: false,
        error: ''
    },
    attemptedCase: {
        loading: true,
        attemptedC: null,
        error: ''
    }
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_CASE_ACCESS:
            return {
                ...state,
                caseAccess: action.payload
            }
        case FETCH_CASES_LOADING:
            return {
                ...state,
                cases: {
                    ...state.cases,
                    loading: true,
                    error: '',
                }
            }          
        case FETCH_CASES_SUCCESS:
            return {
                ...state,
                cases: { 
                    ...state.cases, 
                    ...action.payload,
                    loading: false,
                    error: '',
                },
            }
        case FETCH_CASE_SUCCESS:
            return {
                ...state,
                singleCase: action.payload
            }
        case UPDATE_CASE_PAGE: 
            return {                    
                ...state,           
                cases: {              
                    ...state.cases, 
                    page: action.payload.page,
                }
            }
        case SET_PAGINATION:
                return {
                    ...state,
                    cases: {
                        ...state.cases,
                        paginationIndex: action.payload
                    }
                }
        case FETCH_CASES_ERROR: 
            return {
                ...state,
                cases: {
                    ...state.cases,
                    loading: false,
                    error: action.payload,
                }
            }  
        case FETCH_DISEASES_LOADING:
            return {
                ...state,
                diseases: {
                    ...state.diseases,
                    loading: true,
                    error: '',
                },
            }          
        case FETCH_DISEASES_SUCCESS:
            return {
                ...state,
                diseases: { 
                    ...state.diseases, 
                    ...action.payload,
                    loading: false,
                    error: '',
                },
            }     
        case FETCH_DISEASES_ERROR: 
            return {
                ...state,
                diseases: { 
                    ...state.diseases,
                    loading: false,
                    error: action.payload,
                }
            }   
        case ATTEMPT_CASE_LOADING:
            return {
                ...state,
                caseAttempt: {
                    loading: true,
                    success: false,
                    error: ''
                }
            }  
        case ATTEMPT_CASE_SUCCESS:
            return {
                ...state,
                caseAttempt: {
                    loading: false,
                    success: true,
                    error: ''
                }
            }   
        case ATTEMPT_CASE_ERROR: 
            return {
                ...state,
                caseAttempt: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }    
        case GET_ATTEMPTED_CASE_LOADING:
            return {
                ...state,
                attemptedCase: {
                    loading: true,
                    attemptedC: null,
                    error: ''
                }
            } 
        case GET_ATTEMPTED_CASE_SUCCESS:
            return {
                ...state,
                attemptedCase: {
                    loading: false,
                    attemptedC: action.payload,
                    error: ''
                }
            } 
        case GET_ATTEMPTED_CASE_ERROR:
            return {
                ...state,
                attemptedCase: {
                    loading: false,
                    attemptedC: null,
                    error: action.payload
                }
            }        
        default: return state;
    }
}


export default reducer;
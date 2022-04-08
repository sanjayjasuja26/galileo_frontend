import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR,
    UPDATE_CASE_PAGE,
    SET_PAGINATION,
    SET_CASE_ACCESS
} from '../types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    cases: {
        page: 1,
        total: 0,
        data: [],
        paginationIndex: [] 
    },
    case: null,
    caseAccess: ''
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
                loading: true,
                error: '',
            }
        case FETCH_CASE_SUCCESS:
            return {
                ...state,
                loading: false,
                case: action.payload,
                error: '',
            }          
        case FETCH_CASES_SUCCESS:
            return {
                ...state,
                loading: false,
                cases: { ...state.cases, ...action.payload},
                error: '',
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
                loading: false,
                error: action.payload,
            }                               
        default: return state;
    }
}


export default reducer;
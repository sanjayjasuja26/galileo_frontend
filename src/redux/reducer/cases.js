import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR
} from '../types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    cases: [],
    case: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
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
                cases: action.payload,
                error: '',
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
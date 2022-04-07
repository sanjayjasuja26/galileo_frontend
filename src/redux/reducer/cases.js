import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR,
    UPDATE_CASE_PAGE
} from '../types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    cases: {
        page: 1,
        total: 0,
        data: [],
        startFrom: '',
        endAt: '' 
    },
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
                cases: { ...state.cases, ...action.payload},
                error: '',
            }
        case UPDATE_CASE_PAGE: 
            return {
                ...state,           
                cases: {              
                    ...state.case, 
                    page: action.payload.page,
                    startFrom: action.payload.isNext ? state.cases.data[state.cases.data.length - 1].case_id : '',
                    // endAt: action.payload.isNext ? '' : state.cases.data[0].case_id
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
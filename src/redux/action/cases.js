import { calculatePagination, createStudentLog, getAttemptedCaseDoc, getCollectionDocCounts, getDataFromCollection } from '../../utils/helper';
import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR,
    UPDATE_CASE_PAGE,
    SET_PAGINATION,
    SET_CASE_ACCESS,
    FETCH_DISEASES_SUCCESS,
    FETCH_DISEASES_ERROR,
    ATTEMPT_CASE_ERROR,
    ATTEMPT_CASE_LOADING,
    ATTEMPT_CASE_SUCCESS,
    GET_ATTEMPTED_CASE_LOADING,
    GET_ATTEMPTED_CASE_ERROR,
    GET_ATTEMPTED_CASE_SUCCESS
} from '../types';


export const updatePage = (body) => {
    return {
        type: UPDATE_CASE_PAGE,
        payload: body
    }
}       

export const initialAttemptCase = () => {
    return {
        type: GET_ATTEMPTED_CASE_SUCCESS,
        payload: null
    }
}

export const setCasesAccess = (body) => {
    return {
        type: SET_CASE_ACCESS,
        payload: body
    }
}    

export const getCase = (body) => {
    return {
        type: FETCH_CASE_SUCCESS,
        payload: body
    }
}

export const setCasesPaginationIndex = ({page, access}) => async (dispatch) => {
    try {
        const collCount = await getCollectionDocCounts("cases_neuro", {
            key: "partial_access",
            value: access,
        }); 
        const perPageData = await calculatePagination("cases_neuro", {
            key: "partial_access",
            value: access,
            orderBy: "case_id",
            page,
            count: collCount
        });
        if(perPageData){
            dispatch({
                type: SET_PAGINATION,     
                payload: perPageData
            })
        }
    } catch (error) {
        dispatch({               
            type: FETCH_CASES_ERROR,
            payload: error.code
        }) 
    }
}       

export const fetchCases = ({page, access, startAt, loading, user}) => async (dispatch) => {
    if(loading) dispatch({ type: FETCH_CASES_LOADING })
    try {                                          
        
        const obj = await getDataFromCollection("cases_neuro", {
            key: "partial_access",
            value: access,    
            orderBy: "case_id",
            page,    
            startAt, 
            user  
        });                 
    
        if(obj.data){                
            dispatch({
                type: FETCH_CASES_SUCCESS,
                payload: {
                    total: obj.count,
                    data: obj.data
                }        
            })
        } else {               
            dispatch({           
                type: FETCH_CASES_ERROR,
                payload: 'Something went wrong'
            })                
        }

    } catch (error) {       
        dispatch({               
            type: FETCH_CASES_ERROR,
            payload: error.code
        })                                                      
    }
}     

export const fetchCase = ({page, id, startAt, loading}) => async (dispatch) => {
    if(loading) dispatch({ type: FETCH_CASES_LOADING })
    try {                                          
        
        const obj = await getDataFromCollection("cases_neuro", {
            key: "case_id",
            value: id,    
            orderBy: "partial_access",
            page,    
            startAt  
        });                 
    
        if(obj.data){                
            dispatch({
                type: FETCH_CASE_SUCCESS,
                payload: obj.data[0]
            })
        } else {               
            dispatch({           
                type: FETCH_CASES_ERROR,
                payload: 'Something went wrong'
            })                
        }

    } catch (error) {       
        dispatch({               
            type: FETCH_CASES_ERROR,
            payload: error.code
        })                                                      
    }
}  

export const fetchDiseases = () => async (dispatch) => {
    try {                                          
        
        const obj = await getDataFromCollection("diseases_neuro");                 
            
        if(obj.data){                
            dispatch({
                type: FETCH_DISEASES_SUCCESS,
                payload: {
                    total: obj.count,
                    data: obj.data
                }
            })
        } else {               
            dispatch({           
                type: FETCH_DISEASES_ERROR,
                payload: 'Something went wrong'
            })                
        }

    } catch (error) {       
        dispatch({               
            type: FETCH_DISEASES_ERROR,
            payload: error.code
        })                                                      
    }
}

export const attemptCase = (body) => async (dispatch) => {
    dispatch({ type: ATTEMPT_CASE_LOADING })
    try {
        const allreadyAttempted = await getAttemptedCaseDoc({ id: body.case_id, user: body.user_id });

        if(allreadyAttempted){
            return false;
        }

        const caseAttempt = await createStudentLog(body);

        if(caseAttempt){
            dispatch({
                type: ATTEMPT_CASE_SUCCESS,
            })
            return true;
        } else {
            return false;
        }

    } catch (error) {
        dispatch({
            type: ATTEMPT_CASE_ERROR,
            payload: error.code
        })
        return false;
    }
}

export const getAttemptedCase = (body) => async (dispatch) => {
    dispatch({ type: GET_ATTEMPTED_CASE_LOADING })
    try {
        const attemptedCase = await getAttemptedCaseDoc(body);

        dispatch({
            type: GET_ATTEMPTED_CASE_SUCCESS,
            payload: attemptedCase
        })
    } catch (error) {
        dispatch({
            type: GET_ATTEMPTED_CASE_ERROR,
            payload: error.code
        })
    }
}
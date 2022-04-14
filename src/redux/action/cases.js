import { calculatePagination, getCollectionDocCounts, getDataFromCollection } from '../../utils/helper';
import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR,
    UPDATE_CASE_PAGE,
    SET_PAGINATION,
    SET_CASE_ACCESS
} from '../types';


export const updatePage = (body) => {
    return {
        type: UPDATE_CASE_PAGE,
        payload: body
    }
}       

export const setCasesAccess = (body) => {
    return {
        type: SET_CASE_ACCESS,
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

export const fetchCases = ({page, access, startAt, loading}) => async (dispatch) => {
    if(loading) dispatch({ type: FETCH_CASES_LOADING })
    try {                                          
        
        const obj = await getDataFromCollection("cases_neuro", {
            key: "partial_access",
            value: access,    
            orderBy: "case_id",
            page,    
            startAt  
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
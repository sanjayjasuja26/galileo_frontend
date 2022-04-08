import { calculatePagination, getCollectionDocCounts, getDataFromCollection } from '../../utils/helper';
import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR,
    UPDATE_CASE_PAGE,
    SET_PAGINATION
} from '../types';


export const updatePage = (body) => {
    return {
        type: UPDATE_CASE_PAGE,
        payload: body
    }
}           

export const setCasesPaginationIndex = ({page, access}) => async (dispatch) => {
    try {
        const collCount = await getCollectionDocCounts("cases_neuro"); 
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

export const fetchCases = ({page, access, startAt}) => async (dispatch) => {
    dispatch({ type: FETCH_CASES_LOADING })
    try {                                    

        if(access === 'P'){
            access = 'Y'         
        } else if(access === 'Y'){
            access = 'N'
        } else {                                 
            access = ''
        }   
          
        
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
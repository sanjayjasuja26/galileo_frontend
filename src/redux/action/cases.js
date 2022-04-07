import { getDataFromCollection } from '../../utils/helper';
import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR,
    UPDATE_CASE_PAGE
} from '../types';


export const updatePage = (body) => {
    return {
        type: UPDATE_CASE_PAGE,
        payload: body
    }
}           

export const fetchCases = ({startFrom, endAt, access}) => async (dispatch) => {
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
            startFrom,
            endAt
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
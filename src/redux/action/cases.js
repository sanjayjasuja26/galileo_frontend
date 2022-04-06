import { getCollectionDocCounts, getDataFromCollection } from '../../utils/helper';
import {
    FETCH_CASES_LOADING,
    FETCH_CASE_SUCCESS,
    FETCH_CASES_SUCCESS,
    FETCH_CASES_ERROR
} from '../types';

export const fetchCases = (access) => async (dispatch) => {
    dispatch({ type: FETCH_CASES_LOADING })
    try {

        if(access === 'P'){
            access = 'Y'
        } else if(access === 'Y'){
            access = 'N'
        } else {
            access = ''
        }

        const data = await getDataFromCollection("cases_neuro", {
            key: "partial_access",
            value: access,
            orderBy: "case_id",
            page: 1
        });

        const count = await getCollectionDocCounts("cases_neuro", {
            key: "partial_access",
            value: access,
        })

        console.log(count);    

        if(data){                
            dispatch({
                type: FETCH_CASES_SUCCESS,
                payload: data
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
import { combineReducers } from 'redux';
import authReducer from './auth';
import casesReducer from './cases';

const rootReducer = combineReducers({
    auth: authReducer, 
    cases: casesReducer     
});

export default rootReducer;
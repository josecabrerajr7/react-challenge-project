import { combineReducers }      from 'redux';
import TempReducer              from './tempReducer';
import authReducer              from './authReducer';

export default combineReducers({
    temp: TempReducer,
    auth: authReducer
});
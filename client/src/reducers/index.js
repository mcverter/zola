import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import auth from './authReducer';

const rootReducer = combineReducers({
    auth,
    form,
});

export default rootReducer;

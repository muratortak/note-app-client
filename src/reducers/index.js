import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notesReducer from './notesReducer';


const rootReducers = combineReducers({
    user: userReducer,
    note: notesReducer,
});

export default rootReducers;


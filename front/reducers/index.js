import { combineReducers } from 'redux';
import user from './user';
import review from './review';

const rootReducer = combineReducers({
    user,
    review
});

export default rootReducer;
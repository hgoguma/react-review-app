import { combineReducers } from 'redux';
import user from './user';
import movie from './movie';
import review from './review';

const rootReducer = combineReducers({
    user,
    movie,
    review
});

export default rootReducer;
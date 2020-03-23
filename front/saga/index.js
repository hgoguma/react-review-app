import { all, fork } from 'redux-saga/effects';
import user from './user';
import review from './review';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';


export default function* rootSaga() {
    yield all([
        fork(user),
        fork(review)
    ]);
}
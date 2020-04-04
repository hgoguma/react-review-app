import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { UPLOAD_REVIEW_REQUEST, UPLOAD_REVIEW_SUCCESS, UPLOAD_REVIEW_FAILURE, 
    LOAD_REVIEW_REQUEST, LOAD_REVIEW_SUCCESS, LOAD_REVIEW_FAILURE } from '../reducers/review';

//후기 가져오기
function loadReviewAPI() {
    return axios.get('/review');
}

function* loadReview() {
    try {
        const result = yield call(loadReviewAPI);
        yield put({
            type : LOAD_REVIEW_SUCCESS,
            data : result.data
        });
    } catch(e) {
        yield put({
            type : LOAD_REVIEW_FAILURE,
            data : e,
        });
    }
}

function* watchLoadReview() {
    yield takeEvery(LOAD_REVIEW_REQUEST, loadReview);
}

//후기 올리기
function uploadReviewAPI(reviewData) {
    return axios.post('/review/upload', reviewData, {
        withCredentials : true
    } );
}

function* uploadReview(action) {
    try {
        const result = yield call(uploadReviewAPI, action.data);
        yield put({
            type : UPLOAD_REVIEW_SUCCESS,
            data : result.data
        });
    } catch(e) {
        yield put({
            type : UPLOAD_REVIEW_FAILURE,
            data : e.response.data
        });
    }
}

function* watchUploadReview() {
    yield takeEvery(UPLOAD_REVIEW_REQUEST, uploadReview);
}


export default function* reviewSaga() {
    yield all([
        fork(watchLoadReview),
        fork(watchUploadReview),
    ])
}
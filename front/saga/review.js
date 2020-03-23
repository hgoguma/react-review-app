import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { UPLOAD_REVIEW_REQUEST, UPLOAD_REVIEW_SUCCESS, UPLOAD_REVIEW_FAILURE } from '../reducers/review';


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
        fork(watchUploadReview),
    ])
}
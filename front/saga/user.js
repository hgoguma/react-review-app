import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, CHECK_EMAIL_RESULT, CHECK_EMAIL_REQUEST, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAILURE } from '../reducers/user';
import axios from 'axios';


//로그인
function loginAPI(loginData) {
    return axios.post('/user/login', loginData, {
        withCredentials : true,
    })
}

function* login(action) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type : LOG_IN_SUCCESS,
            data : result.data
        });
    } catch(e) {
        yield put({
            type : LOG_IN_FAILURE,
            data : e.response.data
        });
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login);
}

//회원가입
function signUpAPI(signUpData) {
    return axios.post('/user/signUp', signUpData);
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type : SIGN_UP_SUCCESS,
            data : result.data
        })
    } catch(e) {
        console.error(e);
        yield put({
            type : SIGN_UP_FAILURE
        })
    }
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}


function checkEmailAPI(email) {
    return axios.post('/user/emailCheck', email);
}

function* checkEmail(action) {
    try {
        const result = yield call(checkEmailAPI, action.data);
        yield put({
            type : CHECK_EMAIL_SUCCESS,
            data : result.data.result
        });
    } catch(e) {
        console.error(e);
        yield put({
            type : CHECK_EMAIL_FAILURE
        })
    }
}

function* watchCheckEmail() {
    yield takeEvery(CHECK_EMAIL_REQUEST, checkEmail);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchCheckEmail),
    ])
}
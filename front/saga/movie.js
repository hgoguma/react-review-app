import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_MAIN_MOVIE_REQUEST, LOAD_MAIN_MOVIE_SUCCESS, LOAD_MAIN_MOVIE_FAILURE, LOAD_MOVIE_SUCCESS, LOAD_MOVIE_FAILURE, LOAD_MOVIE_REQUEST } from '../reducers/movie';


function loadMainMovieAPI() {
    return axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=ko`, {});
}

function* loadMainMovie() {
    try {
        const result = yield call(loadMainMovieAPI);
        yield put({
            type : LOAD_MAIN_MOVIE_SUCCESS,
            data : result.data.results
        });
    } catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MAIN_MOVIE_FAILURE,
        });
    }
}

function* watchLoadMainMovie () {
    yield takeLatest(LOAD_MAIN_MOVIE_REQUEST, loadMainMovie)
}

function loadMovieAPI(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=ko`, {});
}

function* loadMovie(action) {
    try {
        const result = yield call(loadMovieAPI, action.data);
        yield put({
            type : LOAD_MOVIE_SUCCESS,
            data : result.data,
        });
    } catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MOVIE_FAILURE,
        });
    }
}

function* watchLoadMovie () {
    yield takeLatest(LOAD_MOVIE_REQUEST, loadMovie)

}


export default function* movieSaga() {
    yield all([
        fork(watchLoadMainMovie),
        fork(watchLoadMovie),
    ])
}
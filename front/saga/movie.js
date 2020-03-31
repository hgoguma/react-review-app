import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_MAIN_MOVIE_REQUEST, LOAD_MAIN_MOVIE_SUCCESS, LOAD_MAIN_MOVIE_FAILURE, 
    LOAD_MOVIE_REQUEST, LOAD_MOVIE_SUCCESS, LOAD_MOVIE_FAILURE, 
    LOAD_MOVIE_CAST_REQUEST, LOAD_MOVIE_CAST_SUCCESS, LOAD_MOVIE_CAST_FAILURE, 
    LOAD_SIMILAR_MOVIE_REQUEST, LOAD_SIMILAR_MOVIE_SUCCESS, LOAD_SIMILAR_MOVIE_FAILURE
} from '../reducers/movie';


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
    yield takeLatest(LOAD_MOVIE_REQUEST, loadMovie);
}

//출연진 불러오기
function loadMovieCastAPI(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=ko`, {});
}

function* loadMovieCast(action) {
    try {
        const result = yield call(loadMovieCastAPI, action.data);
        yield put({
            type : LOAD_MOVIE_CAST_SUCCESS,
            data : result.data,
        });
    } catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MOVIE_CAST_FAILURE,
        });
    }
}

function* watchLoadMovieCast () {
    yield takeLatest(LOAD_MOVIE_CAST_REQUEST, loadMovieCast);
}

//비슷한 영화 불러오기
function loadSimilarMovieAPI(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=ko`, {});
}

function* loadSimilarMovie(action) {
    try {
        const result = yield call(loadSimilarMovieAPI, action.data);
        console.log('비슷한 영화 불러오기!');
        console.log(result);
        yield put({
            type : LOAD_SIMILAR_MOVIE_SUCCESS,
            data : result.data,
        });
    } catch(e) {
        console.error(e);
        yield put({
            type : LOAD_SIMILAR_MOVIE_FAILURE,
        });
    }
}

function* watchLoadSimilarMovie () {
    yield takeLatest(LOAD_SIMILAR_MOVIE_REQUEST, loadSimilarMovie);
}


export default function* movieSaga() {
    yield all([
        fork(watchLoadMainMovie),
        fork(watchLoadMovie),
        fork(watchLoadMovieCast),
        fork(watchLoadSimilarMovie),
    ])
}
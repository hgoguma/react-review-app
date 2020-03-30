import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_MAIN_MOVIE_REQUEST, LOAD_MAIN_MOVIE_SUCCESS, LOAD_MAIN_MOVIE_FAILURE } from '../reducers/movie';

function loadMainMovieAPI() {
    return axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=a057695fbd8c572ea242410ec4f2a78f&language=ko', {});
}

function* loadMainMovie() {
    try {
        const result = yield call(loadMainMovieAPI);
        console.log('api 불러오기!');
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
export default function* movieSaga() {
    yield all([
        fork(watchLoadMainMovie),
    ])
}
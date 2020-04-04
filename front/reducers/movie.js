import produce from 'immer';

export const initialState = {
    isMovieLoading: false,
    isMovieLoaded: false,
    loadingMovieError: '',
    isCastLoading: false,
    isCastLoaded: false,
    loadingCastError: '',
    isSimilarLoading: false,
    isSimilarLoaded: false,
    loadingSimilarError: '',
    data: [],
    cast: [],
    similar: [],
};

export const LOAD_MAIN_MOVIE_REQUEST = 'LOAD_MAIN_MOVIE_REQUEST';
export const LOAD_MAIN_MOVIE_SUCCESS = 'LOAD_MAIN_MOVIE_SUCCESS';
export const LOAD_MAIN_MOVIE_FAILURE = 'LOAD_MAIN_MOVIE_FAILURE';

export const LOAD_MOVIE_REQUEST = 'LOAD_MOVIE_REQUEST';
export const LOAD_MOVIE_SUCCESS = 'LOAD_MOVIE_SUCCESS';
export const LOAD_MOVIE_FAILURE = 'LOAD_MOVIE_FAILURE';

export const LOAD_MOVIE_CAST_REQUEST = 'LOAD_MOVIE_CAST_REQUEST';
export const LOAD_MOVIE_CAST_SUCCESS = 'LOAD_MOVIE_CAST_SUCCESS';
export const LOAD_MOVIE_CAST_FAILURE = 'LOAD_MOVIE_CAST_FAILURE';

export const LOAD_SIMILAR_MOVIE_REQUEST = 'LOAD_SIMILAR_MOVIE_REQUEST';
export const LOAD_SIMILAR_MOVIE_SUCCESS = 'LOAD_SIMILAR_MOVIE_SUCCESS';
export const LOAD_SIMILAR_MOVIE_FAILURE = 'LOAD_SIMILAR_MOVIE_FAILURE';



const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_MAIN_MOVIE_REQUEST :
            case LOAD_MOVIE_REQUEST : {
                draft.isMovieLoading = true;
                break;
            }
            case LOAD_MAIN_MOVIE_SUCCESS : 
            case LOAD_MOVIE_SUCCESS : {
                draft.isMovieLoading = false;
                draft.isMovieLoaded = true,
                draft.data = action.data;
                break;
            }
            case LOAD_MAIN_MOVIE_FAILURE : 
            case LOAD_MAIN_MOVIE_FAILURE : {
                draft.isMovieLoading = false;
                draft.isMovieLoaded = false,
                draft.loadingMovieError = action.error;
                break;
            }
            case LOAD_MOVIE_CAST_REQUEST : {
                draft.isCastLoading = true;
                draft.isCastLoaded = false;
                break;
            }
            case LOAD_MOVIE_CAST_SUCCESS : {
                draft.isCastLoading = false;
                draft.isCastLoaded = true;
                draft.cast = action.data;
                break;
            }
            case LOAD_MOVIE_CAST_FAILURE : {
                draft.isCastLoading = false;
                draft.isCastLoaded = false;
                draft.loadingCastError = action.error;
                break;
            }
            case LOAD_SIMILAR_MOVIE_REQUEST : {
                draft.isSimilarLoading = true;
                draft.isSimilarLoaded = false;
                break;
            }
            case LOAD_SIMILAR_MOVIE_SUCCESS : {
                draft.isSimilarLoading = false;
                draft.isSimilarLoaded = true;
                draft.similar = action.data;
                break;
            }
            case LOAD_SIMILAR_MOVIE_FAILURE : {
                draft.isSimilarLoading = true;
                draft.isSimilarLoaded = false;
                draft.loadingSimilarError = action.error;
                break;
            }
            default : {
                return {
                    ...state,
                }
            }
        }
    });
}

export default reducer;
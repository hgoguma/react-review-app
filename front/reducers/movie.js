
export const initialState = {
    isMovieLoading : false,
    isMovieLoaded : false,
    loadingMovieError : '',
    isCastLoading : false,
    isCastLoaded : false,
    loadingCastError : '',
    data : [],
    genres : [],
    cast : [],
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


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_MAIN_MOVIE_REQUEST :
        case LOAD_MOVIE_REQUEST : {
            return {
                ...state,
                isMovieLoading : true,
            }
        }
        case LOAD_MAIN_MOVIE_SUCCESS : 
        case LOAD_MOVIE_SUCCESS : {
            return {
                ...state,
                isMovieLoading : false,
                isMovieLoaded : true,
                data : action.data,
                genres : action.data.genres,
            }

        }
        case LOAD_MAIN_MOVIE_FAILURE : 
        case LOAD_MAIN_MOVIE_FAILURE : {
            return {
                ...state,
                isMovieLoading : false,
                isMovieLoaded : false,
                loadingMovieError : action.error,
            }

        }
        case LOAD_MOVIE_CAST_REQUEST : {
            return {
                ...state,
                isCastLoading : true,
                isCastLoaded : false,
            }
        }
        case LOAD_MOVIE_CAST_SUCCESS : {
            return {
                ...state,
                isCastLoading : false,
                isCastLoaded : true,
                cast : action.data,
            }
        }
        case LOAD_MOVIE_CAST_FAILURE : {
            return {
                ...state,
                isCastLoading : false,
                isCastLoaded : false,
                loadingCastError : action.error,
            }
        }
        default : {
            return {
                ...state,
            }
        }

    }

}

export default reducer;

export const initialState = {
    isLoading : false,
    isLoaded : false,
    loadingError : '',
    data : [],
    genres : [],
};

export const LOAD_MAIN_MOVIE_REQUEST = 'LOAD_MAIN_MOVIE_REQUEST';
export const LOAD_MAIN_MOVIE_SUCCESS = 'LOAD_MAIN_MOVIE_SUCCESS';
export const LOAD_MAIN_MOVIE_FAILURE = 'LOAD_MAIN_MOVIE_FAILURE';

export const LOAD_MOVIE_REQUEST = 'LOAD_MOVIE_REQUEST';
export const LOAD_MOVIE_SUCCESS = 'LOAD_MOVIE_SUCCESS';
export const LOAD_MOVIE_FAILURE = 'LOAD_MOVIE_FAILURE';


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_MAIN_MOVIE_REQUEST : {
            return {
                ...state,
                isLoading : true,
            }
        }
        case LOAD_MAIN_MOVIE_SUCCESS : {
            return {
                ...state,
                isLoaded : true,
                isLoading : false,
                data : action.data,
            }

        }
        case LOAD_MAIN_MOVIE_FAILURE : {
            return {
                
            }

        }
        case LOAD_MOVIE_REQUEST : {
            return {
                ...state,
                isLoading : true,
            }
        }
        case LOAD_MOVIE_SUCCESS : {
            return {
                ...state,
                isLoaded : true,
                isLoading : false,
                data : action.data,
                genres : action.data.genres.length > 1 ? action.data.genres : action.data.genres[0],
            }

        }
        case LOAD_MOVIE_FAILURE : {
            return {
                
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
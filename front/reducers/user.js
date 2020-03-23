const dummyUser = {
    nickname : '알파카',
    email : 'hgoguma@gmail.com',
    id : 1
}

export const initialState = {
    isLoggingOut : false, // 로그아웃 시도중
    isLoggedOut : false,
    //isLoggingIn : false, // 로그인 시도중
    isLoggedIn : false, //로그인 여부
    logInErrorReason : '', // 로그인 실패 사유
    checkEmailResult : false, 
    checkEmailErrorReason : '',
    isSignedUp : false, // 회원가입 성공
    isSigningUp : false, // 회원가입 시도중
    signUpErrorReason : '', // 회원가입 실패 사유
    me : null // 내 정보
};

//비동기 요청 액션의 이름 -> redux saga
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; 
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const CHECK_EMAIL_REQUEST = 'CHECK_EMAIL_REQUEST';
export const CHECK_EMAIL_SUCCESS = 'CHECK_EMAIL_SUCCESS';
export const CHECK_EMAIL_FAILURE = 'CHECK_EMAIL_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN_REQUEST : {
            return {
              ...state,
              isLoggedIn : false,
            };
        }
        case LOG_IN_SUCCESS : {
            return {
              ...state,
              isLoggedIn : true,
              me : action.data,
            };
        }
        case LOG_IN_FAILURE : {
            return {
                ...state,
                isLoggedIn : false,
                logInErrorReason : action.data,
                me : null,
            }
        }
        case CHECK_EMAIL_REQUEST : {
            return {
                ...state, 
                checkEmailResult : false,
                checkEmailErrorReason : '',
            }
        }
        case CHECK_EMAIL_SUCCESS : {
            return {
                ...state,
                checkEmailResult : action.data
            }
        }
        case CHECK_EMAIL_FAILURE : {
            return {
                ...state,
                checkEmailResult : false,
                checkEmailErrorReason : action.error,
            }
        }
        case SIGN_UP_REQUEST : {
            return {
                ...state,
                isSigningUp : true,
                signUpErrorReason : '',
            };
        }
        case SIGN_UP_SUCCESS : {
            return {
                ...state,
                isSigningUp : false,
                isSignedUp : true,
                me : action.data,
            };
        }
        case SIGN_UP_FAILURE : {
            return {
                ...state,
                isSigningUp : false,
                isSignedUp : false,
                signUpErrorReason : action.error,
                me : null,
            };
        }
        default : {
            return {
                ...state
            }
        }
    }
}

export default reducer;
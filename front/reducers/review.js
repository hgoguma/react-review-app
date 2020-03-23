
export const initialState = {
    mainPosts: [], // 화면에 보일 포스트들
    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: '', // 포스트 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드 중
    postAdded: false, // 포스트 업로드 성공
    isAddingComment: false,
    addCommentErrorReason: '',
    commentAdded: false,
};

//비동기 요청 액션의 이름 -> redux saga
export const UPLOAD_REVIEW_REQUEST = 'UPLOAD_REVIEW_REQUEST';
export const UPLOAD_REVIEW_SUCCESS = 'UPLOAD_REVIEW_SUCCESS';
export const UPLOAD_REVIEW_FAILURE = 'UPLOAD_REVIEW_FAILURE'; 

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPLOAD_REVIEW_REQUEST : {
            return {
                ...state,
                isAddingPost: true,
                addPostErrorReason: '',
                postAdded: false,
            };
        }
        case UPLOAD_REVIEW_SUCCESS : {
            return {
                ...state,
                isAddingPost: false,
                mainPosts: [action.data, ...state.mainPosts],
                postAdded: true,
                imagePaths: [],
            };
        }
        case UPLOAD_REVIEW_FAILURE : {
            return {
                ...state,
                isAddingPost: false,
                addPostErrorReason: action.error,
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
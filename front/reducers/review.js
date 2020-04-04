import produce from 'immer';

export const initialState = {
    reviews: [], // 화면에 보일 포스트들
    hasMoreReviews : false,
    addReviewErrorReason: '', // 포스트 업로드 실패 사유
    isAddingReview: false, // 포스트 업로드 중
    reviewAdded: false, // 포스트 업로드 성공
    isAddingComment: false,
    addCommentErrorReason: '',
    commentAdded: false,
};

//비동기 요청 액션의 이름 -> redux saga
export const UPLOAD_REVIEW_REQUEST = 'UPLOAD_REVIEW_REQUEST';
export const UPLOAD_REVIEW_SUCCESS = 'UPLOAD_REVIEW_SUCCESS';
export const UPLOAD_REVIEW_FAILURE = 'UPLOAD_REVIEW_FAILURE';

export const LOAD_REVIEW_REQUEST = 'LOAD_REVIEW_REQUEST';
export const LOAD_REVIEW_SUCCESS = 'LOAD_REVIEW_SUCCESS';
export const LOAD_REVIEW_FAILURE = 'LOAD_REVIEW_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {

        switch(action.type) {
            case UPLOAD_REVIEW_REQUEST : {
                draft.isAddingReview = true;
                draft.reviewAdded = false;
                draft.addReviewErrorReason = '';
                break;
            }
            case UPLOAD_REVIEW_SUCCESS : {
                draft.isAddingReview = false;
                draft.reviewAdded = true;
                draft.reviews.unshift(action.data);
                break;
            }
            case UPLOAD_REVIEW_FAILURE : {
                draft.isAddingReview = false;
                draft.reviewAdded = false;
                draft.addReviewErrorReason = action.error;
                break;
            }
            case LOAD_REVIEW_REQUEST : {
                break;
            }
            case LOAD_REVIEW_SUCCESS : {
                draft.reviews = action.data;
                break;
            }
            case LOAD_REVIEW_FAILURE : {
                break;
            }
            default : {
                return {
                    ...state
                }
            }
        }
    });
}

export default reducer;
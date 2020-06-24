import {
    REMOVE_REVIEW_ERROR, REMOVE_REVIEW_SUCCESS, REMOVE_REVIEW_LOADING, GET_ALL_REVIEWS_SUCCESS, GET_ALL_REVIEWS_ERROR

} from "../actions/actionTypes"

const initialState = { loadingRev: true, reviews: [] }
export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {

        case GET_ALL_REVIEWS_SUCCESS:
            return { ...state, loadingRev: false, reviews: payload };

        case GET_ALL_REVIEWS_ERROR:
            return { ...state, loadingRev: false};


        case REMOVE_REVIEW_LOADING:
            return { ...state, loadingDelete: true };

        case REMOVE_REVIEW_SUCCESS:
            return { ...state, loadingDelete: false};

        case REMOVE_REVIEW_ERROR:
            return { ...state, loadingDelete: false };

        default:
            return state;
    }
}
import { GET_REVIEWS, REVIEW_ERROR, LOAD_REVIEWS } from "../actions/actionTypes"

const initialState = { loadingR: true, reviews: null }

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {

        case GET_REVIEWS:
            return {
                ...state,
                reviews: payload,
                loadingR: false
            }
        case LOAD_REVIEWS:
            return {
                ...state,
                loadingR: true
            }
        case REVIEW_ERROR:
            return {
                ...state,
                loadingR: false
            }
        default:
            return state;
    }
}
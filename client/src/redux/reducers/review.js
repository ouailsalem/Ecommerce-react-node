import { ADD_REVIEW, REVIEW_ERROR } from "../actions/actionTypes"

const initialState = { loading: true }

export default (state = initialState, action) => {
    const { type, payload, pictures } = action
    switch (type) {

        case ADD_REVIEW:
            return {
                ...state,
                loading: false
            }
        case REVIEW_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
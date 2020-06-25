import { NOT_FOUND, NOT_FOUND_RESET } from "../actions/actionTypes"

const initialState = { notFound: false }

export default (state = initialState, action) => {
    const { type } = action
    switch (type) {

        case NOT_FOUND:
            return {
                ...state,
                notFound: true
            }
        case NOT_FOUND_RESET:
            return {
                ...state,
                notFound: false
            }
        default:
            return state;
    }
}
import { GET_PRODUCT, LOAD_ERROR } from "../actions/actionTypes"

const initialState = { loading: true, product: null }

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {

        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            }
        case LOAD_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
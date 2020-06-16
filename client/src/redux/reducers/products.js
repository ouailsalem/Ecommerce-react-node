import { GET_PRODUCTS, LOAD_ERROR } from "../actions/actionTypes"

const initialState = { loading: true, products: [] }

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
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
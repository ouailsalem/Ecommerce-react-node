import { GET_PRODUCT, LOAD_ERROR } from "../actions/actionTypes"

const initialState = { loading: true, product: null, reviews: null, pictures: null }

export default (state = initialState, action) => {
    const { type, payload, pictures } = action
    switch (type) {

        case GET_PRODUCT:
            return {
                ...state,
                product: payload.product,
                reviews: payload.reviews,
                pictures: pictures,
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
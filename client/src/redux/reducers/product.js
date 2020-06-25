import { GET_PRODUCT, LOAD_ERROR } from "../actions/actionTypes"

const initialState = { loading: true, product: null, pictures: null, picturesEdits :[] }

export default (state = initialState, action) => {
    const { type, payload, pictures, picturesEdits } = action
    switch (type) {

        case GET_PRODUCT:
            return {
                ...state,
                product: payload.product,
                pictures: pictures,
                loading: false,
                picturesEdits: picturesEdits
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
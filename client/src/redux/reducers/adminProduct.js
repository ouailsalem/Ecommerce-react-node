import {
    REMOVE_PRODUCT_LOADING,
    REMOVE_PRODUCT_ERROR,
    REMOVE_PRODUCT_SUCCESS,

    ADD_PRODUCT_LOADING,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,

    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_LOADING,
    UPDATE_PRODUCT_ERROR,

    RESET_PRODUCT_ADD_UPDATE,

} from "../actions/actionTypes"

const initialState = { loadingPr: false, posted: false }
export default (state = initialState, action) => {
    const { type } = action
    switch (type) {

        case ADD_PRODUCT_LOADING:
        case REMOVE_PRODUCT_LOADING:
        case UPDATE_PRODUCT_LOADING:
            return { ...state, loadingPr: true };

        case REMOVE_PRODUCT_SUCCESS:
        case ADD_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
            return { ...state, loadingPr: false, posted: true };

        case REMOVE_PRODUCT_ERROR:
        case ADD_PRODUCT_ERROR:
        case UPDATE_PRODUCT_ERROR:
            return { ...state, loadingPr: false };

        case RESET_PRODUCT_ADD_UPDATE:
            return { ...state, posted: false }

        default:
            return state;
    }
}
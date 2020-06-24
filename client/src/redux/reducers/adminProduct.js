import {
    REMOVE_PRODUCT_ERROR, REMOVE_PRODUCT_SUCCESS, REMOVE_PRODUCT_LOADING,
    ADD_PRODUCT_ERROR, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_LOADING, RESET_PRODUCT_ADD_STATE
} from "../actions/actionTypes"

const initialState = { loadingPr: false, posted: false }
export default (state = initialState, action) => {
    const { type } = action
    switch (type) {

        case ADD_PRODUCT_LOADING:
        case REMOVE_PRODUCT_LOADING:
            return { ...state, loadingDelete: true };

        case REMOVE_PRODUCT_SUCCESS:
        case ADD_PRODUCT_SUCCESS:
            return { ...state, loadingDelete: false, posted: true };

        case REMOVE_PRODUCT_ERROR:
        case ADD_PRODUCT_ERROR:
            return { ...state, loadingDelete: false };

        case RESET_PRODUCT_ADD_STATE:
            return {state}

        default:
            return state;
    }
}
import { REMOVE_PRODUCT_ERROR, REMOVE_PRODUCT_SUCCESS, REMOVE_PRODUCT_LOADING } from "../actions/actionTypes"

const initialState = { loadingDelete: false }
export default (state = initialState, action) => {
    const { type, loading } = action
    switch (type) {
        case REMOVE_PRODUCT_LOADING :{
            return { ...state, loadingDelete: true };
        }
        case REMOVE_PRODUCT_SUCCESS:
            return { ...state, loadingDelete: false };
        case REMOVE_PRODUCT_ERROR:
            return { ...state, loadingDelete: false };
        default:
            return state;
    }
}
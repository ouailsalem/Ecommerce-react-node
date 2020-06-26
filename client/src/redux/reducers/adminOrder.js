import { GET_ORDERS_LOADING, GET_ORDERS_SUCCESS, GET_ORDERS_ERROR,  UPDATE_ORDER_SUCCESS, UPDATE_ORDER_ERROR, RESET_ORDER_UPDATE, REMOVE_ORDER_LOADING, REMOVE_ORDER_SUCCESS, REMOVE_ORDER_ERROR } from "../actions/actionTypes"


const initialState = {
    loadingOr: false,
    posted: false,
    allOrders: []
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_ORDERS_LOADING:
            return { ...state, loadingOr: true }
        case GET_ORDERS_SUCCESS:
            return { ...state, loadingOr: false, allOrders: payload }
        case UPDATE_ORDER_SUCCESS:
            return { ...state, loadingOr: false, posted: true }
        case GET_ORDERS_ERROR:
        case UPDATE_ORDER_ERROR:
            return { ...state, loadingOr: false }
        case RESET_ORDER_UPDATE:
            return { ...state, posted: false, loadingOr: false }
        case REMOVE_ORDER_LOADING:
            return { ...state, loading: true }
        case REMOVE_ORDER_SUCCESS:
            return { ...state, loading: false }
        case REMOVE_ORDER_ERROR:
            return { ...state, loading: false }

        default:
            return state;
    }
}
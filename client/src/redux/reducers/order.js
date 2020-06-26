import { ADD_ORDER, ORDER_ERROR, POSTING_ORDER, RESET_ORDER,  GET_SINGLE_ORDER_SUCCESS, GET_SINGLE_ORDER_ERROR, GET_SINGLE_ORDER_LOADING } from "../actions/actionTypes"

const initialState = { posted: false, posting: false, loading: false, order: [] }

export default (state = initialState, action) => {
    const { type, order, posted } = action
    switch (type) {
        case POSTING_ORDER:
            return {
                ...state,
                posting: true
            }
        case ADD_ORDER:
            return {
                ...state,
                posted: posted,
                posting: false
            }
        case ORDER_ERROR:
            return {
                ...state,
                posted: false,
                posting: false
            }
        case RESET_ORDER:
            return {
                state
            }

        case GET_SINGLE_ORDER_LOADING:
            return {
                ...state,
                loading: true,
            }
        
        case GET_SINGLE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: order
            }
        case GET_SINGLE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
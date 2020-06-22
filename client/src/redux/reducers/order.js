import { ADD_ORDER, ORDER_ERROR, POSTING_ORDER, RESET_ORDER} from "../actions/actionTypes"

const initialState = { posted: false ,posting:false }

export default (state = initialState, action) => {
    const { type, posted, posting} = action
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
                posting:false
            }
        case ORDER_ERROR:
            return {
                ...state,
                posted: posted,
                posting: false
            }
        case RESET_ORDER:
            return {
                state    
            }
        default:
            return state;
    }
}
import { GET_USER_SUCCESS, GET_USER_ERROR, GET_USER_LOADING } from "../actions/actionTypes"

const initialState = { loading: true, user:null}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false,
            }
        case GET_USER_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
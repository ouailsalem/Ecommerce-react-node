import {
    GET_USERS_LOADING,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    REMOVE_USER_LOADING,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_ERROR,
    UPDATE_USER_LOADING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    RESET_USER_UPDATE,
} from "../actions/actionTypes"

const initialState = { loadingUser: false, posted: false, users: []}
export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case REMOVE_USER_LOADING:
        case UPDATE_USER_LOADING:
        case GET_USERS_LOADING:
            return { ...state, loadingUser: true };

        case REMOVE_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return { ...state, loadingUser: false, posted: true };
        case GET_USERS_SUCCESS:
            return { ...state, loadingUser: false, users: payload }
        case REMOVE_USER_ERROR:
        case UPDATE_USER_ERROR:
        case GET_USERS_ERROR:
            return { ...state, loadingUser: false };

        case RESET_USER_UPDATE:
            return { ...state, posted: false }

        default:
            return state;
    }
}
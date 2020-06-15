import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/actionTypes"

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}
export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_LOADED:
            return {
                ...state, isAuthenticated: true, loading: false, user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state, ...payload, isAuthenticated: true, loading: false
            };

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state, token: null, isAuthenticated: null, loading: false
            };
        default:
            return state;
    }
}
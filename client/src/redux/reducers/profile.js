import { GET_PROFILE_SUCCESS, GET_PROFILE_ERROR, UPDATE_PROFILE_ERROR, GET_PROFILE_LOADING, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET } from "../actions/actionTypes"

const initialState = { loadingProfile: false,posted:false, profile:{} }

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_PROFILE_LOADING:
            return {
                ...state,
                loadingProfile: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                loadingProfile: false
            }
        case GET_PROFILE_ERROR:
            return {
                ...state,
                loadingProfile: false
            }
        case UPDATE_PROFILE_LOADING:
            return {
                ...state,
                loadingProfile: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loadingProfile: false,
                posted: true
            }
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loadingProfile: false
            }
        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                posted: false,
                loadingProfile: false,
            }    
        default:
            return state;
    }
}
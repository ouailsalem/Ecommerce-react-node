import { GET_PROFILE } from "../actions/actionTypes"

const initialState = { loading: true, profile: null }

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        default:
            return state;
    }
}
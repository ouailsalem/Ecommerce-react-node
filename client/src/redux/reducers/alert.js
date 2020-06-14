import { SET_ALERT } from "../actions/actionTypes"

const initialState = []
export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case SET_ALERT:
            return state.filter(alert => alert.id !== payload)
        default:
            return state;
    }
}
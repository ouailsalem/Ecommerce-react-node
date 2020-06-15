import uniqid from 'uniqid'
import { SET_ALERT, REMOVE_ALERT } from './actionTypes'
export const setAlert = (msg, alertType, open, timeout = 3000) => dispatch => {
    const id = uniqid()
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id, open }
    })
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }, timeout)
}
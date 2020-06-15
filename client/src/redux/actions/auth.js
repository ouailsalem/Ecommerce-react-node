import Axios from "axios"
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from "./actionTypes"
import { setAlert } from "./alert"
import setAuthToken from "../../utils/setAuthToken"

// Load user
export const loadUser = () => async dispatch => {
    if (localStorage && localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await Axios.get('/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Login



//Register
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = { name, email, password }
    try {
        const res = await Axios.post('/users/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("تم تسجيلك بنجاح", "success", true, 3000))
        dispatch(loadUser())

    } catch (err) {
        if (err.response.status === 400) {
            dispatch(setAlert("البريد الإلكتروني الذي أدخلته مستعمل مسبقا", "error", true, 4000))
        } else {
            dispatch(setAlert("هناك مشكلـة ، نرجو المحاولة لاحقا", "error", true, 4000))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = { email, password }
    try {
        const res = await Axios.post('/users/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("تم تسجيلك بنجاح", "success", true, 3000))
        dispatch(loadUser())
    } catch (err) {
        if (err.response.status === 400) {
            dispatch(setAlert("المعلومات المدخلة غير مطابقـة", "error", true, 4000))
        } else {
            dispatch(setAlert("هناك مشكلـة ، نرجو المحاول لاحقا", "error", true, 4000))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}
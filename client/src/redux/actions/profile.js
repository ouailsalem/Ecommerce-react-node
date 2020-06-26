import Axios from 'axios'
import {
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE_LOADING,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    GET_PROFILE_LOADING,
    UPDATE_PROFILE_RESET,
    GET_PROFILE_ERROR
} from './actionTypes'
import { setAlert } from "./alert"

// GET my profile
export const getProfile = () => async dispatch => {
    dispatch({type:GET_PROFILE_LOADING})
    try {
        const res = await Axios.get("/apiv2/profile")
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_PROFILE_ERROR,
        })
    }

}
// update my profile
export const updateProfile = (values) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    dispatch({ type: UPDATE_PROFILE_LOADING })
    const body = {
        wilaya: values.wilaya,
        dayra: values.dayra,
        phoneNumber: values.phoneNumber,
    }

    try {
        await Axios.put(`/apiv2/profile/update/`, body, config)
        dispatch({ type: UPDATE_PROFILE_SUCCESS })
        dispatch(setAlert("تم تعديل الطلب بنجاح", "success", true, 3000))

    } catch (err) {
        dispatch({ type: UPDATE_PROFILE_ERROR, })
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}
// reset stats

export const resetProfile = () => async dispatch => {
    dispatch({
        type: UPDATE_PROFILE_RESET,
    })
}
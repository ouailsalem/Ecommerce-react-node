import Axios from "axios"
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
} from "./actionTypes"
import { setAlert } from "./alert"

// get all users
export const getUsers = () => async dispatch => {
    dispatch({ type: GET_USERS_LOADING })
    try {
        const res = await Axios.get('/users')
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
        dispatch({ type: GET_USERS_ERROR })
    }
}


// remove a user
export const removeUser = (userId) => async dispatch => {
    dispatch({
        type: REMOVE_USER_LOADING,
    })
    try {
        await Axios.delete(`/users/${userId}`)
        dispatch({
            type: REMOVE_USER_SUCCESS
        })

        dispatch(setAlert("تم حذف العضو", "success", true, 3000))

    } catch (err) {

        dispatch({
            type: REMOVE_USER_ERROR,
        })
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}

// update user
export const updateUser = (values) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    dispatch({
        type: UPDATE_USER_LOADING,
    })


    const body = {
        name: values.name,
        email: values.email,
        money: values.money,
    }

    try {
        let res = await Axios.put(`/users/${values.userId}`, body, config)
        console.log(res)
        dispatch({
            type: UPDATE_USER_SUCCESS,
        })

        dispatch(setAlert("تم تعديل معلومات العضو بنجاح", "success", true, 3000))

    } catch (err) {

        dispatch({
            type: UPDATE_USER_ERROR,
        })
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}
// reset state

export const resetUser = () => async dispatch => {
    dispatch({
        type: RESET_USER_UPDATE,
    })
}
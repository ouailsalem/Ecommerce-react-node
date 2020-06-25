import Axios from "axios"
import {
} from "./actionTypes"
import { setAlert } from "./alert"


export const getUser = (userId) => async dispatch => {

    try {
        const res = await Axios.get(`/users/${userId}`)
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data.payload,
            pictures: filtredPictures,
            picturesEdits: manyPics
        })

    } catch (err) {
        // if (err.response.status === 404) {
        //     dispatch(setAlert("المنتج غير موجود", "error", true, 3000))
        //     dispatch({ type: LOAD_ERROR })
        // }
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
        dispatch({ type: GET_USER_ERROR })
    }

}
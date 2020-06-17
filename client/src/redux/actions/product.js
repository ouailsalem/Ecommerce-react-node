import Axios from "axios"
import {
    GET_PRODUCT, LOAD_ERROR
} from "./actionTypes"
import { setAlert } from "./alert"


export const getProduct = (productId) => async dispatch => {

    try {
        const res = await Axios.get(`/products/${productId}`)
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        })

    } catch (err) {
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
        dispatch({ type: LOAD_ERROR })
    }

}
import Axios from "axios"
import {
    ADD_ORDER, ORDER_ERROR, POSTING_ORDER, RESET_ORDER, GET_SINGLE_ORDER_ERROR, GET_SINGLE_ORDER_SUCCESS, GET_SINGLE_ORDER_LOADING, NOT_FOUND
} from "./actionTypes"
import { setAlert } from "./alert"

export const addOrder = (productId, product, quantity, name, phoneNumber, address, wilaya, dayra, refer, userId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = {
        product,
        quantity,
        name,
        phoneNumber,
        address,
        wilaya,
        dayra,
        userId: userId,
    }
    try {
        dispatch({
            type: POSTING_ORDER
        })
        await Axios.post(`/products/order/${productId}/${refer}`, body, config)
        dispatch({
            type: ADD_ORDER,
            posted: true,
            posting: false
        })
        dispatch(setAlert(" تم تقديم طلبك بنجاح سنتصل برك في أقرب وقت", "success", true, 6000))


    } catch (err) {
        if (err.response.status === 404) {
            dispatch(setAlert("المنتج غير موجود", "error", true, 4000))
        } else {
            dispatch(setAlert("هناك مشكلـة ، نرجو المحاولة لاحقا", "error", true, 4000))
        }
        dispatch({
            type: ORDER_ERROR,
            posted: false,
            posting: false
        })
    }
}
export const getOrder = (orderId) => async dispatch => {
    dispatch({
        type: GET_SINGLE_ORDER_LOADING
    })
    try {
        const res = await Axios.get(`/products/orders/all/${orderId}`)

        dispatch({
            type: GET_SINGLE_ORDER_SUCCESS,
            order: res.data,
        })

    } catch (err) {
        if (err.response.status === 404) {
            dispatch(setAlert("الطلب غير موجود", "error", true, 3000))
            dispatch({ type: NOT_FOUND })
        } else {
            dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
            dispatch({ type: GET_SINGLE_ORDER_ERROR })
        }
    }

}
export const resetOrder = () => async dispatch => {
    dispatch({
        type: RESET_ORDER,
    })
}
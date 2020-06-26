import Axios from "axios"
import {
    GET_ORDERS_SUCCESS,
    GET_ORDERS_LOADING,
    GET_ORDERS_ERROR,

    UPDATE_ORDER_LOADING,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,

    REMOVE_ORDER_SUCCESS,
    REMOVE_ORDER_LOADING,
    REMOVE_ORDER_ERROR,

    RESET_ORDER_UPDATE
} from "./actionTypes"
import { setAlert } from "./alert"


//All orders
export const getOrders = () => async dispatch => {

    dispatch({type: GET_ORDERS_LOADING})

    try {
        const res = await Axios.get('/apiv2/products/orders/all')
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
        dispatch({ type: GET_ORDERS_ERROR })
    }

}


//update an order

export const updateOrder = (product, quantity, name, phoneNumber, address, wilaya, dayra, orderId, status) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    
    dispatch({type: UPDATE_ORDER_LOADING })

    const body = {
        product,
        quantity,
        name,
        phoneNumber,
        address,
        wilaya,
        dayra,
        status
    }
    try {
        await Axios.put(`/apiv2/products/orders/all/${orderId}`, body, config)
        dispatch({type: UPDATE_ORDER_SUCCESS})
        dispatch(setAlert("تم تعديل الطلب بنجاح", "success", true, 3000))

    } catch (err) {
        dispatch({type: UPDATE_ORDER_ERROR,})
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}

export const resetOrder = () => async dispatch => {
    dispatch({type: RESET_ORDER_UPDATE})
}

export const deleteOrder = (orderId) => async dispatch => {
    dispatch({type: REMOVE_ORDER_LOADING})
    try {
        await Axios.delete(`/apiv2/products/orders/all/${orderId}`)
        dispatch({ type: REMOVE_ORDER_SUCCESS})
        dispatch(setAlert("تم حذف الـطلب", "success", true, 3000))

    } catch (err) {
        dispatch({type: REMOVE_ORDER_ERROR})
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}


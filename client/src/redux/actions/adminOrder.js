import Axios from "axios"
import { UPDATE_ORDER_SUCCESS, UPDATE_ORDER_ERROR, UPDATE_ORDER_LOADING, REMOVE_ORDER_ERROR, REMOVE_ORDER_SUCCESS, REMOVE_ORDER_LOADING, RESET_ORDER_ADD_UPDATE, GET_ORDER_SUCCESS, GET_ORDER_LOADING, GET_ORDER_ERROR, RESET_ORDER_UPDATE } from "./actionTypes"
import { setAlert } from "./alert"


export const getOrders = () => async dispatch => {

 
    try {
        const res = await Axios.get('/products/orders/all')
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        console.log(err)
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
        dispatch({ type: GET_ORDER_ERROR })
    }

}


// change values
export const updateOrder = (product, quantity, name, phoneNumber,  address, wilaya, dayra,orderId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    dispatch({
        type: UPDATE_ORDER_LOADING,
    })


    const body = {
        product,
        quantity,
        name,
        phoneNumber,
        address,
        wilaya,
        dayra,
    }

    try {
        await Axios.put(`/products/orders/all/${orderId}`, body, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
        })

        dispatch(setAlert("تم تعديل الطلب بنجاح", "success", true, 3000))

    } catch (err) {

        dispatch({
            type: UPDATE_ORDER_ERROR,
        })
        dispatch(setAlert("qsdqdsqdq", "error", true, 3000))
    }

}

export const resetOrder = () => async dispatch => {
    dispatch({
        type: RESET_ORDER_UPDATE,
    })
}

export const deleteOrder = (orderId) => async dispatch => {
    dispatch({
        type: REMOVE_ORDER_LOADING,
    })
    try {
        let ax = await Axios.delete(`/products/orders/all/${orderId}`)
        dispatch({
            type: REMOVE_ORDER_SUCCESS
        })
        console.log(ax)
        dispatch(setAlert("تم حذف الـطلب", "success", true, 3000))

    } catch (err) {

        dispatch({
            type: REMOVE_ORDER_ERROR,
        })
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}


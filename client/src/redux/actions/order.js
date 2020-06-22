import Axios from "axios"
import {
    ADD_ORDER, ORDER_ERROR
} from "./actionTypes"
import { setAlert } from "./alert"

export const addOrder = (productId, product, quantity, name, phoneNumber, address, wilaya, dayra, refer) => async dispatch => {
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
    }
    console.log(body)
    try {
        await Axios.post(`/products/order/${productId}/${refer}`, body, config)
        dispatch({
            type: ADD_ORDER,
        })


    } catch (err) {
        if (err.response.status === 404) {
            dispatch(setAlert("المنتج غير موجود", "error", true, 4000))
        } else {
            dispatch(setAlert("هناك مشكلـة ، نرجو المحاولة لاحقا", "error", true, 4000))
        }
        dispatch({
            type: ORDER_ERROR
        })
    }
}
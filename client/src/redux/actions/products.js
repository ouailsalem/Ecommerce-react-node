import Axios from "axios"
import {
    GET_PRODUCTS, LOAD_ERROR
} from "./actionTypes"
import { setAlert } from "./alert"


// get all products
export const getProducts = () => async dispatch => {

    try {
        const res = await Axios.get('/apiv2/products')
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })

    } catch (err) {
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
        dispatch({ type: LOAD_ERROR })
    }

}

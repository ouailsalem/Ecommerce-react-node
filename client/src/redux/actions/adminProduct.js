import Axios from "axios"
import {
    REMOVE_PRODUCT_SUCCESS, REMOVE_PRODUCT_LOADING, REMOVE_PRODUCT_ERROR, GET_PRODUCTS
} from "./actionTypes"
import { setAlert } from "./alert"


export const removeProduct = (productId) => async dispatch => {
    dispatch({
        type: REMOVE_PRODUCT_LOADING,
        loading: false
    })
    try {
        await Axios.delete(`/products/${productId}`)
        dispatch({
            type: REMOVE_PRODUCT_SUCCESS
        })
        
        dispatch(setAlert("تم حذف المنتج", "success", true, 3000))
        
    } catch (err) {
       
        console.log(err)
        dispatch({
            type: REMOVE_PRODUCT_ERROR,
            loading: false
        })
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}
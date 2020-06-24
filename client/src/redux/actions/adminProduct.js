import Axios from "axios"
import {
    REMOVE_PRODUCT_SUCCESS, REMOVE_PRODUCT_LOADING, REMOVE_PRODUCT_ERROR, GET_PRODUCTS, ADD_PRODUCT_LOADING, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR, RESET_PRODUCT_ADD_STATE
} from "./actionTypes"
import { setAlert } from "./alert"


export const removeProduct = (productId) => async dispatch => {
    dispatch({
        type: REMOVE_PRODUCT_LOADING,
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
        })
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}
export const addProduct = (values) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    dispatch({
        type: ADD_PRODUCT_LOADING,  
    })


    const body={
        name: values.name,
        description: values.description,
        smallDescription: values.smallDescription,
        price: values.price,
        mainPicture: values.mainPicture,
        pictures: `${values.picture1},${values.picture2},${values.picture3},${values.picture4},${values.picture5}`,
        available: true,
    }

    try {
        await Axios.post(`/products/add`, body, config)

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            posted: true
        })

        dispatch(setAlert("تم إضافة المنتج", "success", true, 3000))

    } catch (err) {

        dispatch({
            type: ADD_PRODUCT_ERROR,
        })
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}
export const resetProduct = () => async dispatch => {
    dispatch({
        type: RESET_PRODUCT_ADD_STATE,
    })
}
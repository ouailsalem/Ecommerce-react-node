import Axios from "axios"
import {
    GET_PRODUCT, LOAD_ERROR
} from "./actionTypes"
import { setAlert } from "./alert"


export const getProduct = (productId) => async dispatch => {

    try {
        const res = await Axios.get(`/products/${productId}`)
        console.log(res.data.payload)
        let imgdata = res.data.payload.product.pictures
        let manyPics = imgdata.split(",")
        const pictures = [
            {
                original: manyPics[0],
                thumbnail: manyPics[0],
            },
            {
                original: manyPics[1],
                thumbnail: manyPics[1],
            },
            {
                original: manyPics[2],
                thumbnail: manyPics[2],
            },
        ]
        dispatch({
            type: GET_PRODUCT,
            payload: res.data.payload,
            pictures: pictures
        })

    } catch (err) {
        // if (err.response.status === 404) {
        //     dispatch(setAlert("المنتج غير موجود", "error", true, 3000))
        //     dispatch({ type: LOAD_ERROR })
        // }
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
        dispatch({ type: LOAD_ERROR })
    }

}
import Axios from "axios"
import {
    GET_PRODUCT, LOAD_ERROR, NOT_FOUND
} from "./actionTypes"
import { setAlert } from "./alert"


export const getProduct = (productId) => async dispatch => {

    try {
        const res = await Axios.get(`/products/${productId}`)
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
            {
                original: manyPics[3],
                thumbnail: manyPics[3],
            },
            {
                original: manyPics[4],
                thumbnail: manyPics[4],
            },

        ]

        let filtredPictures = pictures.filter((img) => img.original !== "")

        dispatch({
            type: GET_PRODUCT,
            payload: res.data.payload,
            pictures: filtredPictures,
            picturesEdits: manyPics
        })

    } catch (err) {
        if (err.response.status === 404) {
            dispatch(setAlert("المنتج غير موجود", "error", true, 3000))
            dispatch({ type: NOT_FOUND })
        } else {

            dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
            dispatch({ type: LOAD_ERROR })
        }

    }

}
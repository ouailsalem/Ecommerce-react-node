import Axios from "axios"
import {
    REVIEW_ERROR, ADD_REVIEW
} from "./actionTypes"
import { setAlert } from "./alert"

export const addReview = ({ review, rating, productId }) => async dispatch => {
    console.log(review, rating, productId)

    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = { review, rating }
    try {
        const res = await Axios.post(`/reviews/${productId}`, body, config)
        dispatch({
            type: ADD_REVIEW,
        })

        dispatch(setAlert("تم إضافة تعليقك بنجاح", "success", true, 3000))

    } catch (err) {

        dispatch({
            type: REVIEW_ERROR
        })
        dispatch(setAlert("نرجو المحاولة لاحقا", "success", true, 3000))

    }
}

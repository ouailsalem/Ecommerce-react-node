import Axios from "axios"
import {
    REVIEW_ERROR, ADD_REVIEW, GET_REVIEWS, LOAD_REVIEWS
} from "./actionTypes"
import { setAlert } from "./alert"

export const getReviews = (productId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    try {
        const res = await Axios.get(`/apiv2/reviews/product/${productId}`, config)
        dispatch({
            type: GET_REVIEWS,
            payload: res.data
        })

    } catch (err) {

        dispatch({
            type: REVIEW_ERROR
        })

    }

}
export const addReview = ({ review, rating, productId }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = { review, rating }
    try {
        await Axios.post(`/apiv2/reviews/${productId}`, body, config)

        dispatch({
            type: ADD_REVIEW,
        })
        dispatch({
            type: LOAD_REVIEWS
        })
        setTimeout(() => {

            dispatch(getReviews(productId))
        }, 2000)
        dispatch(setAlert("تم إضافة تعليقك بنجاح", "success", true, 3000))

    } catch (err) {

        dispatch({
            type: REVIEW_ERROR
        })
        dispatch(setAlert("نرجو المحاولة لاحقا", "success", true, 3000))

    }
}

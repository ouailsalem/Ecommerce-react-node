import Axios from "axios"
import {
    REMOVE_REVIEW_LOADING,
    REMOVE_REVIEW_SUCCESS,
    REMOVE_REVIEW_ERROR,
    GET_ALL_REVIEWS_SUCCESS,
    GET_ALL_REVIEWS_ERROR
} from "./actionTypes"
import { setAlert } from "./alert"


export const getReviews = () => async dispatch => {

    try {
        const res = await Axios.get('reviews')
        dispatch({
            type: GET_ALL_REVIEWS_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
        dispatch({ type: GET_ALL_REVIEWS_ERROR })
    }

}
export const removeReview = (reviewId) => async dispatch => {

    dispatch({
        type: REMOVE_REVIEW_LOADING,
    })
    
    try {
        await Axios.delete(`reviews/${reviewId}`)
        dispatch({
            type: REMOVE_REVIEW_SUCCESS
        })
        dispatch(setAlert("تم حذف التعليق", "success", true, 3000))

    } catch (err) {

        dispatch({
            type: REMOVE_REVIEW_ERROR,
        })
        dispatch(setAlert("مشكلـة غير متوقعـة ، حاول لاحقا", "error", true, 3000))
    }

}


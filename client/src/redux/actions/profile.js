import Axios from 'axios'
import { GET_PROFILE } from './actionTypes'

export const getProfile = () => async  dispatch =>{

    try {
        const res = await Axios.get("/profile")
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }

}
import { NOT_FOUND_RESET } from './actionTypes'
export const notFoundReset = () => dispatch => {
    dispatch({
        type: NOT_FOUND_RESET,
    })
  
}
import { combineReducers } from "redux"
import alert from "./alert"
import auth from "./auth"
import products from "./products"
import product from "./product"
import review from "./review"
export default combineReducers({
    alert, auth, products, product, review
})
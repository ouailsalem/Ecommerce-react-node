import { combineReducers } from "redux"
import alert from "./alert"
import auth from "./auth"
import products from "./products"
import product from "./product"
import review from "./review"
import reviews from "./reviews"
import order from "./order"
import profile from "./profile"
import adminProduct from "./adminProduct"
export default combineReducers({
    alert, auth, products, product, review, reviews, order, profile, adminProduct
})
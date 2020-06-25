import { combineReducers } from "redux"
import alert from "./alert"
import auth from "./auth"
import products from "./products"
import product from "./product"
import review from "./review"
import reviews from "./reviews"
import order from "./order"
import user from "./user"
import profile from "./profile"
import adminProduct from "./adminProduct"
import adminReview from "./adminReview"
import adminOrder from "./adminOrder"
import adminUser from "./adminUser"
export default combineReducers({
    alert, auth, products, product, review, reviews, order, user, profile, adminProduct, adminReview, adminOrder, adminUser
})
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    addReviewReducer,
    adminProductReducer,
    adminReviewsReducer,
    productDetailsReducer,
    productsReducer,
} from './reducers/productReducer'
import {
    allUsersReducer,
    userReducer,
    userReducerAdmin,
} from './reducers/userReducer'
import { forgotPasswordReducer } from './reducers/forgotPasswordReducer'
import { cartReducer } from './reducers/cartReducer'
import {
    allOrdersReducer,
    myOrdersReducer,
    orderDetailsReducer,
    orderReducer,
    orderReducerAdmin,
} from './reducers/orderReducer'

const reducers = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    order: orderReducer,
    orders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    addReview: addReviewReducer,
    product: adminProductReducer,
    allOrders: allOrdersReducer,
    orderAdmin: orderReducerAdmin,
    allUsers: allUsersReducer,
    userAdmin: userReducerAdmin,
    adminReviews: adminReviewsReducer,
})

let initialState = {}

const middleware = [thunk]

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store

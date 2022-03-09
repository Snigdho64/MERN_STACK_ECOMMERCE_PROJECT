import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    CLEAR_ERROR,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO,
} from '../constants/cartConstants'

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {},
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return { ...state, error: null }
        case ADD_TO_CART_SUCCESS: {
            return { ...state, cartItems: action.payload }
        }

        case ADD_TO_CART_FAIL:
            return { ...state, error: action.payload }

        case CLEAR_ERROR:
            return { ...state, error: null }

        case REMOVE_FROM_CART:
            return { ...state, cartItems: action.payload }

        case SAVE_SHIPPING_INFO:
            return { ...state, shippingInfo: action.payload }

        default:
            return state
    }
}

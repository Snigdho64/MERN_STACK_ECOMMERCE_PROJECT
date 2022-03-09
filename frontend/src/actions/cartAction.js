import axios from 'axios'
import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    CLEAR_ERROR,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO,
} from '../constants/cartConstants'

export const addToCart =
    (productId, quantity) => async (dispatch, getState) => {
        try {
            dispatch({ type: ADD_TO_CART_REQUEST })
            const { data } = await axios.get(`/api/v1/products/${productId}`)

            const { _id, name, stock, price, images } = data.product

            const image = images[0].url

            const item = { _id, name, stock, price, image, quantity }

            const { cart } = getState()

            const productIdx = cart.cartItems.findIndex(
                (p) => p._id === item._id
            )

            if (productIdx === -1) {
                cart.cartItems.push(item)
            } else {
                cart.cartItems[productIdx] = item
            }

            localStorage.setItem('cartItems', JSON.stringify(cart.cartItems))

            dispatch({
                type: ADD_TO_CART_SUCCESS,
                payload: cart.cartItems,
            })
        } catch (e) {
            console.log(e)
            dispatch({
                type: ADD_TO_CART_FAIL,
                payload: e.response.data.message,
            })
        }
    }

export const clearCartError = async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}

export const removeFromCart = (productId) => async (dispatch, getState) => {
    console.log(productId)
    const { cart } = getState()

    cart.cartItems = cart.cartItems.filter(
        (cartItem) => cartItem._id !== productId
    )

    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems))

    dispatch({ type: REMOVE_FROM_CART, payload: cart.cartItems })
}

export const saveShippingInfo = (shippingData) => async (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_INFO, payload: shippingData })
    localStorage.setItem('shippingInfo', JSON.stringify(shippingData))
}

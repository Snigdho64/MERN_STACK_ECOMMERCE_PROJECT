import {
    CLEAR_ERROR,
    NEW_ORDER_FAIL,
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
} from '../constants/orderConstants'
import axios from 'axios'

export const newOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ORDER_REQUEST })
        const { data } = await axios.post('/api/v1/order/new', orderData)
        dispatch({ type: NEW_ORDER_SUCCESS, payload: data.order })
    } catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.response.message,
        })
    }
}

export const clearError = async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}

export const getMyOrders = async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST })
        const { data } = await axios.get('/api/v1/orders/me')
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getOrderDetails = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/orders/${orderId}`)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getAllOrders = async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST })
        const { data } = await axios.get('/api/v1/admin/orders')
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders })
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const updateOrder = (orderId, orderData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })
        const { data } = await axios.put(
            `/api/v1/admin/orders/${orderId}`,
            orderData
        )
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST })
        const { data } = await axios.delete(`/api/v1/admin/orders/${orderId}`)
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

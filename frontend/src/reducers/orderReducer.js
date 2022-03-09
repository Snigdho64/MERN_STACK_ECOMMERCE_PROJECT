import {
    CLEAR_ERROR,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    NEW_ORDER_FAIL,
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    RESET_ORDER,
} from '../constants/orderConstants'

export const orderReducer = (state = { order: null }, action) => {
    switch (action.type) {
        case NEW_ORDER_REQUEST:
            return {
                ...state.order,
                loading: true,
            }
        case NEW_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            }
        case NEW_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return { ...state, error: null }
        default:
            return state
    }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MY_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            }
        case MY_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return { ...state, error: null }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { order: null }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            }
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return { ...state, error: null }
        default:
            return state
    }
}

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            }
        case ALL_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return { ...state, error: null }
        default:
            return state
    }
}

export const orderReducerAdmin = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state.order,
                loading: true,
            }
        case UPDATE_ORDER_SUCCESS:
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            }
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return { ...state, error: null }
        case RESET_ORDER:
            return {
                loading: false,
                success: null,
                message: null,
            }
        default:
            return state
    }
}

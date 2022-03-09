import {
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_REVIEWS_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    CLEAR_ERROR,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_RESET,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
} from '../constants/productConstants'

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultsPerPage: action.payload.resultsPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload.error,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default: {
            return state
        }
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        case PRODUCT_DETAILS_RESET:
            return {
                loading: false,
                product: {},
                error: null,
            }
        default: {
            return state
        }
    }
}

export const addReviewReducer = (
    state = { success: null, error: null },
    action
) => {
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            }
        case ADD_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload.error,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
                success: null,
            }
        default: {
            return state
        }
    }
}

// --ADMIN--
export const adminProductReducer = (
    state = { product: null, success: null, message: null },
    action
) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_PRODUCT_SUCCESS:
        case DELETE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
                message: action.payload.message,
            }
        case CREATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case CREATE_PRODUCT_RESET:
        case DELETE_PRODUCT_RESET:
        case UPDATE_PRODUCT_RESET:
            return {
                loading: false,
                error: null,
                success: null,
                product: null,
                message: null,
            }
        default: {
            return state
        }
    }
}

export const adminReviewsReducer = (
    state = { success: null, error: null, reviews: [], message: null },
    action
) => {
    switch (action.type) {
        case ALL_REVIEWS_REQUEST:
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            }
        case ALL_REVIEWS_FAIL:
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                reviews: [],
                loading: false,
                error: action.payload.error,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                success: null,
                message: null,
            }
        default: {
            return state
        }
    }
}

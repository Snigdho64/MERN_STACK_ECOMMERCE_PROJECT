import axios from 'axios'
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
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from '../constants/productConstants'

export const getProducts =
    (keyword = '', page = 1, price = [0, 25000], category = '', ratings = 0) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCTS_REQUEST })

            let link = `/api/v1/products/?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            if (category.trim()) {
                link = `/api/v1/products/?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
            }

            const { data } = await axios.get(link)

            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: { error: error.response.data.message },
            })
        }
    }

export const getProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/products/${productId}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: { error: error.response.data.message },
        })
    }
}

export const addReview = (reviweData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_REVIEW_REQUEST })
        const { data } = await axios.post(`/api/v1/review`, reviweData)

        dispatch({
            type: ADD_REVIEW_SUCCESS,
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload: { error: error.response.data.message },
        })
    }
}

export const getAdminProducts = async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/products`)
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: { error: error.response.data.message },
        })
    }
}

export const clearError = async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST })
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(
            `/api/v1/admin/products/new`,
            productData,
            config
        )
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: { error: error.response.data.message },
        })
    }
}

export const updateProduct = (productId, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.put(
            `/api/v1/admin/products/${productId}`,
            productData,
            config
        )
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: { error: error.response.data.message },
        })
    }
}

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(
            `/api/v1/admin/products/${productId}`
        )

        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: { error: error.response.data.message },
        })
    }
}

export const getAllReviews = (productId) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST })

        const { data } = await axios.get(
            `/api/v1/admin/reviews?productId=${productId}`
        )
        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.reviews,
        })
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: { error: error.response.data.message },
        })
    }
}

export const deleteReview = (productId, reviewId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(
            `/api/v1/admin/reviews?productId=${productId}&reviewId=${reviewId}`
        )

        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: { error: error.response.data.message },
        })
    }
}

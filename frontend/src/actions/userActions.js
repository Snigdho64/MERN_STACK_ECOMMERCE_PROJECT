import {
    CLEAR_ERROR,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DELETE_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DELETE_FAIL,
    UPDATE_USER_ROLE_REQUEST,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL,
} from '../constants/userConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { 'content-type': 'application/json' } }

        const { data } = await axios.post(
            '/api/v1/login',
            { email, password },
            config
        )
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

export const clearError = async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}

export const register = (registerData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })

        const config = { headers: { 'content-type': 'application/json' } }

        const { data } = await axios.post(
            '/api/v1/register',
            registerData,
            config
        )

        dispatch({ type: REGISTER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message })
    }
}

export const loadUser = async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
}

export const logoutUser = async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST })

        await axios.get('/api/v1/logout')

        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

export const updateUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })

        const config = { headers: { 'content-type': 'application/json' } }

        const { data } = await axios.put('/api/v1/me/update', userData, config)
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success })
    } catch (e) {
        dispatch({ type: UPDATE_USER_FAIL, payload: e.response.data.message })
    }
}

export const updatePassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const { data } = await axios.put('/api/v1/password/update', userData)
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.message })
    } catch (e) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: e.response.data.message,
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const { data } = await axios.post('/api/v1/password/forgot', { email })
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
    } catch (e) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: e.response.data.message,
        })
    }
}

export const resetPassword = (resetToken, passwordData) => async (dispatch) => {
    try {
        dispatch({ type: PASSWORD_RESET_REQUEST })

        const { data } = await axios.put(
            `/api/v1/password/reset/${resetToken}`,
            passwordData
        )
        dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data.message })
    } catch (e) {
        dispatch({
            type: PASSWORD_RESET_FAIL,
            payload: e.response.data.message,
        })
    }
}

export const getAllUsers = async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message })
    }
}

export const getUserDetails = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/users/${userId}`)

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const updatedUserRole = (userId, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_ROLE_REQUEST })

        const { data } = await axios.put(
            `/api/v1/admin/users/${userId}`,
            userData
        )

        dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_ROLE_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/users/${userId}`)

        dispatch({ type: USER_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response.data.message,
        })
    }
}

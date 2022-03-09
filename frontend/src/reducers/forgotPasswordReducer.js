import {
    CLEAR_ERROR,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_RESET,
    FORGOT_PASSWORD_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    UPDATE_PASSWORD_RESET,
} from '../constants/userConstants'

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return { ...state, loading: true }

        case FORGOT_PASSWORD_SUCCESS:
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
                success: true,
            }

        case FORGOT_PASSWORD_FAIL:
        case PASSWORD_RESET_FAIL:
            return { ...state, loading: false, error: action.payload }

        case UPDATE_PASSWORD_RESET:
            return { ...state, loading: false, success: false }

        case PASSWORD_RESET_REQUEST:
            return { ...state, loading: true }

        case FORGOT_PASSWORD_RESET:
            return {
                ...state,
                message: null,
                success: false,
            }

        case CLEAR_ERROR:
            return { ...state, error: null }
        default:
            return state
    }
}

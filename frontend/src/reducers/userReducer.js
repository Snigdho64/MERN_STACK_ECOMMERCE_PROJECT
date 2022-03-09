import {
    CLEAR_ERROR,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DELETE_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DELETE_FAIL,
    USER_RESET,
    UPDATE_USER_ROLE_REQUEST,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL,
} from '../constants/userConstants'

export const userReducer = (
    state = { user: null, isAuthenticated: false },
    action
) => {
    switch (action.type) {
        // ALL REQUEST CASES
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
        case UPDATE_USER_REQUEST:
        case LOGOUT_REQUEST:
        case UPDATE_PASSWORD_REQUEST: {
            return { ...state, loading: true }
        }

        //ALL SUCCESS CASES
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        }
        case UPDATE_USER_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS: {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        }

        // ALL FAIL CASES
        case LOGIN_FAIL:
        case REGISTER_FAIL: {
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
                error: action.payload,
            }
        }
        case LOAD_USER_FAIL:
            return { ...state, loading: false }

        case LOGOUT_FAIL:
        case UPDATE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        case UPDATE_USER_RESET:
        case UPDATE_PASSWORD_RESET: {
            return {
                ...state,
                isUpdated: false,
            }
        }
        case CLEAR_ERROR: {
            return {
                ...state,
                error: null,
            }
        }
        default: {
            return state
        }
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            }

        case ALL_USERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const userReducerAdmin = (
    state = { user: {}, success: null, message: null },
    action
) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
        case USER_DELETE_REQUEST:
        case UPDATE_USER_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            }

        case USER_DELETE_SUCCESS:
        case UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            }

        case USER_DETAILS_FAIL:
        case USER_DELETE_FAIL:
        case UPDATE_USER_ROLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case USER_RESET:
            return {
                ...state,
                success: null,
                message: null,
            }
        default:
            return state
    }
}

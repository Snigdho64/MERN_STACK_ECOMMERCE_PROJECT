import { MailTwoTone } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearError, forgotPassword } from '../../actions/userActions'
import { FORGOT_PASSWORD_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import './ForgotPassword.css'

const ForgotPassword = () => {
    const { success, loading, message, error } = useSelector((state) => {
        return state.forgotPassword
    })

    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    const forgotPasswordSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (success) {
            alert.success(message)
            dispatch({ type: FORGOT_PASSWORD_RESET })
            // MIGHT LOG USER IN DIRECTLY...
        }
    }, [success, alert, error, navigate, dispatch, message])

    return loading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Password Reset" />
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                    <h2>Forgot Password Reset</h2>
                    <form
                        className="forgotPasswordForm"
                        encType="multipart/form-data"
                        onSubmit={forgotPasswordSubmit}
                    >
                        <div>
                            <MailTwoTone />
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Send Email"
                            className="forgotPasswordButton"
                            disabled={loading ? true : false}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword

import { LockClockTwoTone, VpnKeyOffTwoTone } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearError, resetPassword } from '../../actions/userActions'
import { FORGOT_PASSWORD_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import './ResetPassword.css'

const ResetPassword = () => {
    const { success, loading, message, error } = useSelector(
        (state) => state.forgotPassword
    )

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { resetToken } = useParams()

    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('password', password)
        myForm.set('confirmPassword', confirmPassword)
        dispatch(resetPassword(resetToken, myForm))
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
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [success, alert, error, navigate, dispatch, message])

    return loading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Password Reset" />
            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                    <h2>Reset Password</h2>
                    <form
                        className="resetPasswordForm"
                        encType="multipart/form-data"
                        onSubmit={resetPasswordSubmit}
                    >
                        <div>
                            <VpnKeyOffTwoTone />
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <LockClockTwoTone />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <input
                            type="submit"
                            value="Update Password"
                            className="resetPasswordButton"
                            disabled={loading ? true : false}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword

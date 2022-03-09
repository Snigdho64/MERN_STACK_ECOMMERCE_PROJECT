import {
    LockClockTwoTone,
    LockOpen,
    VpnKeyOffTwoTone,
} from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearError, loadUser, updatePassword } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import './UpdatePassword.css'

const UpdatePassword = () => {
    const { user, isAuthenticated, loading, isUpdated, error } = useSelector(
        (state) => state.user
    )

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/login')
        }
    }, [dispatch, isAuthenticated, user, navigate])

    const updatePasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('oldPassword', oldPassword)
        myForm.set('newPassword', newPassword)
        myForm.set('confirmPassword', confirmPassword)
        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (isUpdated) {
            alert.success('Password Updated Successfully')
            dispatch({ type: UPDATE_PASSWORD_RESET })
            dispatch(loadUser)
            setTimeout(() => {
                navigate('/account')
            }, 3000)
        }
    }, [isUpdated, alert, error, navigate, dispatch])

    return loading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Update Password" />
            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                    <h2>Update Password</h2>
                    <form
                        className="updatePasswordForm"
                        encType="multipart/form-data"
                        onSubmit={updatePasswordSubmit}
                    >
                        <div className="loginPassword">
                            <LockOpen />
                            <input
                                type="password"
                                placeholder="Old Password"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <VpnKeyOffTwoTone />
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
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
                            className="updatePasswordButton"
                            disabled={loading ? true : false}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdatePassword

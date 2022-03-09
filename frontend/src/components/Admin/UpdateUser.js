import {
    MailOutlineTwoTone,
    PersonAddAlt1TwoTone,
    VerifiedTwoTone,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    clearError,
    updatedUserRole,
    getUserDetails,
} from '../../actions/userActions'
import { USER_RESET } from '../../constants/userConstants'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import './CreateProduct.css'

const UpdateUser = () => {
    const dispatch = useDispatch()

    const alert = useAlert()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const { loading, success, error, user, message } = useSelector(
        (state) => state.userAdmin
    )
    const { userId } = useParams()

    useEffect(() => {
        if (!user || Object.keys(user).length === 0 || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            const { name, email, role } = user
            setName(name)
            setEmail(email)
            setRole(role)
        }

        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (success) {
            alert.success(message)
            dispatch({ type: USER_RESET })
            navigate('/admin/users')
        }
    }, [dispatch, alert, error, success, message, navigate, user, userId])

    const updateUserRole = (e) => {
        e.preventDefault()
        const userData = {
            name,
            email,
            role,
        }
        dispatch(updatedUserRole(userId, userData))
    }

    return (
        <>
            <Metadata title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="createProductContainer">
                    <form
                        className="createProductForm"
                        onSubmit={updateUserRole}
                    >
                        <h1>Update User</h1>
                        <div>
                            <PersonAddAlt1TwoTone />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailOutlineTwoTone />
                            <input
                                type="email"
                                placeholder="Product Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <VerifiedTwoTone />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Choose Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <Button
                            id="createProductButton"
                            type="submit"
                            disabled={loading ? true : false || role === ''}
                        >
                            Update User
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateUser

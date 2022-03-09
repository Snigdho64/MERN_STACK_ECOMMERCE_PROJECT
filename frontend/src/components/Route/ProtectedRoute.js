import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loadUser } from '../../actions/userActions'

const ProtectedRoute = ({ element, admin }) => {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.user)

    useEffect(() => {
        if (!user || Object.keys(user).length === 0) dispatch(loadUser)
    }, [dispatch, user])

    let isVerified = isAuthenticated

    // ADMIN ROUTES PROTECTION
    if (admin && user) {
        isVerified = isAuthenticated && user.role === 'admin'
    }

    return isVerified ? element : <Navigate to={'/login'} />
}

export default ProtectedRoute

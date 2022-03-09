import { Face, MailOutline } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearError, loadUser, updateUser } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader/Loader'
import './UpdateProfile.css'

const UpdateProfile = () => {
    const { user, isAuthenticated, loading, isUpdated, error } = useSelector(
        (state) => state.user
    )

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [avatar, setAvatar] = useState(user.avatar.url)
    const [avatarPreview, setAvatarPreview] = useState(user.avatar?.url)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/login')
        }
    }, [dispatch, isAuthenticated, user, navigate])

    const updateProfileSubmit = (e) => {
        e.preventDefault()
        // const myForm = new FormData()
        // myForm.set('name', name)
        // myForm.set('email', email)
        // myForm.set('avatar', avatar)
        dispatch(updateUser({ name, email, avatar }))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (isUpdated) {
            alert.success('Profile Updated Successfully')
            dispatch({ type: UPDATE_USER_RESET })
            dispatch(loadUser)
            setTimeout(() => {
                navigate('/account')
            }, 4000)
        }
    }, [isUpdated, alert, error, navigate, dispatch])

    const updateImage = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    <h2>Update Profile</h2>
                    <form
                        className="updateProfileForm"
                        encType="multipart/form-data"
                        onSubmit={updateProfileSubmit}
                    >
                        <div className="updateProfileName">
                            <Face />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileEmail">
                            <MailOutline />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="updateProfileImage">
                            <img src={avatarPreview} alt="Avvatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image"
                                onChange={updateImage}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Update Profile"
                            className="updateProfileButton"
                            disabled={loading ? true : false}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile

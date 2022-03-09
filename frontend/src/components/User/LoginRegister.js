import React, { useEffect, useRef, useState } from 'react'
import { Face, LockOpen, MailOutline } from '@mui/icons-material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './LoginRegister.css'
import profilePic from '../../images/Profile.png'
import { clearError, login, register } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/Loader'

const LoginRegister = () => {
    const switcherTab = useRef(null)
    const loginTab = useRef(null)
    const registerTab = useRef(null)

    const dispatch = useDispatch()

    const { user, isAuthenticated, loading, error } = useSelector(
        (state) => state.user
    )

    const alert = useAlert()

    const navigate = useNavigate()

    const location = useLocation()

    const redirectTo = location.state === 'shipping' ? '/shipping' : '/account'

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [avatar, setAvatar] = useState()

    const [avatarPreview, setAvatarPreview] = useState(profilePic)

    const { name, email, password } = registerData

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (isAuthenticated && user) {
            navigate(redirectTo)
        }
    }, [dispatch, error, isAuthenticated, navigate, user, alert, redirectTo])

    const switchTabs = (e, tab = 'login') => {
        if (tab === 'login') {
            switcherTab.current.classList.add('shiftToNeutral')
            switcherTab.current.classList.remove('shiftToRight')

            registerTab.current.classList.remove('shiftToNeutralForm')
            loginTab.current.classList.remove('shiftToLeft')
        }
        if (tab === 'register') {
            switcherTab.current.classList.add('shiftToRight')
            // switcherTab.current.classList.add('register')
            switcherTab.current.classList.remove('shiftToNeutral')

            registerTab.current.classList.add('shiftToNeutralForm')
            loginTab.current.classList.add('shiftToLeft')
        }
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        // const myForm = new FormData()
        // myForm.set('name', name)
        // myForm.set('email', email)
        // myForm.set('password', password)
        // myForm.set('avatar', avatar)
        const userData = { name, email, password, avatar }
        dispatch(register(userData))
    }

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        } else {
            setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
            })
        }
    }

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="login-register">
                <div className="login-register-box">
                    <div className="login-register-toggle">
                        <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, 'register')}>
                            REGISTER
                        </p>
                    </div>
                    <button ref={switcherTab}></button>
                    <form
                        className="loginForm"
                        ref={loginTab}
                        onSubmit={loginSubmit}
                    >
                        <div className="loginEmail">
                            <MailOutline />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpen />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) =>
                                    setLoginPassword(e.target.value)
                                }
                            />
                        </div>
                        <Link to="/password/forgot">Forgot Password</Link>
                        <input
                            type="submit"
                            value="login"
                            className="loginButton"
                        />
                    </form>
                    <form
                        className="registerForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="registerName">
                            <Face />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="registerEmail">
                            <MailOutline />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                required
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="registerPassword">
                            <LockOpen />
                            <input
                                type="password"
                                placeholder="Passsword"
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Register"
                            className="registerButton"
                            disabled={loading ? true : false}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginRegister

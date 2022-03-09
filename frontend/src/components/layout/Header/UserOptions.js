import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { useState } from 'react'
import {
    Dashboard,
    ListAltTwoTone,
    LogoutTwoTone,
    ShoppingCartTwoTone,
} from '@mui/icons-material'
import { ImUser } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../actions/userActions'
import { useAlert } from 'react-alert'
import { Backdrop, Badge } from '@mui/material'
import profilePic from '../../../images/Profile.png'
import './UserOptions.css'

export default function UserOptions({ user }) {
    const { cartItems } = useSelector((state) => state.cart)

    const actions = [
        { icon: <ImUser size={20} />, name: 'Account' },
        {
            icon: (
                <Badge
                    badgeContent={cartItems.length}
                    color="primary"
                    size={24}
                >
                    <ShoppingCartTwoTone />
                </Badge>
            ),
            name: 'Cart',
        },
        { icon: <ListAltTwoTone />, name: 'Orders' },
        { icon: <LogoutTwoTone />, name: 'Logout' },
    ]
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const alert = useAlert()

    if (user.role === 'admin') {
        actions.unshift({ icon: <Dashboard />, name: 'Dashboard' })
    }

    const handleAction = (name) => {
        if (name.toLowerCase() === 'logout') {
            dispatch(logoutUser)
            alert.success('Logged Out Successfully')
            return navigate('/')
        }
        if (name.toLowerCase() === 'dashboard') {
            return navigate('/admin/dashboard')
        }
        navigate(`/${name.toLowerCase()}`)
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: 10 }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{
                    position: 'fixed',
                    top: '2vmax',
                    right: '2vmax',
                    margin: 0,
                    padding: 0,
                    objectFit: 'center',
                    accentColor: 'black',
                    stopColor: 'red',
                }}
                style={{ zIndex: 11 }}
                icon={
                    <img
                        className="userImage"
                        src={user.avatar.url}
                        alt={user.name}
                        onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = profilePic
                        }}
                    />
                }
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                tooltipTitle="User Options"
                title="User Options"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        tooltipPlacement="left"
                        onClick={handleAction.bind(null, action.name)}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

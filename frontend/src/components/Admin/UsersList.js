import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import './ProductsList.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import { clearError, deleteUser, getAllUsers } from '../../actions/userActions'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import { USER_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader/Loader'

const UsersList = () => {
    const dispatch = useDispatch()
    const { loading, users, error } = useSelector((state) => state.allUsers)
    const alert = useAlert()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getAllUsers)
    }, [error, alert, dispatch])

    const {
        success,
        error: deleteError,
        message,
    } = useSelector((state) => state.userAdmin)

    const deleteUserHandle = (userId) => {
        dispatch(deleteUser(userId))
    }

    useEffect(() => {
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError)
        }
        if (success) {
            alert.success(message)
        }
        dispatch({ type: USER_RESET })
    }, [deleteError, success, message, alert, dispatch])

    const columns = [
        {
            field: 'id',
            headerName: 'User ID',
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: 'name',
            headerName: 'User Name',
            minWidth: 250,
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 250,
            flex: 0.5,
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/users/${params.row.id}`}>
                            <Edit />
                        </Link>
                        <Button
                            onClick={deleteUserHandle.bind(this, params.row.id)}
                        >
                            <Delete />
                        </Button>
                    </>
                )
            },
        },
    ]

    const rows = []

    users &&
        users.forEach((user) => {
            const { _id: id, name, email, role } = user
            rows.push({ id, name, email, role })
        })

    return (
        <>
            <Metadata title="Users ADMIN" />
            <div className="dashboard">
                <Sidebar />
                {loading ? (
                    <Loader />
                ) : (
                    <div className="productsListContainer">
                        <h1>ALL USERS</h1>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productsListTable"
                            autoHeight
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default UsersList

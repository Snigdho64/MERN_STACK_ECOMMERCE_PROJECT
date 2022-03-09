import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import './ProductsList.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import {
    clearError,
    deleteOrder,
    getAllOrders,
} from '../../actions/orderActions'
import { RESET_ORDER } from '../../constants/orderConstants'
import Loader from '../layout/Loader/Loader'

const OrdersList = () => {
    const dispatch = useDispatch()
    const { loading, orders, error } = useSelector((state) => state.allOrders)
    const alert = useAlert()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getAllOrders)
    }, [error, alert, dispatch])

    const {
        success,
        error: deleteError,
        message,
    } = useSelector((state) => state.orderAdmin)

    const deleteOrderHandle = (orderId) => {
        dispatch(deleteOrder(orderId))
    }

    useEffect(() => {
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError)
        }
        if (success) {
            alert.success(message)
        }
        dispatch({ type: RESET_ORDER })
    }, [deleteError, success, message, alert, dispatch])

    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            width: 150,
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Order Status',
            width: 150,
            flex: 0.5,
            cellClassName: (params) =>
                params.row.status === 'delievered' ? 'greenColor' : 'redColor',
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            width: 150,
            flex: 0.3,
        },
        {
            field: 'amount',
            headerName: 'amount',
            type: 'number',
            width: 2700,
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
                        <Link to={`/admin/orders/${params.row.id}`}>
                            <Edit />
                        </Link>
                        <Button
                            onClick={deleteOrderHandle.bind(
                                this,
                                params.row.id
                            )}
                        >
                            <Delete />
                        </Button>
                    </>
                )
            },
        },
    ]

    const rows = []

    orders &&
        orders.map((order) => {
            const { _id, orderItems, totalPrice, orderStatus } = order
            return rows.push({
                id: _id,
                status: orderStatus,
                itemsQty: orderItems.length,
                amount: totalPrice,
            })
        })

    return (
        <>
            <Metadata title="Products ADMIN" />
            <div className="dashboard">
                <Sidebar />
                {loading ? (
                    <Loader />
                ) : (
                    <div className="productsListContainer">
                        <h1>ALL ORDERS</h1>
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

export default OrdersList

import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getMyOrders } from '../../actions/orderActions'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { IosShareRounded } from '@mui/icons-material'
import './Orders.css'

const Orders = () => {
    const { orders, loading, error } = useSelector((state) => state.orders)
    const {
        user: { name },
    } = useSelector((state) => state.user)
    const alert = useAlert()
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getMyOrders)
    }, [error, alert, dispatch])

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
                params.getValue(params.id, 'status') === 'delievered'
                    ? 'greenColor'
                    : 'redColor',
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
            field: 'actons',
            headerName: 'Actions',
            type: 'number',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Link to={`/orders/${params.getValue(params.id, 'id')}`}>
                    <IosShareRounded />
                </Link>
            ),
        },
    ]

    const rows = []
    orders &&
        orders.forEach((order) => {
            const { _id, orderItems, totalPrice, orderStatus } = order
            rows.push({
                id: _id,
                status: orderStatus,
                itemsQty: orderItems.length,
                amount: totalPrice,
            })
        })

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="ordersPage">
                <Metadata title="My Orders" />
                <div className="ordersContainer">
                    <h2 className="ordersHeading">{name}'s Order</h2>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        // rowsPerPageOptions={[5]}
                        autoPageSize
                        // checkboxSelection
                        disableSelectionOnClick
                        autoHeight
                        className="myOrdersGrid"
                    />
                </div>
            </div>
        </>
    )
}

export default Orders

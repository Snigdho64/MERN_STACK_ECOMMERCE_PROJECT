import { AccountTreeTwoTone } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    clearError,
    updateOrder,
    getOrderDetails,
} from '../../actions/orderActions'
import { RESET_ORDER } from '../../constants/orderConstants'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader/Loader'
import '../Orders/OrderDetails.css'
import './UpdateOrder.css'

const UpdateOrder = () => {
    const dispatch = useDispatch()

    const { loading, success, error, message } = useSelector(
        (state) => state.orderAdmin
    )

    const {
        loading: orderLoading,
        error: orderError,
        order,
    } = useSelector((state) => state.orderDetails)

    const alert = useAlert()
    const navigate = useNavigate()
    const { orderId } = useParams()

    useEffect(() => {
        // GET THE order DETAILS
        if (
            !order ||
            order._id !== orderId ||
            Object.keys(order).length === 0
        ) {
            dispatch(getOrderDetails(orderId))
        } else {
        }
        if (orderError) {
            alert.error(orderError)
            dispatch(clearError)
        }
    }, [dispatch, orderId, alert, orderError, order])

    useEffect(() => {
        // UPDATE THE Order status
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (success) {
            alert.success(message)
            dispatch({ type: RESET_ORDER })
            navigate('/admin/orders')
        }
    }, [error, success, message, alert, dispatch, navigate])

    const [status, setStatus] = useState('')

    const updateOrderHandler = (e) => {
        e.preventDefault()

        dispatch(updateOrder(orderId, { status }))
    }

    if (!order || Object.keys(order).length === 0) return <Loader />

    const {
        shippingInfo: { address, city, state, country, pinCode, phoneNo },
        paymentInfo,
        user: { name, email },
        orderItems,
        orderStatus,
        totalPrice,
    } = order

    const fullAddress = `${address}, ${city},- ${pinCode}, ${state}, ${country}`

    return orderLoading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Update Order" />
            <div className="dashboard">
                <Sidebar />
                <div
                    className="orderDetailsContainer"
                    style={{ paddingLeft: 0, justifyContent: 'center' }}
                >
                    <div className="orderDetailsBox">
                        <div className="shippingAddress">
                            <h2>Shipping Info</h2>
                            <div>
                                <p>Name</p>
                                <span>{name}</span>
                            </div>
                            <div>
                                <p>Phone No.</p>
                                <span>{phoneNo}</span>
                            </div>
                            <div>
                                <p>Address</p>
                                <span>{fullAddress}</span>
                            </div>
                            <div>
                                <p>Email</p>
                                <span>{email}</span>
                            </div>
                        </div>
                        <h2>Order Items</h2>
                        <div className="orderItems">
                            {orderItems &&
                                orderItems.map((orderItem) => (
                                    <div key={orderItem._id}>
                                        <img
                                            src={orderItem.image}
                                            alt={orderItem.name}
                                        />
                                        <Link to={`/products/${orderItem._id}`}>
                                            {orderItem.name}
                                        </Link>
                                        <span>
                                            <p>Rs.{orderItem.price}</p>X
                                            <p>{orderItem.quantity}</p>
                                        </span>
                                    </div>
                                ))}
                        </div>
                        <div
                            className={
                                paymentInfo.status === 'succeeded'
                                    ? 'paymentDetails paid'
                                    : 'paymentDetails notPaid'
                            }
                        >
                            <h2>Payment Details</h2>
                            <p>
                                Total Amount : <span>{totalPrice}</span>
                            </p>
                            <p>
                                {paymentInfo.status === 'succeeded'
                                    ? 'PAID'
                                    : 'NOT PAID'}
                            </p>
                        </div>
                    </div>
                    <div className="updateOrderContainer">
                        {orderStatus !== 'delievered' && (
                            <form
                                className="updateOrderForm"
                                onSubmit={updateOrderHandler}
                            >
                                <h1>Update Order</h1>

                                <div>
                                    <AccountTreeTwoTone />
                                    <select
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <option value="">Update Status</option>
                                        {orderStatus === 'processing' && (
                                            <option value="shipped">
                                                Shipped
                                            </option>
                                        )}
                                        {orderStatus === 'shipped' && (
                                            <option value="delievered">
                                                Delievered
                                            </option>
                                        )}
                                    </select>
                                </div>

                                <Button
                                    id="updateOrderButton"
                                    type="submit"
                                    disabled={
                                        loading ? true : false || status === ''
                                    }
                                >
                                    Update
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateOrder

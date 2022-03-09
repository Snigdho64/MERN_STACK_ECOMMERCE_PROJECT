import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { clearError, getOrderDetails } from '../../actions/orderActions'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import './OrderDetails.css'

const OrderDetails = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { orderId } = useParams()

    const { order, loading, error } = useSelector((state) => state.orderDetails)
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getOrderDetails(orderId))
    }, [dispatch, alert, error, orderId])


    if (loading) return <Loader />

    if (!order) return <p>No Order Found</p>

    const {
        shippingInfo: { address, city, state, country, pinCode, phoneNo },
        paymentInfo,
        user: { name, email },
        orderItems,
        totalPrice,
    } = order
    const fullAddress = `${address}, ${city},- ${pinCode}, ${state}, ${country}`

    return loading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Order Details" />
            <div className="orderDetailsContainer">
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
            </div>
        </>
    )
}

export default OrderDetails

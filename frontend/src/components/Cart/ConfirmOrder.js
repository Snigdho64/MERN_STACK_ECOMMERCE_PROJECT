import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata'
import CheckoutSteps from './CheckoutSteps'
import './ConfirmOrder.css'

const ConfirmOrder = () => {
    const { user, cart } = useSelector((state) => state)
    const navigate = useNavigate()

    const { name, email } = user
    const {
        cartItems,
        shippingInfo: { country, state, city, pinCode, address, phoneNo },
    } = cart

    const fullAddress = `${address}, ${city},- ${pinCode}, ${state}, ${country}`

    const subTotal = cartItems.reduce((p, c) => c.quantity * c.price + p, 0)

    const tax = subTotal * 0.18

    const shippingCharge = subTotal > 2000 ? 0 : 200

    const totalPrice = subTotal + tax + shippingCharge

    const confirmOrder = () => {
        const orderInfo = {
            total: totalPrice,
            subTotal,
            tax,
            shippingCharge,
            address: fullAddress,
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo))
        navigate('/payment/process')
    }

    return (
        <>
            <Metadata title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderContainer">
                <div className="confirmOrderBox">
                    <div className="confirmShippingAddress">
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
                    <h2>Cart Items</h2>
                    <div className="confirmCartItems">
                        {cartItems.map((cartItem) => (
                            <div key={cartItem._id}>
                                <img src={cartItem.image} alt={cartItem.name} />
                                <Link to={`/products/${cartItem._id}`}>
                                    {cartItem.name}
                                </Link>
                                <span>
                                    <p>Rs.{cartItem.price}</p>X
                                    <p>{cartItem.quantity}</p>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="confirmOrderSummary">
                    <h2>Order Summary</h2>
                    <div>
                        <div>
                            <p>SubTotal :</p>
                            <span>{subTotal}</span>
                        </div>
                        <div>
                            <p>Tax :</p>
                            <span>{tax}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>{shippingCharge}</span>
                        </div>
                        <div>
                            <p>Total :</p>
                            <span>{totalPrice}</span>
                        </div>
                    </div>
                    <button
                        className="confirmOrderButton"
                        onClick={confirmOrder}
                    >
                        Proceed To Payment
                    </button>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder

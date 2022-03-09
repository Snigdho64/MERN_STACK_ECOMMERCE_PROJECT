import { CreditCardTwoTone, Event, VpnKey } from '@mui/icons-material'
import React, { useEffect, useRef } from 'react'
import Metadata from '../layout/Metadata'
import CheckoutSteps from './CheckoutSteps'
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js'
import './Payment.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { clearError, newOrder } from '../../actions/orderActions'

const Payment = () => {
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef(null)
    const dispatch = useDispatch()
    const alert = useAlert()
    const { user, cart } = useSelector((state) => state)
    const navigate = useNavigate()

    const {
        user: { name, email },
    } = user
    const { shippingInfo, cartItems } = cart

    const { address, city, state, country, pinCode, phoneNo } = shippingInfo

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const { total, subTotal, shippingCharge, tax } = orderInfo

    const paymentData = { amount: Math.round(orderInfo.total * 100) }

    const orderItems = cartItems.map((item) => {
        const { name, price, quantity, image } = item
        const product = item._id
        return { name, price, image, quantity, product }
    })

    const orderData = {
        shippingInfo,
        orderItems,
        itemPrice: subTotal,
        shippingPrice: shippingCharge,
        taxPrice: tax,
        totalPrice: total,
    }

    const handlePayment = async (e) => {
        e.preventDefault()
        payBtn.current.disabled = true
        try {
            const { data } = await axios.post(
                '/api/v1/payment/process',
                paymentData
            )

            if (!stripe || !elements) return

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name,
                        email,
                        phone: phoneNo,
                        address: {
                            line1: address,
                            city,
                            state,
                            country,
                            postal_code: pinCode,
                        },
                    },
                },
            })
            if (result.error) {
                payBtn.current.disabled = false
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    const { id, status } = result.paymentIntent
                    orderData.paymentInfo = {
                        id,
                        status,
                    }
                    // SEND ORDER DATA TO BACKEND
                    dispatch(newOrder(orderData))
                    alert.success('Payment Successfully')
                    navigate('/payment/success')
                } else {
                    alert.error('There was an issue while processing!')
                }
            }
        } catch (err) {
            payBtn.current.disable = false
            alert.error(err.response.data.message)
        }
    }

    const { error, order } = useSelector((state) => state.order)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (order) {
            navigate('/payment/success')
        }
    }, [dispatch, alert, error, order, navigate])

    return (
        <>
            <Metadata title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={handlePayment}>
                    <h2>Card Info</h2>
                    <div>
                        <CreditCardTwoTone />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <Event />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>
                    <input type="submit" value={'Pay'} ref={payBtn} />
                </form>
            </div>
        </>
    )
}

export default Payment

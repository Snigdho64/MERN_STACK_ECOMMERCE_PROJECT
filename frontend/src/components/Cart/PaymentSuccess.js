import { CheckBoxRounded } from '@mui/icons-material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import CheckoutSteps from './CheckoutSteps'
import './PaymentSuccess.css'

const PaymentSuccess = () => {
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.order)

    return loading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Success" />
            <CheckoutSteps activeStep={3} />
            <div className="paymentSuccessPage">
                <CheckBoxRounded />
                <h2>Your Order Has Been Placed Successfully</h2>
                <button onClick={navigate('/orders')}>View Your Orders</button>
            </div>
        </>
    )
}

export default PaymentSuccess

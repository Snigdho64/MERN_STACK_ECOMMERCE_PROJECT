import {
    AccountCircleTwoTone,
    LibraryAddTwoTone,
    LocalShippingTwoTone,
} from '@mui/icons-material'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import './CheckoutSteps.css'

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingTwoTone />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddTwoTone />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountCircleTwoTone />,
        },
    ]

    const stepStyles = {
        boxSizing: 'border-box',
    }

    return (
        <>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                style={stepStyles}
            >
                {steps.map((step, idx) => (
                    <Step key={idx}>
                        <StepLabel icon={step.icon}>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckoutSteps

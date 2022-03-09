const catchAsyncError = require('../middleware/asyncErrorHandler')
const Stripe = require('stripe')

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
    const paymentIntent = await stripe.paymentIntents.create({
        currency: 'inr',
        amount: req.body.amount,
        metadata: { company: 'E-Commerce' },
    })

    res.status(201).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
    })
})

exports.sendApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY })
})

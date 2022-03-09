const Product = require('../models/Product')
const ErrorHandler = require('../utils/errorhandler')
const asyncError = require('../middleware/asyncErrorHandler')
const Order = require('../models/Order')

exports.createOrder = asyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    })

    return res
        .status(201)
        .json({ success: true, message: `Order created successfully`, order })
})

exports.getSingleOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.orderId).populate(
        'user',
        'name email'
    )

    if (!order) return next(new ErrorHandler('Order not found', 404))

    return res.status(200).json({ success: true, order })
})

exports.getUserOrders = asyncError(async (req, res, next) => {
    console.log(req.user._id)
    const orders = await Order.find({ user: req.user._id })
    return res.status(200).json({ success: true, orders })
})

//GET ALL ORDERS --ADMIN--
exports.getAllOrders = asyncError(async (req, res, next) => {
    const orders = await Order.find()

    const totalAmount = orders.reduce((p, c) => c.totalPrice + p, (p = 0))

    return res.status(200).json({ success: true, totalAmount, orders })
})

//UPDATE ORDER STATUS -ADMIN--
exports.updateOrderStatus = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.orderId)

    if (!order) return next(new ErrorHandler('Order not found', 404))

    if (order.orderStatus.toLowerCase() === 'delievered')
        return next(new ErrorHandler('Cannot update delievered order', 401))

    order.orderStatus = req.body.status.toLowerCase()

    if (order.orderStatus === 'shipped') {
        order.orderItems.forEach(async (ord) => {
            await updateStock(ord.product, ord.quantity)
        })
    }

    if (order.status === 'delievered') {
        order.delieveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    return res
        .status(201)
        .json({ success: true, message: 'Order status updated successfully' })
})

// DELETE AN ORDER --ADMIN--
exports.deleteOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.orderId)

    if (!order) return next(new ErrorHandler('Order not found', 404))

    await order.remove()

    res.status(201).json({
        success: true,
        message: 'Order deleted Successfully',
    })
})

async function updateStock(productId, quantity) {
    const product = await Product.findById(productId)
    product.stock -= quantity
    await product.save({ validateBeforeSave: false })
}

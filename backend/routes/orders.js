const {
    createOrder,
    getSingleOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orders')
const { authenticateUser, authorizeRoles } = require('../middleware/auth')

const router = require('express').Router()

router.route('/order/new').post(authenticateUser, createOrder)

router.route('/orders/me').get(authenticateUser, getUserOrders)

router.route('/orders/:orderId').get(authenticateUser, getSingleOrder)

router
    .route('/admin/orders')
    .get(authenticateUser, authorizeRoles('admin'), getAllOrders)

router
    .route('/admin/orders/:orderId')
    .put(authenticateUser, authorizeRoles('admin'), updateOrderStatus)
    .delete(authenticateUser, authorizeRoles('admin'), deleteOrder)

module.exports = router

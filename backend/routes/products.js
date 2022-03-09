const {
    getAllProducts,
    createNewProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    addReview,
    getAllReviews,
    deleteReview,
    getAdminProducts,
} = require('../controllers/products')
const { authenticateUser, authorizeRoles } = require('../middleware/auth')

const router = require('express').Router()

router
    .route('/admin/products')
    .get(authenticateUser, authorizeRoles('admin'), getAdminProducts)

router
    .route('/admin/products/new')
    .post(authenticateUser, authorizeRoles('admin'), createNewProduct)

router
    .route('/admin/products/:productId')
    .put(authenticateUser, authorizeRoles('admin'), updateProduct)
    .delete(authenticateUser, authorizeRoles('admin'), deleteProduct)

router.route('/products').get(getAllProducts)

router.route('/products/:productId').get(getProductDetails)

router.route('/review').post(authenticateUser, addReview)

router
    .route('/admin/reviews')
    .get(authenticateUser, authorizeRoles('admin'), getAllReviews)
    .delete(authenticateUser, authorizeRoles('admin'), deleteReview)

module.exports = router

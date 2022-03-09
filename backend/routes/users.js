const { routes } = require('../app')
const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    userDetails,
    updateProfile,
    updatePassword,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
} = require('../controllers/users')
const { authenticateUser, authorizeRoles } = require('../middleware/auth')

const router = require('express').Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(authenticateUser, logoutUser)

router.route('/me').get(authenticateUser, userDetails)
router.route('/me/update').put(authenticateUser, updateProfile)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:resetToken').put(resetPassword)
router.route('/password/update').put(authenticateUser, updatePassword)

router
    .route('/admin/users')
    .get(authenticateUser, authorizeRoles('admin'), getAllUsers)

router
    .route('/admin/users/:userId')
    .get(authenticateUser, authorizeRoles('admin'), getSingleUser)
    .put(authenticateUser, authorizeRoles('admin'), updateUserRole)
    .delete(authenticateUser, authorizeRoles('admin'), deleteUser)

module.exports = router

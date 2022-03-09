const { processPayment, sendApiKey } = require('../controllers/payments')
const { authenticateUser } = require('../middleware/auth')
const router = require('express').Router()

router.post('/payment/process', authenticateUser, processPayment)
router.get('/payment/stripeapikey', authenticateUser, sendApiKey)

module.exports = router

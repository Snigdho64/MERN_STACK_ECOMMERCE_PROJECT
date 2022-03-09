const cookieParser = require('cookie-parser')
const express = require('express')
const error = require('./middleware/error')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(fileUpload())

// ROUTES IMPORT
const products = require('./routes/products')
const users = require('./routes/users')
const orders = require('./routes/orders')
const payments = require('./routes/payments')
// ROUTES SETUP
app.use('/api/v1', products)
app.use('/api/v1', users)
app.use('/api/v1', orders)
app.use('/api/v1', payments)

// PRODUCTION SETUP
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})

// Error Handler Middleware
app.use(error)

module.exports = app

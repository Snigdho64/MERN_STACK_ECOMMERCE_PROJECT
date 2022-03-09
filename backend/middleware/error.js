const ErrorHandler = require('../utils/errorhandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.status || 500
    err.message = err.message || 'Internal Server Error'

    //   MONGODB ID ERROR
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid : ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    //   DUPLICATE EMAIL ERROR
    if (err.code === 11000) {
        const message = `Error. Duplicate ${Object.keys(err.keyValue)}`
        err = new ErrorHandler(message, 400)
    }

    // JSONWEBTOKEN ERROR
    if (err.name === 'JsonWebTokenError') {
        const message = `Error.Json Web Token is invalid`
        err = new ErrorHandler(message, 400)
    }

    // JWT EXPIRE ERROR
    if (err.name === 'TokenExpiredError') {
        const message = `Json Web Token has expired. Try Again.`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({ success: false, message: err.message })
}

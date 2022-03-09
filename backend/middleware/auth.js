const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/User')
const ErrorHandler = require('../utils/errorhandler')
const asyncErrorHandler = require('./asyncErrorHandler')

exports.authenticateUser = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler(`You are not authenticated`, 401))
    }
    jwtPayload = jsonwebtoken.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(jwtPayload._id)

    next()
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role ${req.user.role} is not authorized to acces this resource`,
                    401
                )
            )
        }
        next()
    }
}

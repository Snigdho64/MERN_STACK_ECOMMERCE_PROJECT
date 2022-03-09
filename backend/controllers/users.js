const Product = require('../models/Product')
const ErrorHandler = require('../utils/errorhandler')
const asyncError = require('../middleware/asyncErrorHandler')
const User = require('../models/User')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

exports.registerUser = asyncError(async (req, res, next) => {
    let myCloud = {}
    try {
        myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'MERN_E-COMMERCE',
        })
    } catch (e) {
        console.log(e)
        return next(
            new ErrorHandler('Cloudinary Error : ' + e.message, e.http_code)
        )
    }

    const { name, email, password } = req.body

    const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
            publicId: myCloud?.public_id || 'public_id',
            url: myCloud?.secure_url || 'image_url',
        },
    })

    sendToken(newUser, res, 201)
})

exports.loginUser = asyncError(async (req, res, next) => {
    const { password, email } = req.body
    const user = await User.findOne({ email: email }).select('+password')

    if (!user) return next(new ErrorHandler(`User not found`, 404))

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched)
        return next(new ErrorHandler('Invalid e-mail or password', 422))

    sendToken(user, res, 200)
})

exports.logoutUser = asyncError(async (req, res, next) => {
    if (!req.user) return next(new ErrorHandler(`User not logged in`, 404))

    res.cookie('token', null, {
        expires: new Date(Date.now()),
    })

    return res.status(200).json({ success: true, message: 'User logged out' })
})

exports.forgotPassword = asyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return next(new ErrorHandler('User not found', 404))

    const resetToken = await user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset link is :\n${resetPasswordUrl}.\nPlease Ignore if you have not requested this email.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'E-Commerce Password Recovery',
            message: message,
        })

        return res.status(200).json({
            success: true,
            message: `email sent to ${user.email} successfully`,
        })
    } catch (err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        next(new ErrorHandler(err.message, 500))
    }
})

exports.resetPassword = asyncError(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() },
    })

    if (!user)
        return next(new ErrorHandler('Token is invalid or has expired', 401))

    if (req.body.password != req.body.confirmPassword)
        return next(new ErrorHandler('Passwords do not match', 400))

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
    await user.save()

    return res.status(201).json({
        success: true,
        message: 'Password Reset Successful.',
    })
})

exports.userDetails = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    return res.status(200).json({ success: true, user })
})

exports.updatePassword = asyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body

    const user = await User.findById(req.user._id).select('+password')

    const isPasswordMatched = user.comparePassword(oldPassword)
    if (!isPasswordMatched)
        return next(new ErrorHandler('Password is incorrect', 401))
    if (newPassword != confirmPassword)
        return next(new ErrorHandler('Passwords do not match', 401))
    user.password = newPassword
    await user.save()
    return res
        .status(201)
        .json({ success: true, message: 'Password updated successfully' })
})

exports.updateProfile = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const { name, email, avatar } = req.body

    // CLOUDINARY TO UPDATE PROFILE
    let myCloud = {}
    try {
        myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'MERN_E-COMMERCE',
        })
        // DELETE PREVIOUS AVATAR
        await cloudinary.v2.uploader.destroy(user.avatar.publicId)
    } catch (e) {
        console.log(e)
        return next(
            new ErrorHandler('Cloudinary Error : ' + e.message, e.http_code)
        )
    }

    //....
    update_user_data = {
        name,
        email,
        avatar: { publicId: myCloud.public_id, url: myCloud.secure_url },
    }

    await user.update(update_user_data).exec()

    return res
        .status(201)
        .json({ success: true, message: 'Profile updated successfully', user })
})

// ADMIN
exports.getAllUsers = asyncError(async (req, res, next) => {
    const users = await User.find()
    return res.status(200).json({ success: true, users })
})

exports.getSingleUser = asyncError(async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    if (!user) return next(new ErrorHandler('User not found', 404))

    return res.status(200).json({ success: true, user })
})

exports.updateUserRole = asyncError(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        },
        { runValidators: true, new: true }
    )

    if (!updatedUser) return next(new ErrorHandler('User not found', 404))

    res.status(201).json({
        success: true,
        message: 'User updated successfully',
        user:updatedUser,
    })
})

exports.deleteUser = asyncError(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId)

    if (deletedUser.avatar.publicId !== '') {
        try {
            await cloudinary.v2.uploader.destroy(deletedUser.avatar.publicId)
            
        } catch (e) {
            console.log('Cloudinary Error : ' + e.message, e.http_code)
        }
    }

    if (!deletedUser) return next(new ErrorHandler('User not found', 404))

    res.status(201).json({
        success: true,
        message: 'User deleted successfully',
        user:deletedUser,
    })
})

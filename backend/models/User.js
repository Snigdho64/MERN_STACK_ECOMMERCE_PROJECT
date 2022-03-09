const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a username'],
        minlength: [3, 'Name must be at least 3 charaters'],
        maxlength: [25, 'Name must be at most 25 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter email address'],
        unique: true,
        lowercase: true,
        validate: [validator.default.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    avatar: {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()),
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
})

// HASH THE PASSWORD BEFORE SAVING
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcryptjs.hash(this.password, 12)
})

//CREATE A JSONWEBTOKEN FOR AUTHORIZATION
UserSchema.methods.getJWT = function () {
    return jsonwebtoken.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// COMPARE HASH PASSWORD WITH INPUT PASSWORD
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}

// PASSWORD RESET TOKEN
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('User', UserSchema)

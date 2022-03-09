const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
        trim: true,
    },
    price: {
        type: Number,
        min: 0.01,
        maxLength: [8, 'Exceeded max price value'],
        required: [true, 'Please enter product price'],
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
    },
    stock: {
        type: Number,
        min: 0,
        maxLength: [8, 'Exceeded stock value'],
        default: 1,
    },
    images: [
        {
            publicId: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    reviews: [
        {
            user: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
                ref: 'User',
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true,
            },
            comment: {
                type: String,
            },
        },
    ],
    ratings: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Product', ProductSchema)

const Product = require('../models/Product')
const ErrorHandler = require('../utils/errorhandler')
const asyncError = require('../middleware/asyncErrorHandler')
const ApiFeatures = require('../utils/ApiFeatures')
const cloudinary = require('cloudinary')

// --ADMIN --
exports.getAdminProducts = asyncError(async (req, res, next) => {
    const products = await Product.find()
    if (!products) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        products: products,
    })
})

// --ADMIN--
exports.createNewProduct = asyncError(async (req, res, next) => {
    let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    const uploadedImages = []

    // UPLOADING EACH IMAGE TO CLOUDINARY
    for (i = 0; i < images.length; i++) {
        try {
            const myCloud = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'Products',
            })
            uploadedImages.push({
                publicId: myCloud.public_id,
                url: myCloud.secure_url,
            })
        } catch (e) {
            console.log(e)
            return next(
                new ErrorHandler('Cloudinary Error : ' + e.message, e.http_code)
            )
        }
    }
    req.body.images = uploadedImages
    req.body.user = req.user._id

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: product,
    })
})

// --ADMIN--
exports.updateProduct = asyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.productId)

    if (!product) return next(new ErrorHandler('Product not found', 404))

    if (req.body.images !== undefined) {
        // DELETE PRODUCT IMAGES FROM CLOUDINARY
        if (product.images.length > 0) {
            for (i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].publicId)
            }
        }

        // ULPOAD NEW IMAGES TO CLOUDINARY
        let images = []

        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        const uploadedImages = []

        // UPLOADING EACH IMAGE TO CLOUDINARY
        for (i = 0; i < images.length; i++) {
            try {
                const myCloud = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'Products',
                })
                uploadedImages.push({
                    publicId: myCloud.public_id,
                    url: myCloud.secure_url,
                })
            } catch (e) {
                console.log(e)
                return next(
                    new ErrorHandler(
                        'Cloudinary Error : ' + e.message,
                        e.http_code
                    )
                )
            }
        }
        req.body.images = uploadedImages
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    res.status(201).json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
    })
})

// --ADMIN--
exports.deleteProduct = asyncError(async (req, res, next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId)

    if (!deletedProduct) {
        return next(new ErrorHandler('Product not found', 404))
    }

    for (i = 0; i < deletedProduct.images.length; i++) {
        await cloudinary.v2.uploader.destroy(req.body.images[i].publicId)
    }

    res.status(201).json({
        success: true,
        message: 'Product deleted successfully',
        product: deletedProduct,
    })
})

exports.getAllProducts = asyncError(async (req, res, next) => {
    const resultsPerPage = 4
    const productsCount = await Product.count()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeature.query

    let filteredProductsCount = products.length

    const apiFeature2 = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultsPerPage)

    products = await apiFeature2.query

    res.status(200).json({
        success: true,
        message: 'Products Loaded Successfully',
        products,
        productsCount,
        resultsPerPage,
        filteredProductsCount,
    })
})

exports.getProductDetails = asyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.productId).populate(
        'reviews.user',
        'name'
    )
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({ success: true, message: 'Product details', product })
})

exports.addReview = asyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body

    const review = { user: req.user._id, rating: Number(rating), comment }

    const product = await Product.findById(productId)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    const reviewIdx = product.reviews.findIndex(
        (review) => review.user.toString() === req.user._id.toString()
    )
    if (reviewIdx !== -1) {
        product.reviews[reviewIdx] = review
    } else {
        await product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }
    product.ratings =
        product.reviews.reduce((p, c) => c.rating + p, (p = 0)) /
        product.reviews.length

    await product.save({ validateBeforeSave: false })

    return res
        .status(201)
        .json({ success: true, message: 'review addded successfully' })
})

exports.getAllReviews = asyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId).populate(
        'reviews.user',
        'name email'
    )
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    return res.status(200).json({ success: true, reviews: product.reviews })
})

exports.deleteReview = asyncError(async (req, res, next) => {
    const { productId, reviewId } = req.query

    const product = await Product.findById(productId)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    const review = product.reviews.find(
        (rev) => rev._id.toString() === reviewId?.toString()
    )

    if (!review) return next(new ErrorHandler('Review not Found', 401))

    product.reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== reviewId?.toString()
    )

    product.numberOfReviews = product.reviews.length

    product.ratings =
        product.reviews.reduce((p, c) => c.rating + p, (p = 0)) /
        product.reviews.length

    await product.save()

    return res
        .status(201)
        .json({ success: true, message: 'Review deleted Successfully' })
})

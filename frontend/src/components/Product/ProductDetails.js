import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    addReview,
    clearError,
    getProductDetails,
} from '../../actions/productAction'
import ReviewCard from './ReviewCard'
import './ProductDetails.css'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import { addToCart } from '../../actions/cartAction'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
} from '@mui/material'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    )
    const alert = useAlert()

    const { productId } = useParams()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getProductDetails(productId))
    }, [dispatch, error, alert, productId])

    const [quantity, setQuantity] = useState(1)

    const increaseQty = () => {
        if (product.stock <= quantity) return
        setQuantity(quantity + 1)
    }

    const decreaseQty = () => {
        if (quantity <= 1) return
        setQuantity(quantity - 1)
    }

    const addToCartHandler = () => {
        if (product.stock < 1 || quantity < 1)
            return alert.error('Invalid Quantity')
        dispatch(addToCart(productId, quantity))
        alert.success('Added to Cart')
    }

    const { error: cartError } = useSelector((state) => state.cart)

    useEffect(() => {
        if (cartError) {
            dispatch(clearError)
            alert.error(cartError)
        } else {
        }
    }, [cartError, dispatch, alert])

    const options = {
        size: 'large',
        readOnly: true,
        value: product.ratings,
        precision: 0.5,
    }

    // ADDING NE REVIEW
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const submitReview = () => {
        dispatch(addReview({ productId, rating, comment }))
        setOpen(false)
    }

    const { success, error: reviewError } = useSelector(
        (state) => state.addReview
    )

    useEffect(() => {
        if (reviewError) {
            alert.error(reviewError)
        }
        if (success) {
            alert.success(success)
        }
        dispatch(clearError)
    }, [reviewError, success, dispatch, alert])

    return loading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Product Details E-Commerce" />
            <div className="productDetails">
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((image, i) => (
                                <img
                                    className="carouselImage"
                                    src={image.url}
                                    alt={i + 1 + 'slide'}
                                    key={image.url}
                                />
                            ))}
                    </Carousel>
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>{product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options} value={product.ratings} />
                        <span>{product.numberOfReviews} Reviews</span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>Rs. {product.price}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={decreaseQty}>-</button>
                                <input
                                    disabled={product.stock < 1}
                                    type="number"
                                    readOnly
                                    value={quantity}
                                />
                                <button onClick={increaseQty}>+</button>
                            </div>
                            <button onClick={addToCartHandler}>
                                {product.stock >= 1
                                    ? 'Add to Cart'
                                    : 'Out of Stock'}
                            </button>
                        </div>
                        <p>
                            Status :{' '}
                            <b
                                className={
                                    product.stock < 1
                                        ? 'redColor'
                                        : 'greenColor'
                                }
                            >
                                {product.stock > 0
                                    ? 'In Stock'
                                    : 'Out of Stock'}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>
                    <button
                        onClick={submitReviewToggle}
                        className="submitReview"
                    >
                        Add a Review
                    </button>
                </div>
            </div>
            <div className="reviewsSection">
                <h2 className="reviewsHeading">REVIEWS</h2>

                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />
                        <textarea
                            className="submitDialogTextArea"
                            value={comment}
                            cols="30"
                            rows="5"
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={submitReviewToggle}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={submitReview}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product.reviews.map((review) => (
                            <ReviewCard review={review} key={review.user._id} />
                        ))}
                    </div>
                ) : (
                    <p className="noReviews"></p>
                )}
            </div>
        </>
    )
}
export default ProductDetails

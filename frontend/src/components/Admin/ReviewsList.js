import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import './ProductsList.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Delete, ReviewsTwoTone } from '@mui/icons-material'
import { Button } from '@mui/material'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import {
    clearError,
    deleteReview,
    getAllReviews,
} from '../../actions/productAction'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import './ReviewsList.css'

const ReviewsList = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, reviews, success, message, error } = useSelector(
        (state) => state.adminReviews
    )
    const [productId, setProductId] = useState('')

    useEffect(() => {
        // if (!error && productId.length >= 24) {
        //     dispatch(getAllReviews(productId))
        // }
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (success) {
            alert.success(message)
            dispatch({ type: DELETE_REVIEW_RESET })
            dispatch(getAllReviews(productId))
        }
    }, [error, success, productId, message, dispatch, alert])

    const searchProductReviews = (e) => {
        e.preventDefault()
        if (productId.trim()) {
            dispatch(getAllReviews(productId))
        }
    }

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReview(productId, reviewId))
    }

    const columns = [
        {
            field: 'id',
            headerName: 'Review ID',
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: 'user',
            headerName: 'User',
            minWidth: 250,
            flex: 0.7,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 250,
            flex: 0.7,
        },
        {
            field: 'comment',
            headerName: 'Comment',
            minWidth: 300,
            flex: 1,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) =>
                params.row.rating >= 3 ? 'greenColor' : 'redColor',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            onClick={deleteReviewHandler.bind(
                                this,
                                params.row.id
                            )}
                        >
                            <Delete />
                        </Button>
                    </>
                )
            },
        },
    ]

    const rows = []

    reviews &&
        reviews.forEach((review) => {
            const {
                _id: id,
                user: { name: user, email },
                comment,
                rating,
            } = review
            rows.push({ id, user, email, comment, rating })
        })

    return (
        <>
            <Metadata title="Reviews ADMIN" />
            <div className="dashboard">
                <Sidebar />
                <div className="reviewsListContainer">
                    <form
                        className="reviewsListForm"
                        onSubmit={searchProductReviews}
                    >
                        <h1>Search For Review</h1>

                        <div>
                            <ReviewsTwoTone />
                            <input
                                type="text"
                                value={productId}
                                placeholder="ProductId"
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="reviewsListButton"
                            type="submit"
                            disabled={
                                loading ? true : false || productId === ''
                            }
                        >
                            Searches for Reviews
                        </Button>
                    </form>
                    {reviews && reviews.length > 0 && (
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            pageSize={10}
                            disableSelectionOnClick
                            className="reviewsListTable"
                            autoHeight
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default ReviewsList

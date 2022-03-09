import { Rating } from '@mui/material'
import React from 'react'
import profile from '../../images/Profile.png'
import './ReviewCard.css'

const ReviewCard = ({ review }) => {
     const options = {
         size: 'medium',
         readOnly: true,
         precision: 0.5,
     }

    return (
        <div className="reviewCard">
            <img src={profile} alt={review.user.name} className="reviewImage" />
            <Rating {...options} value={review.rating} />
            <h1>By {review.user.name}</h1>
            <p>{review.comment}</p>
        </div>
    )
}

export default ReviewCard

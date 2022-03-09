import React from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'
import { Rating } from '@mui/material'

const ProductCard = ({ product }) => {
    const options = {
        size: 'small',
        readOnly: true,
        value: product.ratings,
        precision: 0.5,
    }

    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div className="ratings">
                <Rating {...options} />
                <span>({product.numberOfReviews} Reviews)</span>
            </div>
            <span>Rs.{product.price}</span>
        </Link>
    )
}

export default ProductCard

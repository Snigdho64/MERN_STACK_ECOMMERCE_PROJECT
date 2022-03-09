import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../actions/cartAction'
import './CartItemCard.css'

const CartItemCard = ({ item }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const removeCartItem = () => {
        console.log(item._id)
        dispatch(removeFromCart(item._id))
        alert.info('Product Removed!')
    }

    const increaseQty = () => {
        if (item.stock <= item.quantity)
            return alert.show('Stock Limit Exceeded')
        dispatch(addToCart(item._id, item.quantity + 1))
    }

    const decreaseQty = () => {
        if (item.quantity <= 1) return alert.show('Minimum one is required')
        dispatch(addToCart(item._id, item.quantity - 1))
    }

    return (
        <div className="cartItemCard">
            <div>
                <img src={item.image} alt={item.name} />
                <Link to={`/products/${item._id}`}>{item.name}</Link>
                Price:<span>Rs.{`${item.price}`}</span>
                <button onClick={removeCartItem}>Remove</button>
            </div>
            <div>
                <button onClick={decreaseQty}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={increaseQty}>+</button>
            </div>
            <div>Rs. {item.price * item.quantity}</div>
        </div>
    )
}

export default CartItemCard

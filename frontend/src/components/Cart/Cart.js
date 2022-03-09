import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    RemoveShoppingCartTwoTone,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import CartItemCard from './CartItemCard'
import Metadata from '../layout/Metadata'
import './Cart.css'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const navigate = useNavigate()

    const totalPrice = cartItems.reduce((p, c) => +c.price * +c.quantity + p, 0)

    const checkOutHandler = () => {
        navigate('/login', { state: 'shipping' })
    }

    return (
        <>
            <Metadata title="Cart" />
            <div className="cartPage">
                {cartItems.length < 1 ? (
                    <div className="cartEmpty">
                        <RemoveShoppingCartTwoTone />
                        <p>No Items in your Cart</p>
                        <Link to="/products">View Products</Link>
                    </div>
                ) : (
                    <>
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        <div className="cartContainer">
                            {cartItems.map((cartItem) => (
                                <CartItemCard
                                    item={cartItem}
                                    key={cartItem._id}
                                />
                            ))}
                        </div>
                        <div className="cartTotal">
                            <div></div>
                            <div>
                                <p>Total</p>
                                <p>Rs. {totalPrice}</p>
                            </div>
                            <button onClick={checkOutHandler}>Checkout</button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Cart

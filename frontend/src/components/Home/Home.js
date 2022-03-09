import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
import './Home.css'
import ProductCard from './ProductCard.js'
import { useAlert } from 'react-alert'

const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, products, error } = useSelector((state) => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getProducts('', 1))
    }, [dispatch, error, alert])

    return loading ? (
        <>
            <Loader />
        </>
    ) : (
        <>
            <Metadata title="E-Commerce" />
            <div className="banner">
                <p>Welcome to E-Commerce</p>
                <h1>Find Amazing Products Below</h1>
                <a href="#featuredProducts">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>
            <div className="featuredProducts" id="featuredProducts">
                {products &&
                    products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
            </div>
        </>
    )
}

export default Home

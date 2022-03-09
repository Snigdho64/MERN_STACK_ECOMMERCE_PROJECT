import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearError, getProducts } from '../../actions/productAction'
import Pagination from 'react-js-pagination'
import ProductCard from '../Home/ProductCard'
import Loader from '../layout/Loader/Loader'
import { Typography, Slider, Select, InputLabel, MenuItem } from '@mui/material'
import './Products.css'
import Metadata from '../layout/Metadata'

const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Toys',
    'Attire',
    'Camera',
    'SmartPhones',
]

const Products = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { keyword } = useParams()

    const { products, loading, error, resultsPerPage, filteredProductsCount } =
        useSelector((state) => state.products)

    const [currentPage, setCurrentPage] = useState(1)

    const [price, setPrice] = useState([0, 25000])

    const [category, setCategory] = useState('')
    const [ratings, setRatings] = useState(0)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const setPriceHandler = (e, newRange) => {
        setPrice(newRange)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings))
    }, [dispatch, alert, error, keyword, currentPage, price, category, ratings])

    return loading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Products E-Commerce" />
            <h2 className="productsHeading">Products</h2>
            <div className="products">
                {products &&
                    products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                {products && products.length < 1 && (
                    <h1>No Products Found ! :(</h1>
                )}
            </div>
            <div className="filterBox">
                <Typography textAlign={'center'}>Price</Typography>
                <Slider
                    value={price}
                    onChange={setPriceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                />
                <Typography textAlign={'center'}>Categories</Typography>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categories.map((cat) => (
                        <MenuItem value={cat} key={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </Select>
                <fieldset>
                    <Typography component="legend">
                        Ratings Above
                        <Slider
                            value={ratings}
                            min={0}
                            onChange={(e) => setRatings(e.target.value)}
                            max={5}
                            aria-labelledby="continuous-slider"
                        />
                    </Typography>
                </fieldset>
            </div>
            {resultsPerPage < filteredProductsCount && (
                <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultsPerPage}
                        totalItemsCount={filteredProductsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="next"
                        prevPageText="prev"
                        firstPageText="First"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>
            )}
        </>
    )
}

export default Products

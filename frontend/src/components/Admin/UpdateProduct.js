import {
    AccountTreeTwoTone,
    AttachMoneyTwoTone,
    Description,
    SpellcheckTwoTone,
    Storage,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    clearError,
    updateProduct,
    getProductDetails,
} from '../../actions/productAction'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import './CreateProduct.css'
import Loader from '../layout/Loader/Loader'

const UpdateProduct = () => {
    const dispatch = useDispatch()

    const { loading, success, error, message } = useSelector(
        (state) => state.product
    )

    const {
        loading: productLoading,
        error: productError,
        product,
    } = useSelector((state) => state.productDetails)

    const alert = useAlert()
    const navigate = useNavigate()
    const { productId } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        'Electronics',
        'Clothes',
        'Toys',
        'Gifts',
        'Camera',
        'SmartPhones',
        'Footwear',
    ]

    useEffect(() => {
        // GET THE PRODUCT DETAILS
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            const { name, description, category, price, stock, images } =
                product
            setName(name)
            setPrice(price)
            setCategory(category)
            setStock(stock)
            setDescription(description)
            images.forEach((img) => {
                setImages((old) => [...old, img.url])
                setImagesPreview((old) => [...old, img.url])
            })
        }
        if (productError) {
            alert.error(productError)
            dispatch(clearError)
        }
    }, [dispatch, productId, alert, productError, product])

    useEffect(() => {
        // UPDATE THE PRODUCT
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        if (success) {
            alert.success(message)
            dispatch({ type: UPDATE_PRODUCT_RESET })
            navigate('/admin/products')
        }
    }, [error, success, message, alert, dispatch, navigate])

    const updateProductHandler = (e) => {
        e.preventDefault()
        const productData = {
            name,
            price,
            stock,
            description,
            category,
            images: [],
        }
        images.forEach((img) => productData.images.push(img))

        dispatch(updateProduct(productId, productData))
    }

    const productImagesChangeHandler = (e) => {
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])

        files.forEach((file) => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result])
                    setImages((old) => [...old, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    return productLoading ? (
        <Loader />
    ) : (
        <>
            <Metadata title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="createProductContainer">
                    <form
                        encType="multipart/form-data"
                        className="createProductForm"
                        onSubmit={updateProductHandler}
                    >
                        <h1>Update Product</h1>
                        <div>
                            <SpellcheckTwoTone />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyTwoTone />
                            <input
                                type="number"
                                placeholder="Product Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <Description />
                            <textarea
                                type="text"
                                placeholder="Product Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            />
                        </div>
                        <div>
                            <AccountTreeTwoTone />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((c) => (
                                    <option value={c} key={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder="Product Stock"
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/"
                                multiple
                                onChange={productImagesChangeHandler}
                            />
                        </div>
                        <div className="createProductFormImage">
                            {imagesPreview.map((image, idx) => (
                                <img
                                    src={image}
                                    alt="Avatar Preview"
                                    key={idx}
                                />
                            ))}
                        </div>
                        <Button
                            id="createProductButton"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct

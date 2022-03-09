import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import './ProductsList.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import {
    clearError,
    deleteProduct,
    getAdminProducts,
} from '../../actions/productAction'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import Loader from '../layout/Loader/Loader'

const ProductsList = () => {
    const dispatch = useDispatch()
    const { loading, products, error } = useSelector((state) => state.products)
    const alert = useAlert()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getAdminProducts)
    }, [error, alert, dispatch])

    const {
        success,
        error: deleteError,
        message,
    } = useSelector((state) => state.product)

    const deleteProductHandle = (productId) => {
        console.log(productId)
        dispatch(deleteProduct(productId))
    }

    useEffect(() => {
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError)
        }
        if (success) {
            alert.success(message)
        }
        dispatch({ type: DELETE_PRODUCT_RESET })
    }, [deleteError, success, message, alert, dispatch])

    const columns = [
        {
            field: 'id',
            headerName: 'Product ID',
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: 'name',
            headerName: 'Product Name',
            minWidth: 350,
            flex: 1,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 270,
            flex: 0.5,
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
                        <Link to={`/admin/products/${params.row.id}`}>
                            <Edit />
                        </Link>
                        <Button
                            onClick={deleteProductHandle.bind(
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

    products &&
        products.forEach((product) => {
            const { _id: id, name, stock, price } = product
            rows.push({ id, name, stock, price })
        })

    return (
        <>
            <Metadata title="Products ADMIN" />
            <div className="dashboard">
                <Sidebar />
                {loading ? (
                    <Loader />
                ) : (
                    <div className="productsListContainer">
                        <h1>ALL PRODUCTS</h1>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productsListTable"
                            autoHeight
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductsList

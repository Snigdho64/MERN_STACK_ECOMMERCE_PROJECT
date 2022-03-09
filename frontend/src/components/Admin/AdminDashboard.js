import React, { useEffect } from 'react'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import './AdminDashboard.css'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productAction'
import { getAllUsers } from '../../actions/userActions'
import { getAllOrders } from '../../actions/orderActions'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)

    const { users } = useSelector((state) => state.allUsers)

    const { orders } = useSelector((state) => state.allOrders)

    let outOfStock = 0
    let inStock = 0

    products &&
        products.forEach((product) => {
            if (product.stock < 1) {
                outOfStock += 1
            }
        })

    if (products) {
        inStock = products.length - outOfStock
    }

    useEffect(() => {
        dispatch(getAdminProducts)
        dispatch(getAllUsers)
        dispatch(getAllOrders)
    }, [dispatch])

    const lineData = {
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
                label: 'TOTAL AMOUNT',
                data: [
                    0,
                    orders && orders.reduce((p, c) => p + c.totalPrice, 0),
                ],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    }

    const doughnutData = {
        labels: ['Out of Stock', 'InStock'],
        datasets: [
            {
                backgroundColor: ['#00A6B4', '#35014F'],
                hoverBackgroundColor: ['#4B5000', '#35014F'],
                data: [outOfStock, inStock],
            },
        ],
    }

    return (
        <div className="dashboard">
            <Metadata title="Admin Dashboard" />
            <Sidebar />
            <div className="dashboardContainer">
                <h1>Dashboard</h1>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br />
                            Rs.{' '}
                            {orders &&
                                orders.reduce((p, c) => p + c.totalPrice, 0)}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                    <div className="lineChart">
                        <Line data={lineData} />
                    </div>
                    <div className="doughnutChart">
                        <Doughnut data={doughnutData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard

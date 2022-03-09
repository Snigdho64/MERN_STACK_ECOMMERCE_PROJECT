import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import { useEffect, useState } from 'react'
import webfont from 'webfontloader'
import Footer from './components/layout/Footer/Footer'
import Home from './components/Home/Home'
import ProductDetails from './components/Product/ProductDetails'
import Products from './components/Product/Products'
import Search from './components/Product/Search'
import LoginRegister from './components/User/LoginRegister'
import { clearError, loadUser } from './actions/userActions'
import UserOptions from './components/layout/Header/UserOptions'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './components/User/Profile'
import UpdateProfile from './components/User/UpdateProfile'
import UpdatePassword from './components/User/UpdatePassword'
import ForgotPassword from './components/User/ForgotPassword'
import ResetPassword from './components/User/ResetPassword'
import ProtectedRoute from './components/Route/ProtectedRoute'
import Cart from './components/Cart/Cart'
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import Payment from './components/Cart/Payment'
import PaymentSuccess from './components/Cart/PaymentSuccess'
import Orders from './components/Orders/Orders'
import OrderDetails from './components/Orders/OrderDetails'
import AdminDashboard from './components/Admin/AdminDashboard.js'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import ProductsList from './components/Admin/ProductsList'
import CreateProduct from './components/Admin/CreateProduct'
import UpdateProduct from './components/Admin/UpdateProduct'
import OrdersList from './components/Admin/OrdersList'
import UpdateOrder from './components/Admin/UpdateOrder'
import UsersList from './components/Admin/UsersList'
import UpdateUser from './components/Admin/UpdateUser'
import ReviewsList from './components/Admin/ReviewsList'
import Loader from './components/layout/Loader/Loader'
import About from './components/layout/About/About'
import Contact from './components/layout/Contact/Contact'

function App() {
    const { user, isAuthenticated, error, loading } = useSelector(
        (state) => state.user
    )
    const dispatch = useDispatch()
    const [stripeApiKey, setStripeApiKey] = useState('')

    const getStripeApiKey = async () => {
        if (!isAuthenticated) return
        try {
            const { stripeApiKey } = await (
                await axios.get('/api/v1/payment/stripeapikey')
            ).data
            setStripeApiKey(stripeApiKey)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (error) {
            dispatch(clearError)
        }
        webfont.load({
            google: { families: ['Roboto', 'Droid Sans', 'Chilanka'] },
        })
        dispatch(loadUser)
        getStripeApiKey()
    }, [error, dispatch])

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
    })

    return loading ? (
        <Loader />
    ) : (
        <Router>
            {isAuthenticated && user && <UserOptions user={user} />}
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                    exact
                    path="/product/:productId"
                    element={<ProductDetails />}
                />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/login" element={<LoginRegister />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route
                    exact
                    path="/password/forgot"
                    element={<ForgotPassword />}
                />
                <Route
                    path="/password/reset/:resetToken"
                    exact
                    element={<ResetPassword />}
                />
                <Route
                    exact
                    path="/account"
                    element={<ProtectedRoute element={<Profile />} />}
                />
                {isAuthenticated && (
                    <>
                        <Route
                            exact
                            path="/me/update"
                            element={
                                <ProtectedRoute element={<UpdateProfile />} />
                            }
                        />
                        <Route
                            path="/password/update"
                            exact
                            element={
                                <ProtectedRoute element={<UpdatePassword />} />
                            }
                        />
                        <Route
                            path="/shipping"
                            exact
                            element={<ProtectedRoute element={<Shipping />} />}
                        />
                        <Route
                            path="/confirm"
                            element={
                                <ProtectedRoute element={<ConfirmOrder />} />
                            }
                        />
                        {isAuthenticated && stripeApiKey && (
                            <Route
                                path="/payment/process"
                                element={
                                    <ProtectedRoute
                                        element={
                                            <Elements
                                                stripe={loadStripe(
                                                    stripeApiKey
                                                )}
                                            >
                                                <Payment />
                                            </Elements>
                                        }
                                    />
                                }
                            />
                        )}
                        <Route
                            path="/payment/success"
                            element={
                                <ProtectedRoute element={<PaymentSuccess />} />
                            }
                        />
                        <Route
                            path="/orders"
                            element={<ProtectedRoute element={<Orders />} />}
                        />
                        <Route
                            path="/orders/:orderId"
                            element={
                                <ProtectedRoute element={<OrderDetails />} />
                            }
                        />

                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute
                                    element={<AdminDashboard />}
                                    admin
                                />
                            }
                        />
                        <Route
                            path="/admin/products"
                            element={
                                <ProtectedRoute
                                    element={<ProductsList />}
                                    admin
                                />
                            }
                        />
                        <Route
                            path="/admin/product"
                            element={
                                <ProtectedRoute
                                    element={<CreateProduct />}
                                    admin
                                />
                            }
                        />
                        <Route
                            path="/admin/products/:productId"
                            element={
                                <ProtectedRoute
                                    element={<UpdateProduct />}
                                    admin
                                />
                            }
                        />
                        <Route
                            path="/admin/orders"
                            element={
                                <ProtectedRoute
                                    element={<OrdersList />}
                                    admin
                                />
                            }
                        />
                        <Route
                            path="/admin/orders/:orderId"
                            element={
                                <ProtectedRoute
                                    element={<UpdateOrder />}
                                    admin
                                />
                            }
                        />
                        <Route
                            path="/admin/users"
                            element={
                                <ProtectedRoute element={<UsersList />} admin />
                            }
                        />
                        <Route
                            path="/admin/users/:userId"
                            element={
                                <ProtectedRoute
                                    element={<UpdateUser />}
                                    admin
                                />
                            }
                        />
                        <Route
                            path="/admin/reviews/"
                            element={
                                <ProtectedRoute
                                    element={<ReviewsList />}
                                    admin
                                />
                            }
                        />
                    </>
                )}

                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
            <Footer />
        </Router>
    )
}

export default App

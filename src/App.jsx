import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from "react"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import NotFound from './pages/not-found/NotFound'
import Thing from './pages/thing/Thing'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import Authentication from './components/authentication/Authentication'
import CategoryThing from './pages/category-thing/CategoryThing'
import Test from './pages/test/Test'
import CartWishlist from './components/cart-wishlist/CartWishlist'
import ForgotPassword from './pages/reset-password/ForgotPassword'
import Settings from './pages/user-settings/UserSettings'
import ResetPassword from './pages/reset-password/ResetPassword'

const App = () => {
    return (
        <BrowserRouter>
            <Authentication>
                <CartWishlist>
                    <Routes>
                        <Route path='/*' element={<NotFound/>} />
                        <Route element={<Home/>} path="/" />
                        <Route element={<Cart/>} path="/cart" />
                        <Route element={<Login/>} path="/login" />
                        <Route element={<Register/>} path='/register' />
                        <Route element={<ForgotPassword/>} path='/forgot-password' />
                        <Route element={<ResetPassword/>} path='/password/reset/:uid/:token' />
                        <Route element={<CategoryThing/>} path='/category/:category' />
                        <Route element={<Thing/>} path='/things/:id' />
                        <Route element={<Test/>} path='/test' />
                        <Route element={<Settings/>} path='/user-settings' />
                    </Routes>
                </CartWishlist>
            </Authentication>
        </BrowserRouter>
    )
}

export default App
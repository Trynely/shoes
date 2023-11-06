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

const App = () => {
    return (
        <BrowserRouter>
            <Authentication>
                <Routes>
                    <Route path='/*' element={<NotFound/>} />
                    <Route element={<Home/>} path="/" />
                    <Route element={<Cart/>} path="/cart" />
                    <Route element={<Login/>} path="/login" />
                    <Route element={<Register/>} path='/register' />
                    <Route element={<CategoryThing/>} path='/category/:category' />
                    <Route element={<Thing/>} path='/things/:id' />
                </Routes>
            </Authentication>
        </BrowserRouter>
    )
}

export default App
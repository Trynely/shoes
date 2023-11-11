import "./../../styles/main.css"
import React, { useContext, useEffect } from "react"
import Middle from "./../../components/middle/Midlle"
import Header from "./../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { CartLengthContext } from "../../components/items-length/CartWishlistLen"


function Home() {
    useEffect(() => {
        document.title = "Главная"
    }, [])

    return (
        <div className='wrapper'>
            <Header/>
            <Middle/>
            <Footer/>
        </div>
    )
}

export default Home
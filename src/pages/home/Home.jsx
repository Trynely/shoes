import {useEffect } from "react"
import Middle from "./../../components/middle/Midlle"
import Header from "./../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Wishlist from "../wishlist/Wishlist"
import "./../../styles/main.css"


function Home() {
    useEffect(() => {
        document.title = "TRY"
    }, [])

    return (
        <>
            <Header/>
            <Middle/>
            <Wishlist />
            <Footer/>
        </>
    )
}

export default Home
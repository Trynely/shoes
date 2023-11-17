import "./../../styles/main.css"
import {useEffect } from "react"
import Middle from "./../../components/middle/Midlle"
import Header from "./../../components/header/Header"
import Footer from "../../components/footer/Footer"


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
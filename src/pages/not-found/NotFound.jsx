import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import "./../../styles/main.css"

const NotFound = () => {
    return (
        <div className="wrapper">
            <Header/>

            <div className='not_found'>
                <img className='not_found__img' src="/not-found.svg" alt="" />
            </div>
            
            <Footer/>
        </div>

    )
}

export default NotFound
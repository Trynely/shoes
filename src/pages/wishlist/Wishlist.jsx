import axios from "axios"
import {useEffect, useState} from "react"
import {useContext} from "react"
import {AuthenticationContext} from "../../components/authentication/Authentication"
import {Link} from "react-router-dom"
import {CartWishlistLengthContext} from "../../components/items-length/CartWishlistLen"
import Header from "../../components/header/Header"
import Footer from "./../../components/footer/Footer"
import NotFound from "./../not-found/NotFound"
import Loading from "../loading/Loading"
import "./wishlist.css"

const Wishlist = () => {
    const {tokens, user} = useContext(AuthenticationContext)
    const {wishlistThingsLen} = useContext(CartWishlistLengthContext)

    const [thingsOfWishlist, setWishlistThings] = useState([])
    const [loading, setLoading] = useState()

    useEffect(() => {
        document.title = "Избранное"
        
        if(user) {
            wishlistThings()
        }
    }, [])

    useEffect(() => {
        console.log(thingsOfWishlist)
    }, [thingsOfWishlist])

    const wishlistThings = () => {
        setLoading(true)

        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/wishlist/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokens.access)
            }
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setWishlistThings(data)
            } else {
                setWishlistThings(null)
            }
        })

        setLoading(false)
    }

    const wishlistThingsDelete = (id) => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/delete-from-wishlist/${id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokens.access)
            }
        }).then((response) => {
            if(response.status === 200) {
                wishlistThings()
                wishlistThingsLen()
            }
        })
    }

    const wishlistClear = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/clear-wishlist/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokens.access)
            }
        }).then((response) => {
            if(response.status === 200) {
                wishlistThings()
                wishlistThingsLen()
            }
        })
    } 

    return (
        <>
            <Header />
            
            {
                loading
                    ?
                <Loading />
                    :
                null
            }

            <Footer />
        </>
    )
}

export default Wishlist
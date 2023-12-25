import axios from "axios"
import {useEffect, useState} from "react"
import {useContext} from "react"
import {AuthenticationContext} from "../../components/authentication/Authentication"
import {Link} from "react-router-dom"
import {CartWishlistContext} from "../../components/items-length/CartWishlistLen"
import "./wishlist.css"

const Wishlist = () => {
    const {tokens} = useContext(AuthenticationContext)
    const {thingsOfWishlist, wishlistActive, setWishlistActive, wishlistThings} = useContext(CartWishlistContext)
    
    const [loading, setLoading] = useState()
    const [notFound, setNotFound] = useState(true)
    const [style, setStyle] = useState({display: "none"})

    useEffect(() => {
        document.title = "Избранное"
    }, [])

    useEffect(() => {
        console.log(thingsOfWishlist)
    }, [thingsOfWishlist])

    useEffect(() => {
        setTimeout(() => {
            setNotFound(false)
        }, 500)
    }, [])

    const hideWishlist = () => {
        if(wishlistActive === false) {
            setStyle(null)
        }

        if(wishlistActive === true) {
            setWishlistActive(false)
            setStyle({animation: "hideWishlist .4s ease-in-out forwards"})

            setTimeout(() => {
                setStyle({display: "none"})
            }, 400)
        }
    }

    const wishlistThingsDelete = (id) => {
        setLoading(true)

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
            }
        })

        setLoading(false)
    }

    const wishlistClear = () => {
        setLoading(true)

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
            }
        })

        setLoading(false)
    } 

    return ( 
        <div style={wishlistActive ? {display: "block"} : style} className="wishlist">
            <div style={wishlistActive ? {display: "flex"} : style} className="wishlist__container">
                <div className="container__wishlist_close">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        
                        ИЗБРАННОЕ
                    </span>

                    <button onClick={hideWishlist}>
                        X
                    </button>
                </div>

                <div className="container__wishlist_things">
                    {
                        thingsOfWishlist.map((thing, id) => (
                            <div key={id} className="container__wishlist_thing">
                                <div className="wishlist_thing__img_title">
                                    <img src={thing.img} alt="" />

                                    <Link>{thing.title}</Link>
                                </div>

                                <div className="wishlist_thing__price">
                                    <span>{thing.price} р.</span>
                                    
                                    <button onClick={() => wishlistThingsDelete(thing.id)}>
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.79501 5C4.62688 5.13993 4.46746 5.29304 4.31803 5.45838C3.90017 5.92074 3.56869 6.46964 3.34255 7.07374C3.1164 7.67785 3 8.32532 3 8.9792C3 9.63308 3.1164 10.2806 3.34255 10.8847C3.56869 11.4888 3.90017 12.0377 4.31803 12.5L10.5162 19.3582C11.3103 20.2368 12.6897 20.2368 13.4838 19.3582L16.1691 16.3869" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M3 3L19 19" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9.22217 4.37901C9.76813 4.62924 10.2642 4.99601 10.6821 5.45837V5.45837C11.3874 6.23883 12.6127 6.23883 13.3181 5.45837V5.45837C14.162 4.52459 15.3066 4 16.5001 4C17.6935 4 18.8381 4.52459 19.682 5.45837C20.526 6.39215 21.0001 7.65863 21.0001 8.97919C21.0001 10.2998 20.526 11.5662 19.682 12.5L18.7783 13.5" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                <div className="container__clear_wishlist">
                    <button style={thingsOfWishlist.length <= 0 ? {display: "none"} : null} onClick={wishlistClear}>Очистить</button>
                </div>
            </div>
        </div>
    )
}

export default Wishlist
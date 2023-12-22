import axios from "axios"
import {createContext, useEffect, useState} from "react"
import {useContext} from "react"
import {AuthenticationContext} from "../authentication/Authentication"

export const CartWishlistContext = createContext()

const CartWishlist = ({children}) => {
    const {tokens, user} = useContext(AuthenticationContext)

    const [thingsOfCart, setCartThings] = useState([])
    const [thingsOfWishlist, setWishlistThings] = useState([])
    const [wishlistActive, setWishlistActive] = useState(false)

    useEffect(() => {
        if(user) {
            cartThings()
            wishlistThings()
        }
    }, [tokens])

    const cartThings = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/cart/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokens.access)
            }
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setCartThings(data)
            } else {
                setCartThings(null)
            }
        })
    }

    const wishlistThings = () => { 
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
    }
    
    const items = {
        thingsOfCart: thingsOfCart,
        thingsOfWishlist: thingsOfWishlist,

        setWishlistActive: setWishlistActive,
        wishlistActive: wishlistActive,

        cartThings: cartThings,
        wishlistThings: wishlistThings
    }

    return (
        <CartWishlistContext.Provider value={items}>
            {children}
        </CartWishlistContext.Provider>
    )
}

export default CartWishlist
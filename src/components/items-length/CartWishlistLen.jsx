import axios from "axios"
import {createContext, useEffect, useState} from "react"
import {useContext} from "react"
import {AuthenticationContext} from "../authentication/Authentication"

export const CartWishlistLengthContext = createContext()

const CartWishlistLength = ({children}) => {
    const {tokens, user} = useContext(AuthenticationContext)

    const [thingsOfCart, setCartThings] = useState([])
    const [thingsOfWishlist, setWishlistThings] = useState([])

    useEffect(() => {
        if(user) {
            cartThingsLen()
            wishlistThingsLen()
        }
    }, [tokens])

    const cartThingsLen = () => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/cart/",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(tokens.access)
            }
        }).then((response) => {
            const data = response.data
            
            if(response.status === 200) {
                setCartThings(data)
            }
        })
    }

    const wishlistThingsLen = () => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/wishlist/",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(tokens.access)
            }
        }).then((response) => {
            const data = response.data
            
            if(response.status === 200) {
                setWishlistThings(data)
            }
        })
    }

    const items = {
        cartThingsLen: cartThingsLen,
        thingsOfCart: thingsOfCart,

        wishlistThingsLen: wishlistThingsLen,
        thingsOfWishlist: thingsOfWishlist,
    }

    return (
        <CartWishlistLengthContext.Provider value={items}>
            {children}
        </CartWishlistLengthContext.Provider>
    )
}

export default CartWishlistLength
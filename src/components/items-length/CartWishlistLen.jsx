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

    const cartThingsLen = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/cart/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokens.access)
                }
            })
    
            let data = await response.json()
    
            if(response.status === 200) {
                setCartThings(data)
            }
        } catch(err) {
            console.log("error userthings >>", err)
        }
    }

    const wishlistThingsLen = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/wishlist/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokens.access)
                }
            })
    
            let data = await response.json()
    
            if(response.status === 200) {
                setWishlistThings(data)
            }
        } catch(err) {
            console.log("error userthings >>", err)
        }
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
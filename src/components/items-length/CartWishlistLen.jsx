import {createContext, useEffect, useState} from "react"
import { useContext } from "react"
import { AuthenticationContext } from "../authentication/Authentication"

export const CartLengthContext = createContext()
export const WishlistLengthContext = createContext()

const CartWishlistLength = ({children}) => {
    const {tokens} = useContext(AuthenticationContext)
    const [thingsOfCart, setCartThings] = useState([])
    const [thingsOfWishlist, setWishlistThings] = useState([])

    useEffect(() => {
        cartThings()
    }, [])

    const cartThings = async () => {
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

    return (
        <CartLengthContext.Provider value={thingsOfCart}>
            {children}
        </CartLengthContext.Provider>
    )
}

export default CartWishlistLength
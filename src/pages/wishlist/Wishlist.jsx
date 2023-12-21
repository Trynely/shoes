import axios from "axios"
import {useEffect, useState} from "react"
import {useContext} from "react"
import {AuthenticationContext} from "../../components/authentication/Authentication"
import {Link} from "react-router-dom"
import {CartWishlistLengthContext} from "../../components/items-length/CartWishlistLen"
import "./wishlist.css"

const Wishlist = () => {
    const {tokens, user} = useContext(AuthenticationContext)
    const {wishlistThingsLen, wishlistActive} = useContext(CartWishlistLengthContext)
    
    const [thingsOfWishlist, setWishlistThings] = useState([])
    const [loading, setLoading] = useState()
    const [notFound, setNotFound] = useState(true)

    useEffect(() => {
        document.title = "Избранное"
        
        if(user) {
            wishlistThings()
        }
    }, [])

    useEffect(() => {
        console.log(thingsOfWishlist)
    }, [thingsOfWishlist])

    useEffect(() => {
        setTimeout(() => {
            setNotFound(false)
        }, 500)
    }, [])

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
                wishlistThingsLen()
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
                wishlistThingsLen()
            }
        })

        setLoading(false)
    } 

    return ( 
        <div style={wishlistActive ? {display: "block"} : {display: "none"}} className="wishlist">
            <div style={wishlistActive ? {display: "flex"} : {display: "none"}} className="wishlist__container">
                {
                    thingsOfWishlist.map((thing, id) => (
                        <div key={id} className="container__wishlist_thing">
                            <div className="wishlist_thing__img_title">
                                <img style={{width: "100px", height: "100px"}} src={thing.img} alt="" />

                                <Link>{thing.title}</Link>
                            </div>
                        </div>
                    ))
                }
            </div>

            <button onClick={wishlistClear}>Очистить</button>
        </div>
    )
}

export default Wishlist
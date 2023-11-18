import {useEffect, useState} from "react"
import {useContext} from "react"
import Header from "../../components/header/Header"
import Footer from "./../../components/footer/Footer"
import NotFound from "./../not-found/NotFound"
import {AuthenticationContext} from "../../components/authentication/Authentication"
import "./cart.css"
import {Link} from "react-router-dom"
import {CartWishlistLengthContext} from "../../components/items-length/CartWishlistLen"

const Cart = () => {
    const {tokens, user, logoutUser} = useContext(AuthenticationContext)
    const {cartThingsLen} = useContext(CartWishlistLengthContext)

    const [thingsOfCart, setCartThings] = useState([])

    useEffect(() => {
        document.title = "Корзина"
        
        if(user) {
            cartThings()
        }
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
    
            const data = await response.json()
    
            if(response.status === 200) {
                setCartThings(data)
            } else if(response.statusText === "Unauthorized") {
                logoutUser()
                window.location.reload()
            }
        } catch(err) {
            console.log("error userthings >>", err)
        }
    }

    const cartThingsDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/delete-from-cart/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokens.access)
                }
            })

            if(response.status === 200) {
                cartThings()
                cartThingsLen()
            }
        } catch(err) {
            console.log("error userthings >>", err)
        }
    }

    const cartClear = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/clear-cart/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokens.access)
                }
            })

            if(response.status === 200) {
                cartThings()
                cartThingsLen()
            }
        } catch(err) {
            console.log("error userthings >>", err)
        }
    }

    return (
        <div className="wrapper">
            {
                thingsOfCart.length > 0 
                    ?   
                <>
                    <Header />
                
                    <div className="cart">
                        <div className="cart__container">
                            {
                                thingsOfCart.map((thing, id)=> (
                                    <div className="container__cart_thing" key={id}>
                                        <div className="cart_thing__img_title">
                                            <img src={thing.img} alt={thing.title} />
                                            <Link>{thing.title}</Link>
                                        </div>
                    
                                        <div className="cart_thing__quantity">
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>                               
                    
                                            <span>{thing.quantity}</span>
                    
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                                            
                                        <div className="cart_thing__price_delete">
                                            <span>{thing.price} р.</span>
                                                                        
                                            <button onClick={() => cartThingsDelete(thing.id)}>
                                                <svg className="delete_cart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="container__total_price">
                            <div>
                                <img src="calculator.png" alt="" />
                            </div>
                
                            <div>
                                <span>ИТОГО: 15534 р.</span>
                                <button>Рассчитать</button>
                                <button onClick={cartClear}>Очистить</button>
                            </div>
                        </div>
                    </div>
                
                    <Footer />
                </>
                    :
                <NotFound/>
            }
        </div>
    )
}

export default Cart
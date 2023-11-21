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
    const [totalPrice, setTotalPrice] = useState([])

    useEffect(() => {
        document.title = "Корзина"
        
        if(user) {
            cartThings()
        }
    }, [])

    useEffect(() => {
        let totalPriceArray = thingsOfCart.map(el => el.price)

        function sum() {
            let sumTotalPrice = 0

            for (let i=0; i < totalPriceArray.length; i++) {
                sumTotalPrice += totalPriceArray[i]
            }

            setTotalPrice(sumTotalPrice)

            return sumTotalPrice
        }
        
        sum()
    }, [thingsOfCart])

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
                                                <svg className="delete_cart" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">
                                                    <g><g><g><path fill="currentColor" d="M117.3,6.9c-4.3,2.3-5.6,6.8-3.2,10.9c0.8,1.4,6.9,7.9,13.6,14.6l12.2,12.1l-13.2,13.3c-11.3,11.3-13.3,13.6-13.6,15.4c-0.8,4.1,1.1,7.7,4.9,9.1c4.6,1.9,5,1.6,19.8-13.1l13.4-13.3l13.1,13c13.8,13.7,15.4,14.8,19.1,14c2.5-0.6,5.5-3.4,6.2-5.9c1.1-4.1,0.5-5-13.8-19.3l-13.3-13.3l13.3-13.3c11-11,13.4-13.7,13.8-15.4c0.9-4.2-1.5-8.2-5.6-9.4c-4.1-1.2-5.3-0.4-19.6,13.8l-13.1,13L138,20.1c-7.2-7.2-13.8-13.4-14.7-13.7C121,5.6,119.5,5.7,117.3,6.9z"/><path fill="#000000" d="M13.6,54.4c-4.7,2.9-4.8,10.1-0.1,13.4c1.1,0.8,3.3,1,13.2,1.2l11.9,0.3L45.8,84c11.5,23.2,42.7,90.7,42.3,91.4C87.8,176,74.3,191,74.2,191c-0.1,0-1.6-0.3-3.4-0.6c-11.3-1.9-24.3,5.8-30.3,17.8l-2.5,5v6.9v6.9l2.4,4.7c2.9,5.8,5.8,9.3,10.7,12.7c12.4,8.8,27.4,6.9,38.2-4.8c3.1-3.3,7.2-10.6,7.2-12.7c0-0.8,3.1-0.9,37.6-0.9c37.4,0,37.6,0,37.9,1.1c0.8,3.3,4.3,9.2,7.3,12.4c5.4,5.8,12,9.4,19.3,10.4c7.1,1,17-2.9,23.2-9.2c12.2-12.4,12.1-29.4-0.3-41.6c-10.2-10-24-11.7-35.7-4.2c-3.8,2.4-9.4,8.5-11.2,12.2l-1.5,3h-38.8H95.4l-0.7-1.8c-0.4-1-2-3.4-3.4-5.4c-1.5-2-2.7-3.7-2.7-3.8c0-0.2,3-3.6,6.6-7.6l6.6-7.3h72.1H246v-56.5V71.3h-18.9h-18.9v7.9v7.9h11h11v40.6v40.6l-63.6-0.1l-63.6-0.2l-16.4-35.3c-9-19.4-17.5-37.7-18.8-40.5l-2.4-5.2h14.7h14.6v-7.9v-7.9H76.1H57.5l-3.6-7.2c-3.8-7.7-5.3-9.4-8.3-10.3c-1.1-0.3-8.2-0.6-16-0.6C16.5,53.3,15.2,53.4,13.6,54.4z M73.4,207.2c5.3,2.1,7.9,6.3,8,12.9c0,8.9-4.8,13.8-13.4,13.9c-5.3,0-8.1-1-10.8-3.7c-2.7-2.7-3.7-5.5-3.7-10.5c0-6.2,3.2-11.1,8.2-12.8C64.3,206,70.7,206.2,73.4,207.2z M208.2,207.8c2.3,1.2,3.4,2.3,4.7,4.3c1.6,2.5,1.7,3.2,1.7,7.9c0,4.2-0.2,5.5-1.2,7.5c-2.4,4.4-6.3,6.4-12.7,6.4c-8.6,0-13.6-4.9-13.7-13.3c-0.1-4.7,0.8-7.6,3.2-10.3c2.6-3,5.5-4.1,10.6-4.1C204.5,206.3,205.6,206.5,208.2,207.8z"/><path fill="#000000" d="M107.7,112.8v8.2h7.9h7.9v-8.2v-8.2h-7.9h-7.9V112.8z"/><path fill="#000000" d="M137.6,112.8v8.2h7.9h7.9v-8.2v-8.2h-7.9h-7.9V112.8z"/><path fill="#000000" d="M167.5,112.8v8.2h7.9h7.9v-8.2v-8.2h-7.9h-7.9V112.8z"/><path fill="#000000" d="M196.9,112.8v8.2h7.9h7.9v-8.2v-8.2h-7.9h-7.9V112.8L196.9,112.8z"/><path fill="#000000" d="M107.7,145v8.2h7.9h7.9V145v-8.2h-7.9h-7.9V145z"/><path fill="#000000" d="M137.6,145v8.2h7.9h7.9V145v-8.2h-7.9h-7.9V145z"/><path fill="#000000" d="M167.5,145v8.2h7.9h7.9V145v-8.2h-7.9h-7.9V145z"/><path fill="#000000" d="M196.9,145v8.2h7.9h7.9V145v-8.2h-7.9h-7.9V145L196.9,145z"/></g></g></g>
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
                                <span>ИТОГО: {totalPrice} р.</span>
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
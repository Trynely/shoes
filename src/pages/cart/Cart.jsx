import {useEffect, useState} from "react"
import { useContext } from "react"
import Header from "../../components/header/Header"
import Footer from "./../../components/footer/Footer"
import {AuthenticationContext} from "../../components/authentication/Authentication"
import "./cart.css"
import { Link } from "react-router-dom"

const Cart = () => {
    const {tokens} = useContext(AuthenticationContext)
    const [thingsOfCart, setCartThings] = useState([])

    useEffect(() => {
        document.title = "Корзина"
    }, [])

    useEffect(() => {
        cartThings()
        console.log(thingsOfCart)
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
                logOut()
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
                window.location.reload()
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
                window.location.reload()
            }
        } catch(err) {
            console.log("error userthings >>", err)
        }
    }

    return (
        <div className="wrapper">
            <Header />

            {
                thingsOfCart.length === 0 ?
                    <div className="cart">
                        <div className="cart__container">
                            {thingsOfCart.map((thing, id)=> (
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
                                            <img src="delete-cart.png" alt="" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="container__total_price">
                                <div>
                                    <img src="calculator.png" alt="" />
                                </div>

                                <div>
                                    <span>ИТОГО: 15534 р.</span>
                                    <button>Рассчитать</button>
                                </div>
                            </div>
                        </div>
                    </div> : ''
            }
            <Footer />
        </div>
    )
}

export default Cart
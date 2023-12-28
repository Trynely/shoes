import axios from "axios"
import {Link, useParams} from "react-router-dom"
import {useContext, useEffect, useRef, useState} from "react"
import {Toaster, toast} from 'sonner'
import {AuthenticationContext} from "../../components/authentication/Authentication"
import {CartWishlistContext} from "../../components/cart-wishlist/CartWishlist"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Toast from "../../components/toast/Toast"
import "./category-things.css"
import Wishlist from "../wishlist/Wishlist"
// import {useToaster, Toaster, toast} from "react-hot-toast"

export const CategoryThing = () => {
    const {tokens, user} = useContext(AuthenticationContext)
    const {thingsOfCart, thingsOfWishlist, cartThings, wishlistThings} = useContext(CartWishlistContext)

    const {category} = useParams()

    const label38 = useRef("")
    const label39 = useRef("")
    const label40 = useRef("")
    const label41 = useRef("")
    const label42 = useRef("")
    const label43 = useRef("")
    const label44 = useRef("")

    const [things, setThings] = useState([])
    const [checkCart, setCheckCart] = useState([])
    const [checkWishlist, setCheckWishlist] = useState([])
    const [wishlistActiv, setWishlistActive] = useState()
    const [checkSize, setCheckSize] = useState([])
    const [labelActive, setLabelActive] = useState(null)

    useEffect(() => {
        thingsCat()

        document.title = category.charAt(0).toUpperCase() + category.slice(1)
    }, [])

    useEffect(() => {
        // const objects = []

        // for(let i = 0; i < thingsOfCart.length; i++) {
        //     objects.push(thingsOfCart[i].text)
        // }

        const cartObjects = thingsOfCart.map(el => el.text)
        setCheckCart(cartObjects)

        const wishlistObjects = thingsOfWishlist.map(el => el.text)
        setCheckWishlist(wishlistObjects)
    }, [thingsOfCart, thingsOfWishlist])

    const thingsCat = () => {
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/category/${category}/`
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setThings(data)
            }
        })
    }

    const cartThingsAdd = (id) => {
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/add-to-cart/${id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokens.access)
            }
        }).then((response) => {
            if(response.status === 200) {
                cartThings()
            }
        })
    }

    const wishlistThingsAdd = (id) => {
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/add-to-wishlist/${id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokens.access)
            }
        }).then((response) => {
            if(response.status === 200) {
                wishlistThings()
                setWishlistActive('favorites_heart__active')
            }
        })
    }

    useEffect(() => {
        const thingsObjects = things.map(el => el.size)
        // const thingsObjects = things.map((el) => ({[el.title]: String(el.size).split(' ')}))
        // // const thingsKeys = thingsObjects.map(el => Object.values()))
        // const thingValues = thingsObjects.map(el => Object.values(el)[0])
        // // // console.log(thingsObjects, ">> things")
        // console.log(thingsObjects.map(el => Object.values(el)[0]), ">> values")

        setCheckSize(String(thingsObjects).split(' '))
    }, [things])

    return (
        <>
            <Header />

            <div className="category_things">
                <div className="things__container">
                    <div className="things_container__search">
                        <input type="text" />

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </div>

                    <div className="things_container__things_box">
                        {
                            things.map((thing) => (
                                <div className="category_things__thing" key={thing.id}>
                                    <div className="thing__name">
                                        <div className="name__imgs">
                                            <img src={thing.one_img} alt="" />
                                            <img src={thing.two_img} alt="" />
                                        </div>

                                        <Link className="name__title" to={`/things/${thing.id}`}>{thing.title}</Link>
                                    </div>

                                    <div className="thing__description">
                                        <span className="description__in_having">В наличии: Есть</span>

                                        <span className="description__made_in">Производство: {thing.made_in}</span>

                                        <div className="description__sizes">
                                            <form>
                                                <span>Размеры:</span>
                                                
                                                <label onClick={() => setLabelActive(label38.current.getAttribute("value"))} style={checkSize.includes("38") ? {display: "flex"} : {display: "none"}} ref={label38} value="38" className={labelActive === "38" ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="38" />

                                                    38
                                                </label>

                                                <label onClick={() => setLabelActive(label39.current.getAttribute("value"))} style={checkSize.includes("39") ? {display: "flex"} : {display: "none"}} ref={label39} value="39" className={labelActive === "39" ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="39" />
                                                    
                                                    39
                                                </label>

                                                <label onClick={() => setLabelActive(label40.current.getAttribute("value"))} style={checkSize.includes("40") ? {display: "flex"} : {display: "none"}} ref={label40} value="40" className={labelActive === "40" ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="40" />

                                                    40
                                                </label>
                
                                                <label onClick={() => setLabelActive(label41.current.getAttribute("value"))} style={checkSize.includes("41") ? {display: "flex"} : {display: "none"}} ref={label41} value="41" className={labelActive === "41" ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="41" />

                                                    41
                                                </label>

                                                <label onClick={() => setLabelActive(label42.current.getAttribute("value"))} style={checkSize.includes("42") ? {display: "flex"} : {display: "none"}} ref={label42} value="42" className={labelActive === "42" ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="42" />

                                                    42
                                                </label>

                                                <label onClick={() => setLabelActive(label43.current.getAttribute("value"))} style={checkSize.includes("43") ? {display: "flex"} : {display: "none"}} ref={label43} value="43" className={labelActive === "43" ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="43" />

                                                    43
                                                </label>

                                                <label onClick={() => setLabelActive(label44.current.getAttribute("value"))} style={checkSize.includes("44") ? {display: "flex"} : {display: "none"}} ref={label44} value="44" className={labelActive === "44" ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="44" />

                                                    44
                                                </label>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="thing__price">
                                        <span className="price__price">{thing.price} р.</span>
                                        
                                        <button className="price__buy_btn">КУПИТЬ</button>
                                    </div>

                                    <div className="thing__add_to">
                                        {
                                            user
                                                ?
                                            <button onClick={() => {cartThingsAdd(thing.id); toast.success(`${thing.title} добавлен в корзину`, {duration: 3000})}}>
                                                {
                                                    checkCart.includes(thing.text)
                                                        ? 
                                                    null
                                                        :   
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                    </svg>
                                                }
                                            </button>
                                                :
                                            <Link className="unautheticated" to="/login">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                            </Link>
                                        }
                                        
                                        {
                                            user 
                                                ?
                                            <button onClick={() => wishlistThingsAdd(thing.id)}>
                                                <svg className={checkWishlist.includes(thing.text) ? 'favorites_heart__active' : null} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                            </button>
                                                :
                                            <Link className="unautheticated" to="/login">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <Wishlist />

            <Footer />

            <Toast /> 
        </>
    )
}

export default CategoryThing
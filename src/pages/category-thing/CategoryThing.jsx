/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios"
import {Link, useParams} from "react-router-dom"
import {useContext, useEffect, useRef, useState} from "react"
import {toast} from 'sonner'
import {AuthenticationContext} from "../../components/authentication/Authentication"
import {CartWishlistContext} from "../../components/cart-wishlist/CartWishlist"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Toast from "../../components/toast/Toast"
import Wishlist from "../wishlist/Wishlist"
import "./category-things.css"

export const CategoryThing = () => {
    const {tokens, user, logoutUser} = useContext(AuthenticationContext)
    const {thingsOfCart, thingsOfWishlist, cartThings, wishlistThings} = useContext(CartWishlistContext)

    const {category} = useParams()

    const label38 = useRef("")
    const label39 = useRef("")
    const label40 = useRef("")
    const label41 = useRef("")
    const label42 = useRef("")
    const label43 = useRef("")
    const label44 = useRef("")
    const label45 = useRef("")

    const [things, setThings] = useState([])
    const [checkCart, setCheckCart] = useState([])
    const [checkWishlist, setCheckWishlist] = useState([])
    const [labelActive, setLabelActive] = useState("")
    const [selectedThing, setSelectedThing] = useState({})
    const [activeFilterBtn, setActiveFilterBtn] = useState(false)

    useEffect(() => {
        categoryThings()

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

    const categoryThings = () => {
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/category/${category}/`
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setThings(data)
            }
        }).catch((error) => {
            if(error) {
                logoutUser()
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
            }
        })
    }

    const filterMinThings = () => {
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/filter-min-things/${category}/`,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setThings(data)

            }
        })

        setActiveFilterBtn('cheaper')
    }

    const filterMaxThings = () => {
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/filter-max-things/${category}/`,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setThings(data)

            }
        })

        setActiveFilterBtn('expansive')
    }

    const searchThings = (event) => {
        event.preventDefault()

        axios({
            method: 'post',
            url: `http://127.0.0.1:8000/search-things/${category}/`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {"title": event.target.search.value}
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setThings(data)
                console.log(response)
            }
        })
    }

    return (
        <>
            <Header />

            <div className="category_things">
                <div className="things__container">
                    <div className="container__things_filter">
                        <div className="things_container__search">
                            <form method="post" onSubmit={searchThings}>
                                <input name="search" type="text" autoComplete="off"/>

                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="30" viewBox="0 -960 960 960" width="30">
                                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                                    </svg>
                                </button>
                            </form>
                        </div>

                        <div className="things_filter__option_filter">
                            <button style={activeFilterBtn === 'cheaper' ? {color: 'rgb(247, 247, 247)'} : null} onClick={filterMinThings} className="option_filter__min">
                                <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                                </svg>
                                
                                ДЕШЕВЛЕ
                            </button>

                            <button style={activeFilterBtn === 'expansive' ? {color: 'rgb(247, 247, 247)'} : null} onClick={filterMaxThings} className="option_filter__max">
                                <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>

                                ДОРОЖЕ
                            </button>

                            <button>
                                <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>
 
                                НОВОЕ
                            </button>
                        </div>
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
                                                
                                                <label onClick={() => setLabelActive([thing.title, label38.current.getAttribute("value")].join(''))} style={thing.size.split(' ').includes("38") ? {display: "flex"} : {display: "none"}} ref={label38} value="38" className={labelActive === thing.title + 38 ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="38" />

                                                    38
                                                </label>

                                                <label onClick={() => setLabelActive([thing.title, label39.current.getAttribute("value")].join(''))} style={thing.size.split(' ').includes("39") ? {display: "flex"} : {display: "none"}} ref={label39} value="39" className={labelActive === thing.title + 39 ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="39" />
                                                    
                                                    39
                                                </label>

                                                <label onClick={() => setLabelActive([thing.title, label40.current.getAttribute("value")].join(''))} style={thing.size.split(' ').includes("40") ? {display: "flex"} : {display: "none"}} ref={label40} value="40" className={labelActive === thing.title + 40 ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="40" />

                                                    40
                                                </label>
                
                                                <label onClick={() => setLabelActive([thing.title, label41.current.getAttribute("value")].join(''))} style={thing.size.split(' ').includes("41") ? {display: "flex"} : {display: "none"}} ref={label41} value="41" className={labelActive === thing.title + 41 ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="41" />

                                                    41
                                                </label>

                                                <label onClick={() => setLabelActive([thing.title, label42.current.getAttribute("value")].join(''))} style={thing.size.split(' ').includes("42") ? {display: "flex"} : {display: "none"}} ref={label42} value="42" className={labelActive === thing.title + 42 ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="42" />

                                                    42
                                                </label>

                                                <label onClick={() => setLabelActive([thing.title, label43.current.getAttribute("value")].join(''))} style={thing.size.split(' ').includes("43") ? {display: "flex"} : {display: "none"}} ref={label43} value="43" className={labelActive === thing.title + 43 ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="43" />

                                                    43
                                                </label>

                                                <label onClick={() => setLabelActive([thing.title, label44.current.getAttribute("value")].join(''))} style={thing.size.split(' ').includes("44") ? {display: "flex"} : {display: "none"}} ref={label44} value="44" className={labelActive === thing.title + 44 ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="44" />

                                                    44
                                                </label>

                                                <label onClick={() => setLabelActive([thing.title, label45.current.getAttribute("value")].join(''))} style={thing.size.split(' ').includes("45") ? {display: "flex"} : {display: "none"}} ref={label45} value="45" className={labelActive === thing.title + 45 ? "sizes__label_active" : "sizes__label"}>
                                                    <input className="radio" name="radio" type="radio" value="45" />

                                                    45
                                                </label>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="thing__price">
                                        <span className="price__price">{thing.price} р.</span>
                                        
                                        <button className="price__buy_btn" style={labelActive.slice(0, -2).includes(thing.title) ? null : {opacity: ".6"}} onClick={() => setSelectedThing({"title": labelActive.slice(0, -2), "selected_size": labelActive.slice(-2)})} disabled={labelActive.slice(0, -2).includes(thing.title) ? false : true}>КУПИТЬ</button>
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
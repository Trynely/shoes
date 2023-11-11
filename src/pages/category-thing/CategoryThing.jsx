import {Link, useParams} from "react-router-dom"
import {useContext, useEffect, useState} from "react"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import "./category-things.css"
import {AuthenticationContext} from "../../components/authentication/Authentication"

const CategoryThing = () => {
    const {tokens} = useContext(AuthenticationContext)
    const {category} = useParams()
    const [things, setThings] = useState([])

    useEffect(() => {
        thingsCat()
        document.title = category.charAt(0).toUpperCase() + category.slice(1)
    }, [])

    const thingsCat = async () => {
        const response = await fetch(`http://127.0.0.1:8000/category/${category}/`)
        const data = await response.json()
        
        if(response.status === 200) {
            setThings(data)
        }
    }

    const cartThingsAdd = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/add-to-cart/${id}/`, {
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
            <Header/>

            <div className="category_things">
                {
                    things.map((thing) => (
                        <div className="category_things__thing" key={thing.id}>
                            <div className="thing__name">
                                <img src={thing.img} alt="" />
                                <Link className="name__title" to={`/things/${thing.id}`}>{thing.title}</Link>
                            </div>

                            <div className="thing__price">
                                <span className="price__price">{thing.price} РУБ.</span>
                                <button className="price__buy_btn">КУПИТЬ</button>
                            </div>

                            <div className="thing__add_to">
                                <button onClick={() => cartThingsAdd(thing.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </button>

                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <Footer/>
        </div>
    )
}

export default CategoryThing
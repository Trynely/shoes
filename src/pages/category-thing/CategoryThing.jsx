import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import "./category-things.css"

const CategoryThing = () => {
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
                        </div>
                    ))
                }
            </div>

            <Footer/>
        </div>
    )
}

export default CategoryThing
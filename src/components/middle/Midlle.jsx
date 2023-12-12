import axios from "axios"
import {useState, useEffect} from 'react'
import React from "react"
import {Link} from "react-router-dom"
import "./middle.css"

function Middle() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [welcome, setWelcome] = useState(false)
    const [categories, setCategories] = useState()

    useEffect(() => {
        Categories()
    }, [])

    useEffect(() => {
        let interval = setInterval(() => {
            welcomeSlider()
        }, 6000)

        return () => clearInterval(interval)
    }, [welcome])

    const Categories = () => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/category/"
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setCategories(data)
            }
        })
    }

    const welcomeSlider = () => {
        setWelcome(true)

        if(welcome) {
            setWelcome(false)
        }
    }

    const sliderCategory = (position) => {
        if(position < 0) {
            position = 0
        } else if (position >= 1) {
            position = 1
        }

        setActiveIndex(position)
    }
    
    // ---------------------------------------
    
    return (
        <div className='content'>
            <div className='content__container'>
                <div className="container__welcome_slider">
                    <img style={welcome ? {display: "none"} : {display: "block"}} src="/welcome-1.jpg" alt="" />
                    <img style={welcome ? {display: "block"} : {display: "none"}} src="/welcome-2.jpg" alt="" />
                </div>

                {
                    categories 
                        ?
                    <div className="container__slider">
                        <div className="slider__objects">
                            {
                                categories.map((category) => (
                                    <Link className="category" to={`/category/${category.slug}`} key={category.id} style={{transform: `translateX(-${activeIndex * 101}%)`}}>
                                        <img src={category.img} alt="" />
                                    </Link>
                                ))
                            }
                        </div>

                        <div className="slider__controls">
                            <button onClick={() => {sliderCategory(activeIndex - 1)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <button onClick={() => {sliderCategory(activeIndex + 1)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div> 
                        :
                    null
                }
            </div>
        </div>
    )
}

export default Middle
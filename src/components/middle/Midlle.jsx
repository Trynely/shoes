import "./../../styles/main.css"
import {useState, useEffect, useContext, useRef} from 'react'
import axios from "axios"
import React from "react"
import {Link} from "react-router-dom"
import {AuthenticationContext} from "../authentication/Authentication"
import Slider from "react-slick"
import "./middle.css"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"

function Middle() {
    useContext(AuthenticationContext)

    // const [things, setThings] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [categories, setCategories] = useState()
    const images = useRef(null)

    useEffect(() => {
        Categories()
    }, [])

    // const sliderCarousel = () => {
    //     const carousel = document.querySelector(".slider__objects")
    //     const firstImg = carousel.querySelectorAll(".slider__objects img")[0]

    //     const arrowIcons = document.querySelectorAll(".slider__controls button")
    //     let firstImgWidth = firstImg.clientWidth + 4

    //     arrowIcons.forEach(icon => {
    //         icon.addEventListener("click", () => {
    //             console.log('dsq')
    //             carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth
    //         })
    //     })
    // }

    const Categories = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/category/")
            const data = await response.json()

            if(response.status === 200) {
                setCategories(data)
            }
        } catch(err) {
            console.log(err)
        }
    }

    function delThing(id) {
        axios.delete(`http://127.0.0.1:8000/things/${id}/`)
        window.location.reload()
    }

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0
        } else if (newIndex >= 1) {
            newIndex = 1
            console.log(activeIndex)
        }
    
        setActiveIndex(newIndex)
    }

    // --------------------------------------------------------------------------------
    // ДЛЯ ПОЛЬЗОВАТЕЛЯ

    // const userThings = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/things/', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + String(tokens.access)
    //             }
    //         })

    //         let data = await response.json()

    //         if(response.status === 200) {
    //             setThings(data)
    //         } else if(response.statusText === "Unauthorized") {
    //             logOut()
    //             window.location.reload()
    //         }
            
    //     } catch(err) {
    //         console.log("error userthings >>", err)
    //     }
    // }

    // useEffect(() => {
    //     if(tokens) {
    //         userThings()
    //     }
    // }, [tokens])
    // ---------------------------------------
    
    return (
        <main className='content'>
            <div className='content__container'>
                { categories ?
                    <div className="container__slider">
                        <div ref={images} className="slider__objects">
                            {
                                categories.map((category) => (
                                    <Link className="category" to={`/category/${category.slug}`} key={category.id} style={{transform: `translate(-${activeIndex * 101}%)`}}>
                                        <img src={category.img} alt="" />
                                    </Link>
                                ))
                            }
                        </div>

                        <div className="slider__controls">
                            <button id="left" onClick={() => {updateIndex(activeIndex - 1)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <button id="right" onClick={() => {updateIndex(activeIndex + 1)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div> : ""
                }
            </div>
        </main>
    )
}

export default Middle
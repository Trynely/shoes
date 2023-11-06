import {useState, useEffect, useRef} from 'react'
import axios from "axios"
import React from "react"
import "./thing.css"
import Footer from "../../components/footer/Footer"
import Header from "./../../components/header/Header"
import {useParams} from "react-router-dom"

const Thing = () => {
    const {id} = useParams()
    const [state, setState] = useState([])
    const [error, setError] = useState('')

    useEffect(()=>{
        let data
        axios.get(`http://127.0.0.1:8000/things/${id}/`)
        .then(res => {
            data = res.data
            setState(data)
        })
        .catch(err => {
            setError('Не найдено!')
        })
    }, [])

    return (
        <div className="wrapper">
            <Header/>
            <div className="thing">
                <h2>Имя: {state.title}</h2>
                <h3>Текст: {state.text}</h3>
            </div>
            <Footer/>
        </div>
    )
}

export default Thing
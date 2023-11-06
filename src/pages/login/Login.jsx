import { useState, useEffect, createContext} from "react"
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router-dom"
import "./../../styles/main.css"
import Header from "./../../components/header/Header"

const Login = () => {
    let [user, setUser] = useState(() => (localStorage.getItem("JWT") ? jwtDecode(localStorage.getItem("JWT")) : null))
    let [tokens, setTokens] = useState(() => (localStorage.getItem("JWT") ? JSON.parse(localStorage.getItem("JWT")) : null))
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Войти"
    }, [])

    let loginUser = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: e.target.email.value, password: e.target.password.value})
            });

            let data = await response.json();

            if(response.status === 200) {
                setTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem("JWT", JSON.stringify(data))
                navigate("/")
                window.location.reload()
            } else {
                alert('Something went wrong while logging in the user!')
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="wrapper">
            <Header/>
            <div className="login_container">
                <h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    Войти
                </h1>

                <form method="POST" onSubmit={loginUser}>
                    <input className="" type="text" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Пароль"/>
                    <button method="submit">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login
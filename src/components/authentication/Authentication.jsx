import {createContext} from "react"
import {useState, useEffect} from 'react'
import React from "react"
import { jwtDecode } from "jwt-decode"
import {useNavigate} from "react-router-dom"

export const AuthenticationContext = createContext()


const Authentication = ({children}) => {
    let [user, setUser] = useState(() => (localStorage.getItem("JWT") ? jwtDecode(localStorage.getItem("JWT")) : null))
    let [tokens, setTokens] = useState(() => (localStorage.getItem("JWT") ? JSON.parse(localStorage.getItem("JWT")) : null))
    let [active, setActive] = useState(true)

    const navigate = useNavigate()

    const logoutUser = () => {
        localStorage.removeItem('JWT')
        setTokens(null)
        setUser(null)
        navigate("/login")
    }

    const updateToken = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({refresh: tokens?.refresh})
            })

            const data = await response.json()
            // console.log("update >>", data)

            if(response.status === 200) {
                setTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('JWT', JSON.stringify(data))
            } else if(response.status === 401) {
                localStorage.removeItem('JWT')
                setTokens(null)
                setUser(null)
                window.location.reload()
            } else if(response.statusText === "Unauthorized") {
                localStorage.removeItem('JWT')
                setTokens(null)
                setUser(null)
                window.location.reload()
            }

            if(active) {
                setActive(false)
            }

        } catch(err) {
            logoutUser()
        }
    }

    useEffect(() => {
        if(tokens) {
            if(active) {
                updateToken()
            }
    
            let interval = setInterval(() => {
                updateToken()
            }, 540000) // 9 min
    
            return () => clearInterval(interval)
        }
    }, [tokens])

    let items = {
        user: user,
        setTokens: setTokens,
        setUser: setUser,
        setActive: setActive,
        active: active,
        tokens: tokens,
        logoutUser: logoutUser,
    }

    return (
        <AuthenticationContext.Provider value={items}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default Authentication


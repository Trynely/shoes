import axios from "axios"
import {createContext} from "react"
import {useState, useEffect} from 'react'
import {jwtDecode} from "jwt-decode"
import {useNavigate} from "react-router-dom"

export const AuthenticationContext = createContext()

const Authentication = ({children}) => {
    let [user, setUser] = useState(() => (localStorage.getItem("JWT") ? jwtDecode(localStorage.getItem("JWT")) : null))
    let [tokens, setTokens] = useState(() => (localStorage.getItem("JWT") ? JSON.parse(localStorage.getItem("JWT")) : null))
    let [active, setActive] = useState(true)
    const [avatar, setAvatar] = useState([])

    const navigate = useNavigate()

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

    useEffect(() => {
        if(user) {
            userAvatar()
        }
    }, [user])

    const updateToken = () => {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/user/token/refresh/",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                refresh: tokens?.refresh
            }
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                setTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('JWT', JSON.stringify(data))
            } else if(response.status === 401) {
                localStorage.removeItem('JWT')
                setTokens(null)
                setUser(null)
                window.location.reload()
            }

            console.log("update >>", data)
        })

        if(active) {
            setActive(false)
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('JWT')
        localStorage.removeItem('Img')
        
        setTokens(null)
        setUser(null)
        
        navigate("/login")
    }

    const userAvatar = () => {
        const user_id = user.user_id

        axios({
            method: "get",
            url: `http://127.0.0.1:8000/user/avatar/${user_id}/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(tokens.access)
            }
        }).then((response) => {
            const data = response.data
            
            if(response.status === 200) {
                setAvatar(data)
                // setAvater(localStorage.getItem('Img'))
                localStorage.setItem('Img', JSON.stringify(data))
            } else {
                localStorage.removeItem('Img')
            }
        })
    }

    let items = {
        setTokens: setTokens,
        setUser: setUser,
        setActive: setActive,
        logoutUser: logoutUser,
        userAvatar: userAvatar,
        setAvatar: setAvatar,
        user: user,
        active: active,
        tokens: tokens,
        avatar: avatar,
    }

    return (
        <AuthenticationContext.Provider value={items}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default Authentication


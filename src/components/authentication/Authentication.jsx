import axios from "axios"
import {createContext} from "react"
import {useState, useEffect} from 'react'
import {jwtDecode} from "jwt-decode"
import {useNavigate} from "react-router-dom"

export const AuthenticationContext = createContext()

const Authentication = ({children}) => {
    const [tokens, setTokens] = useState(() => (localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null))
    const [user, setUser] = useState(() => (localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")) : null))
    const [windowReload, setWindowReload] = useState(true)
    const [avatar, setAvatar] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if(tokens) {
            if(windowReload) {
                updateAcessToken()
            }
    
            let interval = setInterval(() => {
                updateAcessToken()
            }, 240000) // 4 min

            return () => clearInterval(interval)
        }
    }, [tokens, user])

    useEffect(() => {
        if(user) {
            userAvatar()
        }
    }, [user])

    const updateAcessToken = () => {
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

                localStorage.setItem('token', JSON.stringify(data))
            }

            console.log("update >>", data)
            console.log("user >> ", user)
            console.log("tokens >> ", tokens)
        }).catch((error) => {
            if(error) {
                logoutUser()
            }
        })

        if(windowReload) {
            setWindowReload(false)
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('token')
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
        setWindowReload: setWindowReload,
        logoutUser: logoutUser,
        userAvatar: userAvatar,
        setAvatar: setAvatar,
        user: user,
        windowReload: windowReload,
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


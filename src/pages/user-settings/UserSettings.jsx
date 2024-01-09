import axios from "axios"
import {AuthenticationContext} from "../../components/authentication/Authentication"
import {useState, useEffect, useContext, useRef} from "react"
import Header from "./../../components/header/Header"
import Footer from "../../components/footer/Footer"
import "./user-settings.css"
import Wishlist from "../wishlist/Wishlist"

const Settings = () => {
    const {tokens, user, avatar, setAvatar, userAvatar} = useContext(AuthenticationContext)
    const fileRef = useRef(null)

    const [validation, setValidation] = useState("")
    const [windowActive, setWindowActive] = useState(false)
    const [showPasswordOne, setShowPasswordOne] = useState(false)
    const [showPasswordTwo, setShowPasswordTwo] = useState(false)
    const [style, setStyle] = useState({display: "none"})

    useEffect(() => {
        document.title = "Настройки пользователя"
    }, [])

    const ShowWindow = () => {
        if(windowActive === false) {
            setWindowActive(true)
            
            setStyle(null)
        }

        if(windowActive === true) {
            setWindowActive(false)

            setStyle({animation: "hideUserWindow .3s linear forwards"})
            
            setTimeout(() => {
                setStyle({display: "none"})
            }, 400)
        }
    }

    const ShowPasswordOne = () => {
        setShowPasswordOne(true)

        if(showPasswordOne === true) {
            setShowPasswordOne(false)
        }
    }

    const ShowPasswordTwo = () => {
        setShowPasswordTwo(true)

        if(showPasswordTwo === true) {
            setShowPasswordTwo(false)
        }
    }

    const setImageAvatar = (event) => {
        event.preventDefault()

        const user_id = user.user_id
        const img = event.target.files[0]

        const formData = new FormData()
        formData.append('img', img)

        axios({
            method: "put",
            url: `http://127.0.0.1:8000/user/avatar/${user_id}/`,
            headers: {
                "Authorization": "Bearer " + String(tokens.access)
            },
            data: formData
        }).then((response) => {
            const data = response.data
            
            if(response.status === 200) {
                setAvatar(data)
            }
        })
    }

    const deleteImageAvatar = () => {
        const user_id = user.user_id

        axios({
            method: "put",
            url: `http://127.0.0.1:8000/user/avatar/${user_id}/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(tokens.access)
            },
            data: {
                img: null
            }
        }).then((response) => {
            const data = response.data
            
            if(response.status === 200) {
                setAvatar(data)
            }
        })
    }

    const changePassword = (event) => {
        event.preventDefault()

        axios({
            method: "patch",
            url: "http://127.0.0.1:8000/user/change-password/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokens.access)
            },
            data: {
                old_password: event.target.old_password.value,
                new_password: event.target.new_password.value,
            }
        }).then((response) => {
            if(response.status === 200) {
                setValidation("Пароль успешно изменён")
            }
        }).catch((error) => {
            if(error) {
                setValidation("Не удалось изменить пароль")
            }
        })

        setTimeout(() => {
            setValidation(null)
        }, 5000)
    }

    return (
        <>
            <Header/>

            <div className="user_settings">
                <div className="user_settings__container">
                    <div className="container__user_edits">
                        <div className="user_edits__avatar">
                            <button style={avatar.img === null ? {display: "none"} : {display: "flex"}} onClick={deleteImageAvatar} className="avatar__delete_avatar">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {
                                avatar.img === null
                                    ?
                                <img src="/null-image.jpg" alt="" />
                                    :
                                <img src={avatar.img} alt="" />
                            }
                            
                            <button className="avatar__edit" onClick={() => fileRef.current.click()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                                Редактировать
                            </button>

                            <input style={{display: "none"}} ref={fileRef} onChange={setImageAvatar} type="file" multiple />
                        </div>

                        <div className="user_edits__params">
                            <button style={windowActive ? {backgroundColor: "rgb(30, 32, 32)", color: "rgb(255, 255, 255)"} : null} onClick={ShowWindow}>
                                <svg style={windowActive ? {transform: "rotate(-90deg)"} : null} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                </svg>

                                Сменить пароль
                            </button>
                        </div>
                    </div>

                    <div style={windowActive ? {display: "flex"} : style} className="container__settings_window">
                        <form onSubmit={changePassword}>
                            <span className="settings_window__form_label">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>

                                Смена пароля
                            </span>

                            <div>
                                {
                                    showPasswordOne
                                        ?
                                    <svg onClick={ShowPasswordOne} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                        :
                                    <svg onClick={ShowPasswordOne} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                }
                                
                                <input type={showPasswordOne ? "text" : "password"} name="old_password" placeholder="Нынешний пароль" />
                            </div>
                            
                            <div>
                                {
                                    showPasswordTwo
                                        ?
                                    <svg onClick={ShowPasswordTwo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                        :
                                    <svg onClick={ShowPasswordTwo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                }

                                <input type={showPasswordTwo ? "text" : "password"} name="new_password" placeholder="Новый пароль" />
                            </div>
                            
                            <span style={validation === "Пароль успешно изменён" ? {color: "rgb(0, 187, 0)"} : {color: "rgb(87, 0, 0)"}} className="validation_of_change_password">{validation}</span>

                            <button>Сменить</button>
                        </form>
                    </div>
                </div>
            </div>
            
            <Wishlist />

            <Footer/>
        </>
    )
}

export default Settings
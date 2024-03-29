import axios from "axios"
import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import {BeatLoader} from "react-spinners"
import Header from "./../../components/header/Header"
import Footer from "./../../components/footer/Footer"
import "./login.css"

const Login = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Войти"
    }, [])

    const loginUser = (event) => {
        event.preventDefault()
        
        setLoading(true)
        
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/user/token/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {email: event.target.email.value, password: event.target.password.value}
        }).then((response) => {
            const data = response.data

            if(response.status === 200) {
                localStorage.setItem("token", JSON.stringify(data))
                
                setLoading(false)
                navigate("/")

                window.location.reload()
            }
        }).catch((error) => {
            if(error.response) {
                setLoading(false)
                alert('Произошла ошибка')
            }
        })
    }

    return (
        <div className="wrapper">
            <Header/>

            <div className="login">
                <div className="login__container">
                    <div className="container__login_label">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                            ВОЙТИ
                        </span>
                    </div>

                    <form className="container__login_form" method="POST" onSubmit={loginUser}>
                        <div className="login_form__email_block">                      
                            <input className="login_form__email" id="email" type="text" name="email" autoComplete="off" placeholder="Email" />
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="form_input_img form_email_img">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        
                        <div className="login_form__password_block">
                            <input className="login_form__email" type="password" name="password" autoComplete="off" placeholder="Пароль" />

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="form_input_img form_password_img">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>

                            <Link className="password_block__forgot_password" to="/forgot-password">
                                Забыли пароль?
                            </Link>
                        </div>

                        <div className="login_form__register_block">
                            <span>У вас нет аккаунта?</span>
                            
                            <Link to="/register">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24">
                                    <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
                                </svg>

                                Создать
                            </Link>
                        </div>
                        
                        <div className="login_form__btn_block">
                            <button method="submit">
                                {
                                    loading 
                                        ?
                                    <BeatLoader
                                        color="rgba(238, 238, 238, 0.795)"
                                        size={5}
                                    />
                                        :
                                    <>Войти</>
                                }
                            </button>
                        </div>                    
                    </form>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Login
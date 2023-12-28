import axios, { AxiosError } from "axios"
import {Link} from "react-router-dom"
import {useState} from "react"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

const Register = () => {
    const [validation, setValidation] = useState("")
    
    const userRegister = (event) => {
        event.preventDefault()
        
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/user/register/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email: event.target.email.value,
                username: event.target.username.value,
                password: event.target.password.value
            }
        }).then((response) => {
            if(response.status === 201) {
                setValidation("Аккаунт успешно создан")
            }

            setTimeout(() => {
                setValidation(null)
            }, 5000)
        }).catch((error) => {
            setValidation("Произошла ошибка")
        })
    }

    return (
        <div className="wrapper">
            <Header/>

            <div className="login">
                <div className="login__container">
                    <div className="container__register_label">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                            СОЗДАТЬ
                        </span>
                    </div>

                    <form className="container__login_form" onSubmit={userRegister}>
                        <div className="login_form__email_block">
                            <input className="login_form__email" id="email" type="email" name="email" autoComplete="off" placeholder=" " />
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            
                            <label className="placeholder" htmlFor="email">EMAIL</label>
                        </div>

                        <div className="login_form__username_block">
                            <input className="login_form__email" id="username" type="text" name="username" autoComplete="off" placeholder=" "/>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            
                            <label className="placeholder" htmlFor="username">ИМЯ</label>
                        </div>
                        

                        <div className="login_form__password_block">
                            <input className="login_form__email" type="password" name="password" autoComplete="off" placeholder=" " />

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>

                            <label className="placeholder" htmlFor="email">ПАРОЛЬ</label>

                            <span style={validation === "Аккаунт успешно создан" ? {color: "rgb(0, 82, 0)"} : {color: "rgb(87, 0, 0)"}} className="login_form__password_block__validation">{validation}</span>
                        </div>

                        <div className="login_form__login_block">
                            <span>У вас есть аккаунт?</span>
                            
                            <Link to="/login">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                                Войти
                            </Link>
                        </div>
                        
                        <div className="register_form__btn_block">
                            <button method="submit">Создать</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Register
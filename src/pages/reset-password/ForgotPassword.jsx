import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Header from "../../components/header/Header" 
import Footer from "../../components/footer/Footer"
import {BeatLoader} from "react-spinners"
import "./reset-password.css"
import axios from "axios"

const ForgotPassword = () => {
    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState()

    useEffect(() => {
        document.title = "Сброс пароля"
    }, [])

    const ResetPassword = async (event) => {
        setLoading(true)

        event.preventDefault()
        
        const response = await fetch("http://127.0.0.1:8000/auth/users/reset_password/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: event.target.email.value})
        })
        
        if(response.status === 204) {
            setValidation("Успешно отправлено")
        } else {
            setValidation("Не удалось отправить")
        }

        setLoading(false)

        setTimeout(() => {
            setValidation(null)
        }, 5000)
    }

    const sendToEmailResetPassword = (event) => {
        setLoading(true)

        event.preventDefault()

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/user/send-reset-password-to-email/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {email: event.target.email.value}
        }).then((response) => {
            if(response.status === 200) {
                setValidation("Успешно отправлено")
            }
        }).catch((error) => {
            if(error) {
                setValidation("Не удалось отправить")
            }
        })

        setLoading(false)

        setTimeout(() => {
            setValidation(null)
        }, 5000)
    }

    return (
        <div className="wrapper">
            <Header/>
            
            <div className="forgot_password">
                <div className="forgot_password__container">
                    <div className="container__forgot_name">
                        <span>Сброс пароля</span>

                        <span>Введите адрес электронной почты, связанный с вашей учетной записью, <br /> и мы вышлем вам ссылку для сброса пароля</span>
                    </div>

                    <div className="container__forgot_password_form">
                        <form onSubmit={sendToEmailResetPassword} method="post">
                            <input type="email" name="email" autoComplete="off" placeholder="Email" />
                            
                            <span style={validation === "Успешно отправлено" ? {color: "rgb(19, 78, 19)"} : {color: "rgb(112, 28, 28)"}} className="validation_of_forgot_password">{validation}</span>
                            
                            <button>
                                {
                                    loading 
                                        ?
                                    <BeatLoader
                                        color="rgba(238, 238, 238, 0.795)"
                                        size={5}
                                    />
                                        :
                                    <>Отправить</>
                                }
                            </button>            
                        </form>
                    </div>
                </div>
            </div>

            <Link className="go_back" to="/login">
                <svg className="go_back__svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                назад
            </Link>    

            <Footer/>
        </div>
    )
}

export default ForgotPassword
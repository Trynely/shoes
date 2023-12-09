import { useParams } from "react-router-dom"
import {toast} from 'sonner'
import Toast from "../../components/toast/Toast"
import {useState} from "react"

const ResetPassword = () => {
    const {uid, token} = useParams()
    const [validation, setValidation] = useState("")


    const Reset = async (event) => {
        event.preventDefault()

        const response = await fetch("http://127.0.0.1:8000/auth/users/reset_password_confirm/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({uid: uid, token: token, new_password: event.target.new_password.value, re_new_password: event.target.re_new_password.value})
        })

        if(response.status === 204) {
            setValidation("Пароль успешно изменён")
        } else {
            setValidation("Не удалось изменить пароль")
        }
    }

    console.log(validation)

    return (
        <div className="reset_password__by_link_email">
            <form onSubmit={Reset} method="post">
                <input type="password" name="new_password" placeholder="Новый пароль" />
                <input type="password" name="re_new_password" placeholder="Повтор нового пароля" />
                
                <span style={validation === "Пароль успешно изменён" ? {color: "rgb(68, 192, 68)"} : {color: "rgb(214, 78, 78)"}} className="validation_of_change_password">{validation}</span>

                <button>Сбросить</button>
            </form>

            <Toast />
        </div>
    )
}

export default ResetPassword
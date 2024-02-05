import axios from "axios"
import {useParams} from "react-router-dom"
import {useState} from "react"
import Toast from "../../components/toast/Toast"
import {toast} from 'sonner'

const ResetPassword = () => {
    const {token} = useParams()
    const [validation, setValidation] = useState("")

    const resetPassword = (event) => {
        event.preventDefault()

        const acess_token = token.replace(/–/g, '.')

        axios({
            method: "patch",
            url: `http://127.0.0.1:8000/user/reset-user-password/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + acess_token
            },
            data: {new_password: event.target.new_password.value}
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
        <div className="reset_password__by_link_email">
            <form onSubmit={resetPassword} method="patch">
                <input type="password" name="new_password" placeholder="Новый пароль" />
                
                <span style={validation === "Пароль успешно изменён" ? {color: "rgb(68, 192, 68)"} : {color: "rgb(214, 78, 78)"}} className="validation_of_change_password">{validation}</span>

                <button>Сбросить</button>
            </form>

            <Toast />
        </div>
    )
}

export default ResetPassword
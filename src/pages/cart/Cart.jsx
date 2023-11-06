import {useEffect} from "react"
import { useContext } from "react"
import Header from "../../components/header/Header"
import {AuthenticationContext} from "../../components/authentication/Authentication"

const Cart = () => {
    useContext(AuthenticationContext)

    useEffect(() => {
        document.title = "Корзина"
    }, [])

    return (
        <>
            <Header />
        </>
    )
}

export default Cart
import {useEffect, useState} from "react"

const Register = ()=> {
    const regUser = async (e)=> {
        try {
            e.preventDefault()
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: e.target.email.value, username: e.target.username.value, password: e.target.password.value})
            })

            let data = await response.json()

            if (response.ok === true) {
                console.log("Создано!")
            }
        } catch(error) {
            console.log("Ошибка >>", error)
        }
    }

    return (
        <form onSubmit={regUser}>
            <input type="text" name="email" placeholder="Enter email"/>
            <input type="text" name="username" placeholder="Enter username"/>
            <input type="password" name="password" placeholder="enter password"/>
            <input type="submit"/>
        </form>
    )
}

export default Register
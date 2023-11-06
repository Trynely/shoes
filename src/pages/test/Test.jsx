// import { useState, useEffect, createContext} from "react"
// import jwt_decode from "jwt-decode"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { CorsOptions } from "cors"
// import Cookies from 'js-cookie'

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.withCredentials = true

// function Test() {
//     useEffect(() => {
//         user()
//     }, [])


//     let _csrfToken = null

//     const getCsrfToken = async ()=> {
//         if (_csrfToken === null) {
//             const response = await fetch('http://127.0.0.1:8000/api/csrf/', {
//                 credentials: 'include',
//             })
//             const data = await response.json()
//             _csrfToken = data.csrfToken
//             console.log(data)
//         }
//         return _csrfToken
//     }

//     const user = async () => {
//         const response = await fetch("http://127.0.0.1:8000/api/user/", {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//         console.log(response)
//     }

//     const loginUser = async (e) => {
//         e.preventDefault()
//         const response = await fetch("http://127.0.0.1:8000/api/login/", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': await getCsrfToken()
//             },
//             body: JSON.stringify({email: e.target.email.value, password: e.target.password.value})
//         })
//         console.log(response)
//     }

// //     const regUser = async (e) => {
// //         try {
// //             e.preventDefault()
// //             const response = await fetch('http://127.0.0.1:8000/api/register/', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
// //                 },
// //                 body: JSON.stringify({email: e.target.email.value, username: e.target.username.value, password: e.target.password.value})
// //             })

// //             let data = await response.json()

// //             if (response.ok === true) {
// //                 console.log("Создано!")
// //             }
// //         } catch(error) {
// //             console.log("Ошибка >>", error)
// //         }
// //     }

//     return (
//         <>
//             <div className="login_container">
//                 <h1>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                 </h1>

//                 <form method="POST" onSubmit={loginUser}>
//                     <input className="" type="text" name="email" placeholder="Email"/>
//                     <input type="password" name="password" placeholder="Пароль"/>
//                     <button method="submit">Войти</button>
//                 </form>

//                 {/* <form onSubmit={regUser}>
//                     <input type="text" name="email" placeholder="Enter email"/>
//                     <input type="text" name="username" placeholder="Enter username"/>
//                     <input type="password" name="password" placeholder="enter password"/>
//                     <input type="submit"/>
//                 </form> */}

//                 {/* <button onClick={logoutUser}>Выйти</button> */}
//             </div>
//         </>
//     )
// }

// export default Test
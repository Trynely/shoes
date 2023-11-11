import { useState, useEffect, createContext} from "react"
import axios from "axios"

function Test() {
    const [ava, setAvater] = useState([])

    useEffect(() => {
        userThings()
    }, [])

    const userThings = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/things/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokens.access)
                }
            })
    
            let data = await response.json()
    
            if(response.status === 200) {
                setThings(data)
            } else if(response.statusText === "Unauthorized") {
                logOut()
                window.location.reload()
            }
                
        } catch(err) {
            console.log("error userthings >>", err)
        }
    }

    return (
        <div>
            {ava.map((thing, id) => (
                <p key={id}>{thing.title}</p>
            ))}
        </div>
    )
}

export default Test
import { useState, useEffect, createContext, useRef} from "react"
import "./test.css"

function Test() {
    useEffect(() => {
        const json = {"result":true, "count":42}
        const obj = JSON.stringify(json);
    }, [])
}

export default Test
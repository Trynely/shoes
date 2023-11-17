import {Toaster, toast} from "sonner"
import "./toast.css"
// import { useToaster, Toaster, toast} from "react-hot-toast"

const Toast = () => {
    return (
        <div className="toast_box">
            <Toaster toastOptions={{style: {position: "fixed", bottom: '110px', right: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(104, 132, 133)', border: 'none', boxShadow: '0 0 2px rgb(104, 132, 133)', fontFamily: 'Rubik', fontSize: '15px'}}} />

            {/* <Toaster
                position="bottom-right"
                reverseOrder={false}
            /> */}
        </div>
    )
}

export default Toast
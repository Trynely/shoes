import {PuffLoader, PulseLoader} from "react-spinners"
import "./loading.css"

const Loading = () => {
    return (
        <div className="loading_spinner"> 
            <PuffLoader
                color="rgb(104, 132, 133)"
                cssOverride={{}}
                size={90}
                speedMultiplier={1}
            />
        </div>
    )
}

export default Loading
//icon
import { HomeIcon , ArrowUturnLeftIcon } from "@heroicons/react/24/solid"
 
import { Link, useNavigate, useRouteError } from "react-router-dom"

const Error =()=>{
    const error = useRouteError()
    const navigate = useNavigate()
    return(
        <div className="error">
            <h1>Opps..! we have a problem.</h1>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md"></div>
            <button className="btn btn--dark" onClick={()=>navigate(-1)}>
                <ArrowUturnLeftIcon width={20}/>
                <span>Go back</span>
            </button>
            <Link
                to="/"
                className="btn btn--dark"
            >
                <HomeIcon width={20}/>
                <span>Go Home</span>
            </Link>
        </div>
    )
}
export default Error
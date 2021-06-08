import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function LoginRequired() {
    return <div className="w-screen h-screen bg-soft flex flex-col justify-center">
        <div className="min-w-1/3 mx-auto my-auto bg-white rounded-xl shadow-2xl pt-16 px-16 flex flex-col justify-between">
            <div>
                <h1 className="text-center font-thin text-4xl whitespace-nowrap">Spotify Login Required</h1>
                <h2 className="text-center font-light text-xl mt-6">To access this page you must login with spotify</h2>
            </div>
            <div className="flex flex-col justify-center mt-6 mb-4 text-center hover:opacity-60 group">
                <Link to="/"><FontAwesomeIcon icon="arrow-left" className="mr-2 text-thin text-sm transform translate-x-0 group-hover:-translate-x-1 transition-transform"/>Go Home</Link>
            </div>
            
        </div>
    </div>;
}
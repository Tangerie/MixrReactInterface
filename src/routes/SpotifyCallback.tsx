import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useApi } from "../helpers/AnalysisApi";
import { SetUserToken } from "../helpers/TokenManager";
import { MoonLoader } from "react-spinners";

/* When the user logs into Spotify they get redirected here
We scrape the token from the url params and pass it to the api
It registers it for us and gives us a token we can use as validation
We store that token in the cookie and refresh the application
*/
export default function SpotifyCallback() {
    const location = useLocation();
    const api = useApi();

    const [loadingState, setLoadingState] = useState<string>("");

    const queryParams = new URLSearchParams(location.search);

    const code = queryParams.get("code");
    const history = useHistory();

    useEffect(() => {
        if(!code || code == "") return;

        api.callback(code)
        .then(data => {
            SetUserToken(data);
            setLoadingState("done");
        }).catch(err => {
            console.log(err);
            setLoadingState("error");
        });

    }, [])

    if(loadingState == "error") {
        return <div className="w-screen h-screen bg-soft flex flex-col justify-center">
            <div className="min-w-1/3 mx-auto my-auto bg-white rounded-xl shadow-2xl pt-16 px-16 flex flex-col justify-between">
                <div>
                    <h1 className="text-center font-thin text-4xl whitespace-nowrap">Spotify Login Error</h1>
                    <h2 className="text-center font-light text-xl mt-6">There was an error logging you in</h2>
                    <button className="button-primary mx-auto block mt-5" onClick={() => {
                        window.location.href = "http://www.google.com";
                    }}>Retry</button>
                </div>
                <div className="flex flex-col justify-center mt-6 mb-4 text-center hover:opacity-60 group">
                    <Link to="/"><FontAwesomeIcon icon="arrow-left" className="mr-2 text-thin text-sm transform translate-x-0 group-hover:-translate-x-1 transition-transform"/>Go Home</Link>
                </div>
                
            </div>
        </div>;
    }
    if(loadingState == "done") {
        history.push("/");
        window.location.reload();
    }

    return <div className="w-screen h-screen bg-soft flex flex-col justify-center">
            <div className="min-w-1/3 mx-auto my-auto bg-white rounded-xl shadow-2xl pt-16 pb-16 px-16 flex flex-col justify-between">
                <div>
                    <div className="flex flex-row justify-center pb-10">
                        <MoonLoader color={"#129d43"} />
                    </div>
                    <h1 className="text-center font-thin text-4xl whitespace-nowrap">Registering Token</h1>
                    <h2 className="text-center font-light text-xl mt-6">Please Wait</h2>
                </div>
            </div>
        </div>;
}
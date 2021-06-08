import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { RevokeUserToken } from "../helpers/TokenManager";
import { useStore } from "../lib/GlobalStore";
import { PrivateUser } from "../models/Spotify";

import logoImg from "../img/logo.png";
import { RemoveTutorialCookie } from "./TutorialPopup";

interface IProps {
}

/* The navbar should automatically render itself on a page when a logged in user is detected
It should also change its style when scrolled to become smaller and sleeker
*/
export default function Navbar(props : IProps) {
    const [isTop, setIsTop] = useState(window.pageYOffset < 20);

    //Get the user profile
    const [profile] = useStore<PrivateUser>('profile');
    
    const history = useHistory();

    //Manage scroll events
    document.onscroll = () => {
        if(window.pageYOffset < 30) { //Is the page scrolled?
            if(!isTop) setIsTop(true);
        } else if(isTop) setIsTop(false);
    };

    //If the profile doesn't exist, dont display
    if(profile == null) return null;

    return <div className={`w-full fixed top-0 flex flex-row justify-end transition-all duration-300 shadow-lg ${isTop ? "text-black py-2 pr-12 h-16" : "text-black py-1.5 pr-8 h-14"}`}
        style={{
            backgroundColor: isTop ? "hsla(0, 0%, 100%, 0.7)" : "hsla(0, 0%, 95%, 1)",
            zIndex: 999
        }}>
            <div className="h-full flex flex-row justify-between w-full">
                <div></div>
                <div className="h-full flex flex-row">
                    <img src={profile.images != null ? profile.images[0].url : ""} className="rounded-full h-full p-1"/>
                    <div className="ml-4 font-light text-xl group flex flex-col justify-center">
                        <div>
                            <span>{profile.displayName} <FontAwesomeIcon icon="chevron-down" className="text-xs"/></span>
                            <div className="absolute right-4 top-14 text-base opacity-0 group-hover:opacity-100 bg-white p-2 text-left transition-all duration-300">
                                <ul className="leading-8">
                                    <li className="hover:text-brand-500 transition duration-200"><Link to="/">Home</Link></li>
                                    <li className="hover:text-brand-500 transition duration-200"><Link to="/dashboard">Dashboard</Link></li>
                                    <li className="hover:text-brand-500 transition duration-200"><Link to="/help/general/account">Help</Link></li>
                                    <li className="hover:text-brand-500 transition duration-200"><a className="cursor-pointer" href="/" onClick={() => {
                                        //Remove the user token if they logout
                                        RevokeUserToken();

                                        RemoveTutorialCookie();
                                    }}>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
}
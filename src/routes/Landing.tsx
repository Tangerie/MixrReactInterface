import React, { useEffect, useState } from "react";
import TextCarousel from "../components/TextCarousel";
import codeImg from "../img/spotify.png";
import chevronDown from "../img/chevron-down.svg";
import { LoremIpsum } from 'react-lorem-ipsum';

import Logo from "../img/logo.png";

import "./Landing.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from "../components/Navbar";
import { useStore } from "../lib/GlobalStore";
import { useHistory } from "react-router";
import { SetUserToken } from "../helpers/TokenManager";
import { PrivateUser, SpotifyImage } from "../models/Spotify";
import { useApi } from "../helpers/AnalysisApi";
import { MoonLoader } from "react-spinners";
import { Link } from "react-router-dom";

interface IProps {
}

export default function Landing(props : IProps) {
    const [profile, setProfile] = useStore<PrivateUser>('profile');

    const isLoggedIn = profile != null;

    //This is where we manage the image displayed
    const [randomImage, setRandomImage] = useState<SpotifyImage | null>(null);

    const [isAlbumVisible, setIsAlbumVisible] = useState(true);

    const api = useApi();
    

    useEffect(() => {
        //Get a random image from the api then set it
        api.cover.random().then(data => {
            const image = new Image();
            image.src = data.url;

            //Preload the image before displaying
            //Avoids flickering
            image.addEventListener("load", () => {
                setRandomImage(data);
            })
        });
        
        //When we scroll away from the change the visibility state of the album cover
        window.addEventListener("scroll", () => {
            const elem = document.getElementById("albumArt");
            if(elem == null) return;
            
            const rect = elem.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            const isVisible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);

            setIsAlbumVisible(isVisible);
        }, false);
    }, []);

    //Runs when visibility state of album cover changes
    useEffect(() => {
        if(!isAlbumVisible) {
            //Change the image when its out of view
            api.cover.random().then(data => {
                const image = new Image();
                image.src = data.url;
    
                image.addEventListener("load", () => {
                    setRandomImage(data);
                })
            });
        }
    }, [isAlbumVisible])

    const history = useHistory();

    return <div>
        <Navbar />
        <Link to="/help/general/account" className="block opacity-100 fixed bottom-10 right-10 z-50 bg-white pl-5 pr-5 text-center py-2 text-gray-700 rounded-full shadow-2xl text-xl font-light group hover:bg-gray-50 hover:opacity-95 transition duration-300 transform scale-100 hover:scale-95">
            <FontAwesomeIcon className="text-base my-auto" icon={["far", "question-circle"]} /> Help
        </Link>
        <div className="banner-gradient flex flex-col justify-around shadow-2xl" 
        style={{overflowY: "hidden"}}>
            <div className="flex flex-row justify-between">
                <div className="text-center flex flex-col justify-center w-1/2">
                    <h1 className="text-9xl font-thin text-center tracking-widest text-white">Mixr</h1>
                    <h2 className="text-2xl font-light text-center text-white">Find <em>Your </em> 
                        <TextCarousel phrases={["Mix", "Tune", "Jam", "Vibe", "Mood", "Bop", "Melody", "Music", "Blend"]} 
                        interval={3000}
                        direction="down"/>
                    </h2> 
                </div>
                <div className="p-20 w-1/2 flex flex-col justify-center">
                    <div className="p-2 bg-white w-10/12 rounded-xl">
                        <img className="rounded-lg" 
                        src={randomImage ? randomImage.url : ""} 
                        style={{
                            width: "100%",
                            paddingTop: randomImage ? "0" : "100%"
                        }} id="albumArt"/>
                    </div>
                </div>
            </div>
            <div className="mx-auto mb-4 chevron flex flex-row justify-center" onClick={() => {
                const el = document.getElementById("scrollTarget");
                if(el == undefined) return;
                const y = el.getBoundingClientRect().top + window.scrollY;
                window.scroll({
                    top: y,
                    behavior: 'smooth'
                });
            }}>
                <img src={chevronDown} height="40px" width="40px"/>
            </div>
        </div>
        
        <div className="px-20 py-16 flex flex-col justify-between" style={{minHeight: "100vh"}}>
            <div className="flex flex-row justify-between" id="scrollTarget">
                <div className="w-2/5">
                    <h2 className="heading-sub">What is <em>Mixr</em>?</h2>
                    <div className="ml-1 body-text mt-2 text-justify"><p>
                    Mixr is a service that aims to unify peoples music tastes. By comparing track's features such as energy, positivity and more the music taste of many users or playlists can be combined to create an equally enjoyable listening experience.
                    </p></div>
                </div>
            </div>
            
            <span className="page-break my-10"></span>

            <div className="flex flex-row justify-between">
                <div></div>
                <div className="w-2/5 text-right">
                    <h2 className="heading-sub">How Does <em>Mixr</em> Work?</h2>
                    <div className="ml-1 body-text mt-2 text-justify">
                    <p>
                    Mixr works by analysing the attributes of a song through the Spotify API. These attributes are mapped in seven dimensions and compared against others, this way more accurate reccomendations and mixes can be made.
                    </p>
                    </div>
                </div>
            </div>

            <button className="button-primary mx-auto block mt-10 group" onClick={() => {
                if(isLoggedIn) {
                    history.push("/dashboard");
                } else {
                    api.navigateToSpotifyLogin();
                }
            }}>
                <span className="mr-2">{isLoggedIn ? "Continue To Dashboard" : "Login To Spotify"}</span>
                <span className="my-auto text-sm"><FontAwesomeIcon icon="arrow-right" className="transform translate-x-0 group-hover:translate-x-1 transition-transform"/></span>
                </button>
        </div>
    </div>;
}
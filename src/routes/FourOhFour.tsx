import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function FourOhFour() {
    return <div className="bg-soft flex flex-col justify-center text-center my-auto h-full w-full fixed">
        <p className="text-8xl mb-2 tracking-widest font-thin">Four Oh Four</p>
        <p className="font-light text-xl">Page not found</p>
        <Link to="/" className="mt-4 font-light text-lg hover:opacity-40 transition-all">Go Home</Link>
    </div>
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface IProps {
    children? : any;
    direction : "left" | "right" | "top" | "bottom";
    className? : string;
}

//A help popup allows the easy creation of help popups for the online help section
//Each one has customisation options and is only active upon hovering
export default function HelpMousePopup(props : IProps) {
    const [isOver, setIsOver] = useState(false);

    const position = {
        "top": {
            left: "50%",
            transform: "translateX(-50%) translateY(-105%)"
        },

        "bottom": {
            left: "50%",
            transform: "translateX(-50%) translateY(15%)"
        },

        "left": {
            top: "50%",
            transform: "translateX(-108%) translateY(-50%)"
        },

        "right": {
            top: "50%",
            transform: "translateX(3%) translateY(-50%)"
        },
    }[props.direction];
    
    return <div className={`relative ml-2 inline text-sm not-italic text-left font-normal text-gray-500`}>
        <FontAwesomeIcon className={`text-xs ${props.className ? props.className : ""}`} icon="question-circle" onMouseOver={() => setIsOver(true)} onMouseOut={() => setIsOver(false)}/>
        <div className={`inline absolute p-4 text-white bg-black ${isOver ? "opacity-90" : "opacity-0"} transition-color duration-200`} style={{
            maxWidth: "20rem",
            minWidth: "15rem",
            zIndex: 999,
            pointerEvents: "none",
            ...position
        }}>
            {props.children}
        </div>
    </div>
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface IProps {
    children? : any;
    className? : string;
    initial? : boolean;
    title : string;
}

/* A dropdown section allows the developer to easily create dropdowns areas, containing other elements.
A dropdown should allow the user to expand and contract the area with ease, each section manages their own state
*/
export default function DropdownSection(props : IProps) {
    //The state of the dropdown
    const [isExpanded, setExpanded] = useState<boolean>(props.initial == undefined ? false : props.initial);

    return <div className={`mx-10 mb-4 ${props.className ? props.className : ""}`}>
        <div className="flex flex-row justify-between">
            <div className="border-b border-gray-600 w-full flex-shrink my-auto"></div>
            <span className="select-none text-gray-600 text-lg font-light mx-10 whitespace-nowrap hover:opacity-60 transition duration-200 cursor-pointer" onClick={() => setExpanded(!isExpanded)}>
                {props.title}
                <FontAwesomeIcon icon={isExpanded ? "caret-down" : "caret-up"} className="ml-4"/>
            </span>
            <div className="border-b border-gray-600 w-full flex-shrink my-auto"></div>
        </div>
        {isExpanded ?
        <div className={`px-6 py-3`}>
            {/* If expanded, pass the children through */}
            {props.children}
        </div> : null}
        
    </div>;
}
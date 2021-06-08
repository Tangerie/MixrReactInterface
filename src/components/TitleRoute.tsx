import { useEffect } from "react";
import { Route } from "react-router-dom";

interface IProps {
    title? : string;
    [key : string] : any;
}

/* Automatically changes the tile for a route and scrolls the window back to the top
*/
export default function TitleRoute(props : IProps) {
    const {title, ...others} = props;

    useEffect(() => {
        document.title = "Mixr | " + title;
        window.scrollTo(0, 0); //Scroll to top of page on load
    });

    return <Route {...others}/>
}
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

interface IProps {
    phrases : string[];
    interval : number;
    [key: string] : any;
}

/* This is the carousel seen on the landing page
It takes a list of phrases and a change time then smoothly transitions between them

Fun Fact: This was the first thing written for Mixr
*/
export default function TextCarousel(props : IProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
    const intervalId = setInterval(() =>
            //Updating the index forces a re-render
            setIndex(index => index + 1),
            props.interval
        );
        //We return this so react can destroy our interval for us
        return () => clearInterval(intervalId);
    }, []);
    return <span><TextTransition text={props.phrases[index % props.phrases.length]}
    springConfig={presets.wobbly}
    inline={true}
    {...props}/></span>;
}
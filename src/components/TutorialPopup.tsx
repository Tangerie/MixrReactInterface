import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, useMemo, useState } from "react";
import { ReactNode } from "react";
import Popup from "./Popup";

import cookie from 'react-cookies';

function CheckTutorialCookie(tutorialKey : string) : boolean {
    const tuts = cookie.load("tutorials");
    if(!tuts || (tuts as string[]).length == undefined) return false;
    return (tuts as string[]).indexOf(tutorialKey) > -1;
}

function AddTutorialCookie(tutorialKey : string) {
    const tuts = cookie.load("tutorials");
    if(!tuts || (tuts as string[]).length == undefined) {
        cookie.save("tutorials", JSON.stringify([tutorialKey]), {
            path: "/"
        });
    } else {
        cookie.save("tutorials", JSON.stringify([...tuts, tutorialKey]), {
            path: "/"
        });
    }
}

export function RemoveTutorialCookie() {
    cookie.remove("tutorials");
}


interface SlideProps {
    children? : any;
    headerEl? : any;
}

export function TutorialSlide(props : SlideProps) {
    return <>
    {props.headerEl}
    <div className="p-10 h-full mx-auto my-auto text-sm font-light mt-2">
        {props.children}
    </div>
    </>;
}

interface TutProps {
    children? : any;
    tutorialKey : string;
}

export default function TutorialPopup(props : TutProps) {
    const [curSlide, setCurSlide] = useState<number>(0);

    if(CheckTutorialCookie(props.tutorialKey) || curSlide < 0) return null;

    const getCurSlide = () => {
        let match : any = null;
        React.Children.forEach(props.children, (child : ReactElement, index : number) => {
            if(match == null && typeof child.type != "string" && index == curSlide) {
                match = child;
            }
        });
        return match;
    }

    const onSlideFinish = () => {
        AddTutorialCookie(props.tutorialKey);
        setCurSlide(-1);
    }
    
    return <Popup condition={true} canClose={false} className="p-0 flex flex-col" style={{
        maxHeight: "95vh",
        width: "auto",
        height: "auto",
        overflowY: "scroll",
    }}>
        {React.cloneElement(getCurSlide())}
        <div className="w-full flex flex-row justify-between mb-5 px-8">
            <button className="my-auto w-20 opacity-100 hover:opacity-60 group transition duration-200" onClick={() => {
                setCurSlide(Math.max(curSlide - 1, 0));
            }}>{curSlide == 0 ? null : <span>
                <FontAwesomeIcon className="mr-4 transform translate-x-0 group-hover:-translate-x-1 transition duration-200" icon="arrow-left"/>
                Back
                </span>
                }</button>
            <div className="flex flex-row my-auto mx-20">
                {
                    props.children.map((x : any, i : number) => {
                        return <div key={i} className={`w-2 h-2 rounded-full mx-2 cursor-pointer ${i == curSlide ? "bg-brand-500" : "bg-gray-500"}`} onClick={() => {setCurSlide(i)}}></div>
                    })
                }
            </div>
            <button className="w-20 my-auto opacity-100 hover:opacity-60 group transition duration-200" onClick={() => {
                if(curSlide == props.children.length - 1) {
                    onSlideFinish();
                } else {
                    setCurSlide(curSlide + 1);
                }
            }}>{curSlide == props.children.length - 1 ? "Done" : <span>
                Next
                <FontAwesomeIcon className="ml-4 transform translate-x-0 group-hover:translate-x-1 transition duration-200" icon="arrow-right"/>
                </span>}</button>
        </div>
    </Popup>;
}
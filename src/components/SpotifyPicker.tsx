import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useApi } from "../helpers/AnalysisApi";
import { GetUriType, PlaylistInfo, PrivateUser, PublicUser, TrackNode } from "../models/Spotify";

//A spotify picker allows the selection of spotify items (used on the dashboard screen)
//It also has customisation for the allowed items and the number

interface IProps {
    allowedTypes : ("User" | "Playlist" | "Track")[]; //Only allow certain types
    allowMultiple : boolean;
    onChange? : (items : SelectionItem[]) => void;
}

export interface SelectionItem {
    type: "User" | "Playlist" | "Track",
    data: PublicUser | PlaylistInfo | TrackNode
}

interface RowProps {
    onRemove : () => any,
    img : string;
    title : any;
    subTitle : any;
}

//A single item in the list
//Makes reusable modules
//Has an image, title, subtitle and remove button
function DisplayRow(props : RowProps) {
    return <li className="hover:bg-gray-300 rounded transition duration-200 group">
        <div className="px-2 py-4 flex flex-row">
            <img src={props.img} width="60px" className="rounded-md mr-4"/>
            <div className="flex flex-col justify-center">
                <span className="text-lg">{props.title}</span>
                <span className="text-gray-500 font-light">{props.subTitle}</span>
            </div>
            <div className="text-right flex-grow my-auto mr-2">
                <span className="cursor-pointer opacity-0 group-hover:opacity-80 text-gray-500 transition duration-200"
                onClick={props.onRemove}>
                        <FontAwesomeIcon icon="times"/>
                </span>
            </div>
        </div>
    </li>;
}

export default function SpotifyPicker(props : IProps) {
    //Keep a track of the items
    const [items, setItems] = useState<SelectionItem[]>([]);

    //Keep track of the errors, input and state
    const [errMsg, setErrMsg] = useState<string>("");
    const [input, setInput] = useState<string>("");
    const [loadingState, setLoadingState] = useState("");

    //We want to hook into the api
    const api = useApi();


    //A function to check the validity of the input string
    //Checks type aswell
    const isInputValid = () => {
        for(const t of props.allowedTypes) {
            if(input.startsWith(`spotify:${t.toLowerCase()}:`)) {
                return true;
            }
        }
        return false;
    }

    //Whenever the items change, call the onChange function passed in
    useEffect(() => {
        if(props.onChange == undefined) return;
        props.onChange(items);
    }, [items]);

    //Runs when the loading state changes
    useEffect(() => {
        //If we just moved to fetching, we have to start the fetch process
        if(loadingState == "fetching") {
            //Get the type of the URI
            const type = GetUriType(input);
            if(type == "") {
                setLoadingState("");
                setErrMsg("Invalid Type");
            } else {
                //The 3 different possible api calls and formatting
                //In each we fetch, store and set state
                if(type == "User") {
                    api.user(input).getProfile()
                    .then((data : PublicUser) => {
                        //Lets save that data and reset
                        setItems([...items, {
                            type: "User",
                            data: data
                        }]);
                        //Reset the loading state
                        setLoadingState("");
                        setInput("");
                        setErrMsg("");
                    })
                    .catch(() => {
                        //Oops something went wrong, just send the user a default error
                        setLoadingState("");
                        setInput("");
                        setErrMsg("Unable To Find User");
                    })
                } else if (type == "Playlist") {
                    api.playlist(input).getInfo()
                    .then((data : PlaylistInfo) => {
                        //Lets save that data and reset
                        setItems([...items, {
                            type: "Playlist",
                            data: data
                        }]);
                        setLoadingState("");
                        setInput("");
                        setErrMsg("");
                    })
                    .catch(() => {
                        //Oops something went wrong, just send the user a default error
                        setLoadingState("");
                        setInput("");
                        setErrMsg("Unable To Find Playlist");
                    })
                } else if (type == "Track") {
                    api.track(input).getNode()
                    .then((data : TrackNode) => {
                        //Lets save that data and reset
                        setItems([...items, {
                            type: "Track",
                            data: data
                        }]);
                        setLoadingState("");
                        setInput("");
                        setErrMsg("");
                    })
                    .catch(() => {
                        //Oops something went wrong, just send the user a default error
                        setLoadingState("");
                        setInput("");
                        setErrMsg("Unable To Find Track");
                    })
                }
                //We are waiting for a response
                setLoadingState("waiting");
            }

            
        }
    }, [loadingState])

    //When the + button is clicked
    const addClick = () => {
        //Check if the item is already added
        const found = items.find(x => x.data.uri == input);
        if(found) {
            setErrMsg(`${found.type} Already Added`);
            setInput("");
            return;
        }

        if(loadingState != "") return;

        //Start the fetching process
        setLoadingState("fetching");
    }


    //When we click remove
    const removeClick = (index : number) => {
        // Lets remove that one, we'll filter by index here to save computation etc 
        //Due to the nature of states, this must be completed in a single line
        //Its also the recommended way for modern javascript
        const plays = items.filter((a, j) => j != index);
        setItems(plays);
        setErrMsg("");
    }
    

    return <div className="w-full h-full">
        <div className="w-full">
            {items.length  == 0 ? <span className="text-center text-gray-600 block select-none">No Item{props.allowMultiple ? "s" : ""} Selected</span> : 
            <ul className="bg-gray-50 rounded px-2 py-2 mb-2">
            {
                items.map((x : SelectionItem, i) => {
                    //Manage the displaying of each type of item
                    //Pass them to the module at the top
                    if(x.type == "Playlist") {
                        x.data = x.data as PlaylistInfo;
                        return <DisplayRow 
                        key={i} 
                        img={x.data.coverImage.url}
                        subTitle={`${x.data.totalSongs} Songs`}
                        onRemove={() => {removeClick(i)}}
                        title={<span>{x.data.name} <span className="font-light text-sm">by {x.data.owner.displayName}</span></span>}/>;
                    } else if(x.type == "User") {
                        x.data = x.data as PublicUser;
                        return <DisplayRow 
                        key={i}
                        img={x.data.images ? x.data.images?.length > 0 ? x.data.images[0].url : "" : ""}
                        onRemove={() => {removeClick(i)}}
                        subTitle={x.data.id}
                        title={x.data.displayName}/>
                    } else if(x.type == "Track") {
                        x.data = x.data as TrackNode;
                        return <DisplayRow 
                        key={i}
                        img={x.data.coverImage.url}
                        onRemove={() => {removeClick(i)}}
                        subTitle={x.data.artists.join(", ")}
                        title={x.data.name}/>
                    }

                    return null;
                })
            }
            </ul>
            }
            
        </div>

        <div className="flex flex-col">
            <p className="text-red-500 text-sm font-light">{errMsg}</p>
            {items.length == 0 || (items.length > 0 && props.allowMultiple) ? 
            <div className="flex flex-row mt-2">
                <input type="text" placeholder={`Enter ${/*Fancy string comprehension*/props.allowedTypes.join("/")} URI`}
                className="transition duration-300 w-full rounded focus:border-brand-500 focus:ring-brand-500" 
                onChange={(e) => setInput(e.target.value)} value={input}/>

                <button className={`button-primary ml-3 pt-4 pb-3 w-4/12`} 
                disabled={loadingState != "" || !isInputValid()}
                onClick={addClick}>
                    {loadingState != "" ? <ScaleLoader color="#fff" width="0.15rem" height="60%"/>: <FontAwesomeIcon icon="plus" className=""/>}
                </button>
            </div> : null }
        </div>
    </div>;
}
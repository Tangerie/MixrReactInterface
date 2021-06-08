import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApi } from "../helpers/AnalysisApi";
import { useStore } from "../lib/GlobalStore";
import { GetUriType, NodeSet, PlaylistInfo, PrivateUser, PublicUser, TrackNode } from "../models/Spotify";
import Navbar from "../components/Navbar";
import SpotifyScatter, { NodeAxis } from "../components/SpotifyScatter";
import DropdownSection from "../components/DropdownSection";
import HelpMousePopup from "../components/HelpMousePopup";
import TutorialPopup, { TutorialSlide } from "../components/TutorialPopup";

import analysisSettings from "../img/help/analysisSettings.gif";
import nodeSize from "../img/help/nodeSize.gif";
import nodeHover from "../img/help/nodeHover.gif";

interface SelectorProps {
    initial : NodeAxis,
    onChange : (val : NodeAxis) => void,
    notAllowed : NodeAxis,
}

//The axis selector dropdown
//Auto manages disabling the invalid options
function AxisSelector(props : SelectorProps) {
    const [value, setValue] = useState<NodeAxis>(props.initial);

    useEffect(() => {
        props.onChange(value);
    }, [value])

    return <select value={value} onChange={(event) => {
        if(event.target.value == props.notAllowed) return;
        setValue(event.target.value as NodeAxis)
    }}
    className="transition inline-block duration-300 w-full rounded focus:border-brand-500 focus:ring-brand-500">
        <option value="acousticness" disabled={props.notAllowed == "acousticness"}>Acousticness</option>
        <option value="danceability" disabled={props.notAllowed == "danceability"}>Danceability</option>
        <option value="energy" disabled={props.notAllowed == "energy"}>Energy</option>
        <option value="instrumentalness" disabled={props.notAllowed == "instrumentalness"}>Instrumentalness</option>
        <option value="liveness" disabled={props.notAllowed == "liveness"}>Liveness</option>
        <option value="speechiness" disabled={props.notAllowed == "speechiness"}>Speechiness</option>
        <option value="valence" disabled={props.notAllowed == "valence"}>Valence</option>
    </select>
}

/*
The items analyser page
*/
export default function ItemsAnalyzer() {
    const api = useApi();
    const location = useLocation();
    const [profile] = useStore<PrivateUser>("profile");

    const [nodeSets, setNodeSets] = useState<NodeSet[]>([]);

    //The default axis
    const [graphAxis, setGraphAxis] = useState({
        x: "acousticness",
        y: "danceability"
    })

    //Default node size
    const [nodeSizeSlider, setNodeSizeSlider] = useState(5);

    //Get the uris from the url query parameters
    const uris = new URLSearchParams(location.search).get("uris")?.split(",");

    useEffect(() => {
        //The function can't run if this condition is false
        if(profile == null || uris == null || nodeSets.length != 0) {
            return;
        }

        for(const uri of uris) {
            const type = GetUriType(uri);

            //For each type, complete the correct fetch and adding to the list
            if(type == "Playlist") {
                //Get playlist info
                //Get playlist nodes
                api.playlist(uri).getNodeSet().then(data => {
                    // We have to use the function form of setState here
                    // This is because the state has likely changed since this was initiated
                    // Data is "applied" to the state instead of set to it
                    setNodeSets(sets => [...sets, {
                        nodes: data.nodes,
                        origin: data.info,
                        type: "Playlist"
                    }]);
                }).catch(err => {

                })
            } else if(type == "Track") {
                //Get track node 
                api.track(uri).getNode().then(data => {
                    setNodeSets(sets => [...sets, {
                        nodes: [data],
                        origin: data,
                        type: "Track"
                    }]);
                }).catch(err => {

                });
            } else if(type == "User") {
                //Get user details
                //Get user nodes
                api.user(uri).getProfile().then(profile => {
                    api.user(uri).getNodeSets().then(playlistSets => {
                        setNodeSets(sets => [...sets, {
                            nodes: playlistSets.map(x => x.nodes).flat(),
                            origin: profile,
                            type: "User"
                        }])
                    })
                });
            }
        }

        //console.log(uris);
    }, []);
    
    return <div>
        <Navbar/>
        <TutorialPopup tutorialKey="analyse">
            <TutorialSlide>
                <h1 className="text-2xl font-light text-center" style={{
                    width: "50vw"
                }}>Analysing/Comparing Items</h1>

                <p className="mt-4">Once the items have finished loading (indicated under the page title), a graph with nodes will appear. Each node on this graph is representative of a single track or a track in a collection(playlist or user).
                <br/><br/>All the items in the current analysis can be found at the top of the page</p>
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${nodeHover})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">The Graph</h1>
                <p className="mt-4">The nodes are plotted by 7 attributes (detailed in user manual) which can be configured to appear on various axis.
                The colour of a node designates its origin collection(user, playlist or track) which is visible by a key on the bottom right.
                <br/><br/>Hovering over a node provides information about its origins and its attributes</p>
                
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${analysisSettings})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Configuring Axis</h1>
                <p className="mt-4">The x and y axis can be configured to represent different attributes of the nodes. The 7 axis are listed in more detail in the user manual.<br/><br/>
                The axis can be configured in the <em>Axis Settings</em> dropdown found under the title. Each axis is controlled through the dropdown menus. Upon changing the axis, the graph will update to represent the new configuration</p>
                <em className="block mt-4">The x and y axis cannot represent the same attribute (i.e. the x and y axis cannot both be set to 'Energy')</em>
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${nodeSize})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Changing Node Size</h1>
                <p className="mt-4">The nodes radius may be changed via a slider found in the <em>Extra Graph Settings</em> dropdown.</p>
            </TutorialSlide>
        </TutorialPopup>
        <div className="flex flex-col justify-center pt-28 bg-soft" 
        style={{minHeight: "30vh"}}>
            <div className="mx-auto text-center text-black font-light text-3xl flex flex-col">
                <em className="font-thin text-8xl">Analyzer</em><br/>
                <ul>
                    {
                        nodeSets.length == 0 ? <li>Loading Nodes</li> : nodeSets.map((x , i)=> {
                            if(x.type == "Playlist") {
                                x.origin = x.origin as PlaylistInfo;
                                return <li key={i} className="text-2xl">
                                    <span className="text-lg">[Playlist]</span> {x.origin.name} <span className="text-xl ml-1 italic">By {x.origin.owner.displayName}</span>
                                </li>
                            } else if(x.type == "Track") {
                                x.origin = x.origin as TrackNode;
                                return <li key={i} className="text-2xl">
                                    <span className="text-lg">[Track]</span> {x.origin.name} <span className="text-xl ml-1 italic">By {x.origin.artists.join(", ")}</span>
                                </li>
                            } else if(x.type == "User") {
                                x.origin = x.origin as PublicUser;
                                return <li key={i} className="text-2xl">
                                    <span className="text-lg">[User]</span> {x.origin.displayName} <span className="text-xl ml-2 italic">{x.origin.followers?.total} Followers</span>
                                </li>
                            }
                            
                        })
                    }
                    {
                        nodeSets.length == uris?.length ? null : <li className="mt-1 text-base font-light">
                            Loading {uris ? uris?.length - nodeSets.length : 0} More... (This may take a while)
                        </li>
                    }
                </ul>
            </div>
        </div>
        <div className="px-20 pt-16 pb-10">
            <DropdownSection title="Axis Settings" initial={true}>
                <div className="flex flex-col justify-between">
                    <span className="block mx-auto mb-4">Set the axis to display on the graph 
                        <HelpMousePopup direction="top">
                            You may only set 2 axis at once.<br/>
                            See the help page for more details about each node's attributes
                        </HelpMousePopup>
                    </span>
                    <div className="w-2/5 flex flex-row mb-4 mx-auto">
                        <span className="whitespace-nowrap mr-4 flex my-auto">X Axis</span>
                        <AxisSelector 
                        initial={graphAxis.x as NodeAxis}
                        onChange={(val) => setGraphAxis({...graphAxis, x: val})} 
                        notAllowed={graphAxis.y as NodeAxis}/>
                    </div>
                    <div className="w-2/5 flex flex-row mx-auto">
                        <span className="whitespace-nowrap mr-4 my-auto">Y Axis</span>
                        <AxisSelector 
                        initial={graphAxis.y as NodeAxis}
                        onChange={(val) => setGraphAxis({...graphAxis, y: val})} 
                        notAllowed={graphAxis.x as NodeAxis}/>
                    </div>
                </div>
            </DropdownSection>
            <br/>
            <DropdownSection title="Extra Graph Settings" initial={false}>
                <div className="flex flex-row w-2/5 mx-auto">
                    <span className="whitespace-nowrap mr-4 flex my-auto">Node Size</span>
                    <input type="range" min={2} step="any" max={20} value={nodeSizeSlider} 
                    className="w-full appearance-none bg-gray-300 rounded-full h-2 my-auto" 
                    onChange={(event) => setNodeSizeSlider(event.target.valueAsNumber)}></input>
                </div>
                
            </DropdownSection>
            
            <div className="w-full h-screen pt-32">
                <div className="w-full h-full bg-white rounded shadow-2xl pb-10">
                    <SpotifyScatter 
                    nodeSets={nodeSets}
                    xAxis={graphAxis.x as NodeAxis}
                    yAxis={graphAxis.y as NodeAxis}
                    nodeSize={nodeSizeSlider}
                    />
                </div>
            </div>
        </div>
    </div>;
}
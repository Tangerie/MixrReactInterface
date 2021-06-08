import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { MoonLoader } from "react-spinners";
import { isPropertySignature } from "typescript";
import DropdownSection from "../components/DropdownSection";
import HelpMousePopup from "../components/HelpMousePopup";
import Navbar from "../components/Navbar";
import Popup from "../components/Popup";
import TutorialPopup, { TutorialSlide } from "../components/TutorialPopup";
import { useApi } from "../helpers/AnalysisApi";
import { useStore } from "../lib/GlobalStore";
import { PlaylistInfo, PrivateUser, TrackNode } from "../models/Spotify";

import refreshMix from "../img/help/refreshMix.gif";
import createPlaylist from "../img/help/createPlaylist.gif";
import expandSettings from "../img/help/expandSettings.gif";

/*
The mix playlist page
*/
export default function MixPlaylists() {
    const api = useApi();
    const [profile] = useStore<PrivateUser>("profile");
    
    const [playlists, setPlaylists] = useState<PlaylistInfo[] | null>(null);
    const [nodes, setNodes] = useState<TrackNode[] | null>(null);

    //The settings for the page
    const [divisions, setDivisions] = useState(5);
    const [noSongs, setNoSongs] = useState(50);

    //Loading and creating state
    const [isCreatingPlaylist, setCreatingPlaylist] = useState(false);
    const [createdPlaylist, setCreatedPlaylist] = useState<PlaylistInfo | null>(null);

    const location = useLocation();

    //console.log(Array.from(playlists.values()));

    useEffect(() => {
        if(profile == null || nodes != null) {
            return;
        }
        //Get the data for all the playlist uris provided
        const uris = new URLSearchParams(location.search).get("uris");
        if(uris) {
            if(playlists == null) {
                api.playlists(uris.split(",")).getInfo().then(data => {
                    setPlaylists(data);
                }).catch(err => {
                    console.error(err);
                });
            }

            api.playlists(uris.split(",")).mix(divisions, noSongs).then(data => {
                setNodes(data);
            }).catch(err => {
                console.error(err);
            })
        }
        
    }, [profile, nodes]);

    useEffect(() => {
        //If we need to start the creation process
        //Send an api request and wait for the response
        if(isCreatingPlaylist && createdPlaylist == null && nodes != null && playlists != null) {
            //Create Playlist
            
            const name : string = playlists?.map((x, i) => {
                const av = x.name.split(" ");
                av.sort((a, b) => b.length - a.length);
                return av[0];
            }).sort(() => Math.random() - 0.5).join(" ");

            api.create.playlist({
                ids: nodes?.map(x => x.id),
                name: name
            }).then(data => {
                setCreatedPlaylist(data);
            }).catch(err => {
                console.error(err);
                setCreatingPlaylist(false);
            })
        }
    }, [isCreatingPlaylist]);

    return <div>
        <Navbar/>
        <TutorialPopup tutorialKey="mix">
            <TutorialSlide>
                <h1 className="text-2xl font-light text-center" style={{
                    width: "50vw"
                }}>Mixing Playlists</h1>

                <p className="mt-4">This is the mixing page. From here you can view your mixed tracks, tweak the mixing settings and create a playlist from the mixing tracks<br/><br/>
                The next sections will guide you through the controls available on this page</p>
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${refreshMix})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Refreshing Your Mix</h1>
                <p className="mt-4">Refreshing a mix can be done by clicking the green refresh button as shown above.<br/><br/>
                It's important to note that refreshing does not guarantee new songs, it simply tweaks a few variables in the song selection algorithm, this will most likely result in a new order of songs.</p>
                
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl opacity-80" style={{
                    backgroundImage: `url(${createPlaylist})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Creating a Playlist</h1>
                <p className="mt-4">A playlist can be created from the mixed songs by clicking the create playlist button. This will being to create a new playlist. The name will be generated from the input playlists and the result can be found in your Spotify playlists.</p>
                
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl opacity-80" style={{
                    backgroundImage: `url(${expandSettings})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Configuring Settings</h1>
                <p className="mt-4">There are two settings that can be configured to change the mixing process of your playlists. These settings can be found by clicking on the dropdown area called "settings"<br/><br/>
                After tweaking these settings, click refresh to see their effects</p>
                
                <em className="block mt-4">More detailed information can be located in the user manual</em>
            </TutorialSlide>
        </TutorialPopup>
        <div className="flex flex-col justify-center pt-28" 
        style={{minHeight: "30vh"}}>
            <div className="mx-auto text-center text-black font-light text-3xl flex flex-col">
                <h1 className="font-thin text-8xl">Mix Playlists</h1><br/>
                <ul>
                    {
                        playlists == null ? <li>Loading Playlists</li> : playlists.map((x , i)=> {
                            return <li key={i} className="text-2xl">
                                {x.name} <span className="text-xl ml-2 italic">By {x.owner.displayName}</span>
                                {i != playlists.length - 1 ? <span className="block text-2xl font-light">x</span> : null}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
        <div className="px-20 pt-16 pb-10">
            <DropdownSection initial={false} title="Settings">
                <table>
                    <tbody>
                        <tr>
                            <td className="pb-8"><span className="block my-auto mr-4 text-xl w-42 text-right">Divisions
                            <HelpMousePopup direction="top">
                                Increasing can improve accuracy in bigger playlists.<br/>
                                In smaller playlists this should be kept between 3 and 6
                            </HelpMousePopup>
                            </span></td>
                            <td className="pb-8"><input className="transition duration-300 rounded focus:border-brand-500 focus:ring-brand-500" type="number" value={divisions} onChange={(e) => setDivisions(e.target.valueAsNumber)}/></td>
                        </tr>
                        <tr>
                            <td><span className="block my-auto mr-4 text-xl w-42 text-right">Minimum # of Songs</span></td>
                            <td><input className="transition duration-300 rounded focus:border-brand-500 focus:ring-brand-500" type="number" value={noSongs} onChange={(e) => setNoSongs(e.target.valueAsNumber)}/></td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-yellow-500 mt-4 text-sm italic">Click refresh to apply changes</p>
            </DropdownSection>
            {
                nodes ? <>
                <h1 className="text-center text-3xl heading-sub mb-8 ml-4">{nodes?.length} Tracks</h1>
                <div className="flex flex-row w-full justify-start px-4">
                    <button className="button-secondary rounded-full group" onClick={() => {setNodes(null); setCreatedPlaylist(null)}}>
                        <div className="block my-auto"><FontAwesomeIcon icon="redo-alt" className="transform group-hover:rotate-45 transition duration-300" /> Refresh</div>
                    </button>
                    
                    <button className="button-primary ml-10" onClick={() => setCreatingPlaylist(true)}>Create Playlist</button>
                </div>
                <span className="block mt-4 ml-4 italic font-light">Refreshing doesn't guarantee new songs 
                    <HelpMousePopup direction="top">
                        Refreshing only randomises a few small internal calculations, but this does not always guarantee new songs
                    </HelpMousePopup>
                </span>
                <ul className="mt-4 bg-white shadow-xl p-5 rounded-md">
                    {
                        nodes.map((node : TrackNode, i) => {
                            return <li key={i} className="hover:bg-gray-300 rounded transition duration-200 group">
                                <div className="px-2 py-4 flex flex-row">
                                    <img src={node.coverImage.url} width="60px" className="rounded-md mr-4"/>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-lg">{node.name} <span className="font-light text-sm">by {node.artists.join(", ")}</span></span>
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul></> : <div className="w-full h-full flex flex-col justify-center">
                    <div className="flex flex-row justify-center pt-10">
                        <MoonLoader color={"#129d43"} />
                    </div>
                    <h1 className="text-center mt-6 text-6xl font-light">Mixing</h1>
                    <p className="text-center font-light italic mt-4">Please wait... This might take a few seconds</p>
                </div>
            }
        </div>
        <Popup condition={isCreatingPlaylist && createdPlaylist == null} canClose={false}>
            <div className="w-full h-full flex flex-col justify-center">
                <div className="flex flex-row justify-center">
                    <MoonLoader color={"#129d43"} />
                </div>
                <h1 className="text-center mt-6 text-4xl font-light">Creating Playlist</h1>
                <p className="text-center font-light italic mt-4">This might take a few seconds</p>
            </div>
        </Popup>

        <Popup condition={isCreatingPlaylist && createdPlaylist != null} onClose={() => {setCreatingPlaylist(false)}} canClose={true}>
            <div className="w-full h-full flex flex-col justify-center">
                <h1 className="text-center mb-4 text-4xl font-light">Created Playlist</h1>
                <p className="text-center font-light">{createdPlaylist?.name}</p>
                <button className="button-secondary mt-4 w-1/3 mx-auto" onClick={() => setCreatingPlaylist(false)}>Close</button>
            </div>
        </Popup>
    </div>;
}
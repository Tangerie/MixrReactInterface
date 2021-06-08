import React, { useEffect, useState } from "react";
import LoremIpsum from "react-lorem-ipsum";
import { useHistory } from "react-router";
import HelpMousePopup from "../components/HelpMousePopup";
import Navbar from "../components/Navbar";
import SpotifyPicker, { SelectionItem } from "../components/SpotifyPicker";
import TutorialPopup, { TutorialSlide } from "../components/TutorialPopup";
import { useApi } from "../helpers/AnalysisApi";
import { useStore } from "../lib/GlobalStore";
import { PlaylistInfo, PrivateUser, SpotifyImage } from "../models/Spotify";

import playlistUri from "../img/help/Playlist_Uri.gif";
import userUri from "../img/help/Profile_Uri.gif";
import trackUri from "../img/help/Track_Uri.gif";
import addTrack from "../img/help/addTrack.gif";
import addToAnalyse from "../img/help/addToAnalyse.gif";

export default function Dashboard() {
    const [profile] = useStore<PrivateUser>("profile");

    //The data items in the two selectors
    const [mixPlaylists, setMixPlaylists] = useState<PlaylistInfo[]>([]);
    const [analyseItems, setAnalyseItems] = useState<SelectionItem[]>([]);

    const history = useHistory();

    return <div>
        <Navbar />
        <TutorialPopup tutorialKey="dashboard">
            <TutorialSlide>
                <h1 className="text-2xl font-light text-center" style={{
                    width: "50vw"
                }}>Welcome to Mixr</h1>
                <p className="mt-4">This is the dashboard, from here you can start mixing playlists and analysing playlists, users and tracks</p>
                
                <strong className="mt-4 block">Mixing</strong>
                <p className="mt-1">Mixing playlists aims to combine the aesthetic of two or more playlists. This is best done with small similar playlists or larger playlists with "overlapping" aesthetics</p>

                <strong className="mt-4 block">Analysing</strong>
                <p className="mt-1">Item analysis allows the user to graph various aspects of a single track, tracks in a playlist or the total tracks in all of a user's playlists.</p>

                <strong className="mt-4 block">URIs</strong>
                <p className="mt-1">
                    To find tracks on Spotify, Mixr uses URIs to identify playlists, users and tracks.
                </p>

                <p className="mt-4 italic">Continue to learn how to find a URIs for playlists, users and tracks<br/><br/>
                More detailed information can be found in the user manual</p>
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${playlistUri})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "bottom",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Getting a Playlist URI</h1>
                <ol className="mt-4 list-decimal">
                    <li>Locate desired playlist</li>
                    <li>Right click item <strong>or</strong> left click options menu</li>
                    <li>Hover over <em>share</em></li>
                    <li>Hold Alt <em className="text-sm">(on Mac)</em> <strong>or</strong> Ctrl <em className="text-sm">(on Windows)</em></li>
                    <li>Left click <em>Copy Spotify URI</em></li>
                </ol>
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${userUri})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Getting a User URI</h1>
                <ol className="mt-4 list-decimal">
                    <li>Locate desired user's profile page</li>
                    <li>Left click options menu under profile image</li>
                    <li>Hold Alt <em className="text-sm">(on Mac)</em> <strong>or</strong> Ctrl <em className="text-sm">(on Windows)</em></li>
                    <li>Left click <em>Copy Spotify URI</em></li>
                </ol>
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${trackUri})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Getting a Track URI</h1>
                <ol className="mt-4 list-decimal">
                    <li>Right click on desired song</li>
                    <li>Hold Alt <em className="text-sm">(on Mac)</em> <strong>or</strong> Ctrl <em className="text-sm">(on Windows)</em></li>
                    <li>Hover over <em>share</em></li>
                    <li>Left click <em>Copy Spotify URI</em></li>
                </ol>
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${addTrack})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "top",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Making a Mix</h1>
                <p className="mt-4">At least 2 playlists are required to make a mix</p>
                <strong className="mt-4 block">Adding Playlists</strong>
                <ol className="mt-2 list-decimal">
                    <li>Locate the URI for the playlist</li>
                    <li>Paste the URI in the input box</li>
                    <li>Click the + button</li>
                    <li>After a few seconds the playlist should appear in the list above</li>
                </ol>
                <p className="mt-4">After adding all the desired playlists have been added, click <em>Mix</em></p>

                <em className="block mt-4">Note: An item can be removed from the list by first hovering over the item then clicking the 'X' button on the right</em>
            </TutorialSlide>

            <TutorialSlide headerEl={
                <div className="rounded-t-lg shadow-2xl" style={{
                    backgroundImage: `url(${addToAnalyse})`,
                    backgroundSize: "cover",
                    backgroundPositionY: "center",
                    height: "50vh",
                    width: "50vw"
                }}>
                </div>
            }>
                <h1 className="text-2xl font-light text-center">Analysing/Comparing Items</h1>
                <p className="mt-4">Any number of users, playlists or tracks can be compared but there must be at least one</p>
                <strong className="mt-4 block">Adding Items</strong>
                <ol className="mt-2 list-decimal">
                    <li>Locate the URI for the desired item</li>
                    <li>Paste the URI in the input box</li>
                    <li>Click the + button</li>
                    <li>After a few seconds the item should appear in the list above</li>
                </ol>
                <p className="mt-4">After adding all the desired items have been added, click <em>Analyse Items</em></p>

                <em className="block mt-4">Note: An item can be removed from the list by first hovering over the item then clicking the 'X' button on the right</em>
            </TutorialSlide>
        </TutorialPopup>
        <div className="banner-gradient flex flex-col justify-center shadow-2xl" 
        style={{minHeight: "70vh", height: "30rem", overflowY: "hidden"}}>
            <div className="mx-auto text-center text-white font-light text-3xl flex flex-col">
                Welcome to<br/>
                <em className="font-thin text-8xl">Mixr</em><br/>
                <span className="text-xl italic transition-all">Lets get started</span>
            </div>
        </div>
        <div className="px-20 pt-10 pb-10">
            <h1 className="text-center text-3xl heading-sub mb-8">Mix Playlists</h1>
            <div className="flex flex-row justify-between text-justify mb-20">
                <div className="w-2/5">
                    <div className="w-full p-10 bg-white shadow-2xl rounded-md flex flex-col justify-between border-2 border-gray-50">
                        <SpotifyPicker allowedTypes={["Playlist"]} allowMultiple={true} onChange={(data) => setMixPlaylists(data.map(x => (x.data as PlaylistInfo)))}/>
                        <button className="button-primary mt-3" disabled={mixPlaylists.length < 2} onClick={() => {
                            history.push("/mix?uris=" + mixPlaylists.map(x => x.uri).join(","));
                        }}>
                            
                            {mixPlaylists.length < 2 ? <>Add Playlists To Mix<HelpMousePopup direction="top" className="text-white mr-2">
                                At least 2 playlists are required to start mixing
                            </HelpMousePopup></> : "Mix"}
                        </button>
                    </div>
                </div>
                <div className="w-2/5 flex flex-col justify-center">
                    <p className="text-lg text-justify">Add playlists to this list to create a mix from them. The algorithm will attempt to create a new playlist with songs from both that better matches the music taste of both. <em className="block mt-4">See the help page for how to add URIs</em></p>
                </div>
            </div>

            <h1 className="text-center text-3xl heading-sub mb-8">Analyse/Compare Items</h1>
            <div className="flex flex-row justify-between text-justify">
                <div className="w-2/5 flex flex-col justify-center">
                    <p className="text-lg">Add playlists, users or tracks to this list to compare their attributes. An interactive graph will be created from these and you will be able to see the spatial relations of nodes. <em className="block mt-4">See the help page for how to add URIs</em></p>
                </div>
                <div className="w-2/5">
                    <div className="w-full p-10 bg-white shadow-2xl rounded-md flex flex-col justify-between border-2 border-gray-50">
                        <SpotifyPicker allowedTypes={["Playlist", "User", "Track"]} allowMultiple={true} onChange={(data) => setAnalyseItems(data)}/>
                        <button className="button-primary mt-3" disabled={analyseItems.length == 0} onClick={() => {
                            history.push("/analyze?uris=" + analyseItems.map(x => x.data.uri).join(","));
                        }}>
                            {analyseItems.length == 0 ? "Select Items to Analyze" : `Analyse Items`}
                        </button>
                    </div>
                </div>
                
            </div>
        </div>


    </div>
}
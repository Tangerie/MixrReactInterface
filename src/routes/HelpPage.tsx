import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import LoremIpsum from "react-lorem-ipsum";
import { Link, NavLink, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import navbarImg from "../img/help/menu_bar.png";
import playlistUri from "../img/help/Playlist_Uri.gif";
import playlistUri2 from "../img/help/Playlist_Uri_2.gif";
import userUri from "../img/help/Profile_Uri.gif";
import trackUri from "../img/help/Track_Uri.gif";
import addTrack from "../img/help/addTrack.gif";
import refreshMix from "../img/help/refreshMix.gif";
import createPlaylist from "../img/help/createPlaylist.gif";
import expandSettings from "../img/help/expandSettings.gif";
import addToAnalyse from "../img/help/addToAnalyse.gif";
import analysisGraph from "../img/help/analysisGraph.png";
import analysisTitle from "../img/help/analysisTitle.png";
import analysisSettings from "../img/help/analysisSettings.gif";
import nodeSize from "../img/help/nodeSize.gif";
import nodeHover from "../img/help/nodeHover.gif";

interface SectionProps {
    children?: any;
    section? : string;
    subsection? : string;
}

function HelpSection(props : SectionProps) {
    const { section, subsection } = useParams<any>();


    //If the section/subsection matches, we want to display it
    //Allows us to emulate new pages without actually creating pages
    if((!props.section || section == props.section)&& (!props.subsection || subsection == props.subsection)) {
        return props.children;
    }

    return null;
}

/*
Not much to document here
Mostly just instructions
*/
export default function HelpPage() {
    const liClass = "mb-3 opacity-60 hover:opacity-100 w-full -ml-3 pl-4 pr-24 py-1 block transition duration-200 rounded-md whitespace-nowrap select-none"
    const liActiveClass = "bg-green-200 text-green-800 opacity-100";
    const headingClass = "text-lg mb-2 -ml-1 block font-medium select-none";

    const { section, subsection } = useParams<any>();

    return <div className="w-full min-h-screen text-justify">
        <Navbar/>
        <div className="w-full min-h-screen flex flex-row justify-between">
            <div className="min-h-screen w-min max-w-sm text-lg font-light mr-60">
                <div className="h-screen pt-24 flex flex-col justify-between fixed bg-white shadow-2xl pl-8 pr-8">
                <ul className="w-full">
                    <li className="border-b border-gray-300 mb-2">
                        <span className={`${headingClass}`}>General</span>
                        <NavLink className={`${liClass}`} activeClassName={`${liActiveClass}`} to="/help/general/account">Account</NavLink>
                        <NavLink className={`${liClass}`} activeClassName={`${liActiveClass}`} to="/help/general/navigation">Navigation</NavLink>
                    </li>
                    <li className="mb-2">
                        <span className={`${headingClass}`}>Functionality</span>
                        <NavLink className={`${liClass}`} activeClassName={`${liActiveClass}`} to="/help/functions/spotify">Spotify</NavLink>
                        <NavLink className={`${liClass}`} activeClassName={`${liActiveClass}`} to="/help/functions/mixing">Mixing</NavLink>
                        <NavLink className={`${liClass}`} activeClassName={`${liActiveClass}`} to="/help/functions/analysing">Analysing</NavLink>
                    </li>
                </ul>
                <Link to="/" className="mb-10 opacity-100 hover:opacity-60 transition group"><FontAwesomeIcon className="text-sm text-gray-700 transform translate-x-0 group-hover:-translate-x-1 transition-transform" icon="arrow-left"/> Home</Link>
                </div>
            </div>
            <div className="h-full w-full pt-24 pl-24 pr-36">
                <HelpSection section="general">
                    <h1 className="text-4xl font-light">General</h1>
                    <h3 className="text-gray-500 font-light text-xl mt-1">Utilities and Basics</h3>
                    <div className="h-0 w-full border-b border-gray-300 px-auto mx-10 mt-3 pb-5"></div>
                    <div className="px-4 py-6 text-lg font-light">
                        <HelpSection subsection="account">
                            <h2 className="heading-sub text-2xl mb-2 -ml-4">Logging In</h2>
                            <div className="mx-auto px-8">
                                <p>In order to use Mixr, you must first give permissions from Spotify. This can be done from the <Link to="/" className="underline">home page</Link>.</p>
                                <p>At the bottom of the page locate the button</p>
                                <div className="white-box mx-auto w-2/5 my-6">
                                    <button className="button-primary mx-auto block group mt-2">
                                        <span className="mr-2">Login To Spotify</span>
                                        <span className="my-auto text-sm"><FontAwesomeIcon icon="arrow-right" className="transform translate-x-0 group-hover:translate-x-1 transition-transform"/></span>
                                    </button>
                                    <em className="w-full block text-center text-base text-gray-600 mt-2">It looks like this</em>
                                </div>
                                
                                <p>Log into spotify if required. You will be taken back to the home page.</p>
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-8">Logging Out</h2>
                            <div className="mx-auto px-8">
                                <p>To logout of Mixr, select the <em>Logout</em> option from the menu bar.</p>
                                <div className="white-box mx-auto w-2/5 mt-5">
                                    <img src={navbarImg} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Hover on your username on the top-right</em>
                                </div>
                            </div>
                        </HelpSection>

                        <HelpSection subsection="navigation">
                            <h2 className="heading-sub text-2xl mb-2 -ml-4">Menu Bar</h2>
                            <div className="mx-auto px-8">
                                <p>The menu bar is accessible for logged in users only. It contains a variety of features such as accessing the home page, dashboard, help menu and logging out</p>
                                <div className="white-box mx-auto w-2/5 mt-5">
                                    <img src={navbarImg} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Hover on your username on the top-right</em>
                                </div>

                                <strong className="text-xl mt-3 block">Dashboard</strong>
                                <p>From the dashboard you can access Mixr's main functionality: mixing and analysing</p>
                            </div>
                            
                        </HelpSection>
                    </div>
                </HelpSection>

                <HelpSection section="functions">
                    <h1 className="text-4xl font-light">Functionality</h1>
                    <h3 className="text-gray-500 font-light text-xl mt-1">Mixing, Analysing and More</h3>
                    <div className="h-0 w-full border-b border-gray-300 px-auto mx-10 mt-3 pb-5"></div>
                    <div className="px-4 py-6 text-lg font-light">
                        
                        <HelpSection subsection="spotify">
                            <h2 className="heading-sub text-2xl mb-2 -ml-4">What is a URI?</h2>
                            <div className="mx-auto px-8">
                                A URI <span className="text-sm">(Unique Resource Identifier)</span> is the id that spotify associates with items such as songs, users and playlists.
                                Mixr uses these ids to find your items. Look below to find guides on locating URIs for various resources.
                                <em className="block text-base mt-4">Note: This section applies to the Web or Desktop Spotify app</em>
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-4">Playlist URI</h2>
                            <div className="mx-auto px-8">
                                This section applies to aquiring the URI for a playlist for use in mixing and/or analysing.
                                <ol className="ml-4 mt-2 list-decimal">
                                    <li>Locate desired playlist</li>
                                    <li>Right click <strong>or</strong> Left click options menu</li>
                                    <li>Hover over <em>share</em></li>
                                    <li>Hold Alt <em className="text-sm">(on Mac)</em> <strong>or</strong> Ctrl <em className="text-sm">(on Windows)</em></li>
                                    <li>Left click <em>Copy Spotify URI</em></li>
                                </ol>

                                <div className="flex flex-col justify-between px-10 mt-5">
                                    <div className="white-box my-auto">
                                        <img src={playlistUri} className="rounded"/>
                                        <em className="block text-center text-base mt-3">From right click context menu</em>
                                    </div>

                                    <div className="white-box my-auto mt-10">
                                        <img src={playlistUri2} className="rounded"/>
                                        <em className="block text-center text-base mt-3">From options context menu</em>
                                    </div>
                                </div>
                                
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-10">User URI</h2>
                            <div className="mx-auto px-8">
                                This section applies to aquiring the URI for a user for use in analysing.
                                <ol className="ml-4 mt-2 list-decimal">
                                    <li>Locate desired user's profile page</li>
                                    <li>Left click options menu under profile image</li>
                                    <li>Hold Alt <em className="text-sm">(on Mac)</em> <strong>or</strong> Ctrl <em className="text-sm">(on Windows)</em></li>
                                    <li>Left click <em>Copy Spotify URI</em></li>
                                </ol>

                                <div className="white-box my-auto mx-10 mt-5">
                                    <img src={userUri} className="rounded"/>
                                    <em className="block text-center text-base mt-3">From the user profile page</em>
                                </div>
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-10">Track URI</h2>
                            <div className="mx-auto px-8">
                                This section applies to aquiring the URI for a track/song for use in analysing.
                                <em className="block text-base mt-4">Note: Local files or podcasts may not be selected</em>
                                <ol className="ml-4 mt-2 list-decimal">
                                    <li>Right click on desired song</li>
                                    <li>Hold Alt <em className="text-sm">(on Mac)</em> <strong>or</strong> Ctrl <em className="text-sm">(on Windows)</em></li>
                                    <li>Hover over <em>share</em></li>
                                    <li>Left click <em>Copy Spotify URI</em></li>
                                </ol>

                                <div className="white-box my-auto mx-10 mt-5">
                                    <img src={trackUri} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Right click on any track item</em>
                                </div>
                            </div>
                        </HelpSection>
                        <HelpSection subsection="mixing">
                            Mixing playlists aims to combine the aesthetic of two or more playlists. This is best done with small similar playlists or larger playlists with "overlapping" aesthetics
                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-4">Choosing Playlists</h2>
                            <div className="mx-auto px-8">
                                The instructions for this section take place on the <Link to="/dashboard" className="underline">dashboard</Link> page.<br/>
                                You must know how to get URIs for playlists<br/><br/>
                                These steps must be repeated for each desired playlist
                                <ol className="ml-4 mt-2 list-decimal">
                                    <li>Locate the URI for the playlist</li>
                                    <li>Paste the URI in the input box</li>
                                    <li>Click the + button</li>
                                    <li>After a few seconds the playlist should appear in the list above</li>
                                </ol>
                                <em className="block text-base mt-4">Note: A playlist can be removed from the list by first hovering over the item then clicking the 'X' button on the right</em>
                                
                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={addTrack} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Paste the URI into the input box</em>
                                </div>

                                Once at least two playlists have been added, the Mix button will appear green and you may select it to begin the mixing process.
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-10">After Mixing</h2>
                            <div className="mx-auto px-8">
                                After mixing there are a few actions and options to look at. The easiest of which is <strong>refreshing</strong> the mixing process.<br/>
                                This can be done by clicking the fresh button located above the song list.<br/>

                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={refreshMix} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Songs will appear in order from most to least similar from top to bottom</em>
                                </div>

                                It's important to note that refreshing does not guarantee new songs, it simply tweaks a few variables in the song selection algorithm, this will most likely result in a new order of songs.
                                <span className="block mt-4"></span>
                                The other available action is to <strong>create a playlist</strong> from the mixed songs. This button is located next to the refresh button and clicking it will create a new playlist. The name will be generated from the input playlists and upon success, the name will be shown.
                                
                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={createPlaylist} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Afterwards, the playlist can be found in your Spotify account</em>
                                </div>
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-10">Configuring Mixing Settings</h2>
                            <div className="mx-auto px-8">
                                There are two settings that can be configured to change the mixing process of your playlists. These settings can be found by clicking on the dropdown area called "settings"
                                
                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={expandSettings} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Acessing the settings menu</em>
                                </div>

                                <strong className="block mt-4">Divisions</strong>
                                <p className="ml-4">This number changes the number of cells used when calculating the similarity value of playlists. Tweaking this is unreliable but small experimentations might produce beneficial.<br/>
                                <br/>In larger playlists, increasing this value may increase the accuracy of the resulting playlist, whilst in smaller playlists this value should remain around 3 to 6</p>

                                <strong className="block mt-6">Minimum # of Songs</strong>
                                <p className="ml-4">Due to the nature of the mixing algorithm, an exact number of songs cannot be ensured (without comprimising quality and reliability). A minimum number of songs may be designated and the result will contain at least that number of songs. This value is not recommended to exceed 100 as results become less accurate past this point.</p>
                            </div>
                        </HelpSection>

                        <HelpSection subsection="analysing">
                            Item analysis allows the user to graph various aspects of a single track, tracks in a playlist or the total tracks in all of a user's playlists.
                            <h2 className="heading-sub text-2xl mb-2 -ml-4">Choosing Items</h2>
                            <div className="mx-auto px-8">
                                The instructions for this section take place on the <Link to="/dashboard" className="underline">dashboard</Link> page, in the analyse/compare section<br/>
                                You must know how to get URIs for playlists, users or tracks<br/><br/>
                                These steps must be repeated for each desired item

                                <ol className="ml-4 mt-2 list-decimal">
                                    <li>Locate the URI for the desired item</li>
                                    <li>Paste the URI in the input box</li>
                                    <li>Click the + button</li>
                                    <li>After a few seconds the item should appear in the list above</li>
                                </ol>
                                <em className="block text-base mt-4">Note: An item can be removed from the list by first hovering over the item then clicking the 'X' button on the right</em>

                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={addToAnalyse} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Paste the URI into the input box</em>
                                </div>

                                Once at least one item has been added, the analyse button will appear green and may be selected to start the comparison process.
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-5">Viewing Analysis</h2>
                            <div className="mx-auto px-8">
                                Once the items have finished loading (indicated under the page title), a graph with nodes will appear. Each node on this graph is representative of a single track or a track in a collection(playlist or user).
                                
                                <br/><br/>
                                All the items in the current analysis can be found at the top of the page
                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={analysisTitle} className="rounded"/>
                                    <em className="block text-center text-base mt-3">A graph of a user named Josh and a song named Hallucinogenics</em>
                                </div>
                                <span className="mt-4 block"></span>
                                
                                The nodes are plotted by 7 attributes (detailed in section below) which can be configured to appear on various axis.
                                <em className="block text-base mt-4">Note: The node colour designates it's group of origin, the key is located at the bottom right of the graph</em>
                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={analysisGraph} className="rounded"/>
                                    <em className="block text-center text-base mt-3">A graph of a user named <span className="text-red-500">Josh</span> and a song named <span className="text-blue-500">Hallucinogenics</span></em>
                                </div>
                                Hovering over a node provides more information about it, its origins and the selected attributes
                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={nodeHover} className="rounded"/>
                                    <em className="block text-center text-base mt-3">The two selected axis are listed as a percentage under the track name</em>
                                </div>
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-5">Configuring Graph Settings</h2>
                            <div className="mx-auto px-8">
                                <strong className="block">Changing Axis</strong>
                                <p className="ml-4">
                                    The x and y axis can be configured to represent different attributes of the nodes. The 7 axis are listed in more detail below.<br/><br/>
                                    The axis can be configured in the <em>Axis Settings</em> dropdown found under the title. Each axis is controlled through the dropdown menus.
                                    Upon changing the axis, the graph will update to represent the new configuration.
                                    <em className="block text-base mt-4">Note: The x and y axis cannot represent the same attribute (i.e. the x and y axis cannot both be set to 'Energy')</em>
                                </p>
                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={analysisSettings} className="rounded"/>
                                    <em className="block text-center text-base mt-3">The nodes update their position instantly</em>
                                </div>

                                <strong className="block mt-4">Changing Node Size</strong>
                                <p className="ml-4">
                                    The nodes radius may be changed via a slider found in the <em>Extra Graph Settings</em> dropdown.
                                </p>
                                <div className="white-box my-auto mx-10 mt-5 mb-10">
                                    <img src={nodeSize} className="rounded"/>
                                    <em className="block text-center text-base mt-3">Changing the node size may improve visibility</em>
                                </div>
                            </div>

                            <h2 className="heading-sub text-2xl mb-2 -ml-4 mt-5">What do the axis mean?</h2>
                            <div className="mx-auto px-8">
                                The X and Y axis dropdowns allow the user to change which of the 7 attributes to graph on which axis. Each of the 7 characteristics are defined below
                                
                                <strong className="block mt-6">Acousticness</strong>
                                <p className="ml-4">
                                    How acoustic the track is. 
                                    <em className="block text-md">The greater a value is, the more acoustic it is</em>
                                </p>

                                <strong className="block mt-6">Danceability</strong>
                                <p className="ml-4">
                                    Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. 
                                    <em className="block text-md">A value of 0.0 is least danceable and 1.0 is most danceable.</em>
                                </p>

                                <strong className="block mt-6">Energy</strong>
                                <p className="ml-4">
                                represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. 
                                    <em className="block text-md">A value of 0.0 is lowest energy and 1.0 is highest energy</em>
                                </p>

                                <strong className="block mt-6">Instrumentalness</strong>
                                <p className="ml-4">
                                    The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks
                                </p>

                                <strong className="block mt-6">Liveness</strong>
                                <p className="ml-4">
                                    Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
                                </p>

                                <strong className="block mt-6">Speechiness</strong>
                                <p className="ml-4">
                                    Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording
                                </p>

                                <strong className="block mt-6">Valence</strong>
                                <p className="ml-4">
                                    The musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)
                                </p>
                            </div>
                        </HelpSection>
                    </div>
                </HelpSection>
            </div>
        </div>
    </div>;
}
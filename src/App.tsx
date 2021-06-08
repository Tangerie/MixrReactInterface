import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';

import env from "react-dotenv";

import {
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
  Route
} from "react-router-dom";

import Dashboard from './routes/Dashboard';
import FourOhFour from './routes/FourOhFour';
import Landing from './routes/Landing';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import ProtectedRoute from './components/ProtectedRoute';
import SpotifyCallback from './routes/SpotifyCallback';
import { GetUserToken, RevokeUserToken } from './helpers/TokenManager';

import TitleRoute from "./components/TitleRoute";
import { useStore, withStore } from './lib/GlobalStore';
import { ApiIdentity, useApi } from './helpers/AnalysisApi';
import { PrivateUser } from './models/Spotify';
import MixPlaylists from './routes/MixPlaylists';
import { MoonLoader } from 'react-spinners';
import HelpPage from './routes/HelpPage';
import SpotifyPicker from './components/SpotifyPicker';
import ItemsAnalyzer from './routes/ItemsAnalyzer';

function App() {
    //And the icon styles to the library
    library.add(fas);
    library.add(far);

    
    const [profile, setProfile] = useStore<PrivateUser>("profile");
    const [apiInfo] = useStore<ApiIdentity>("api");

    //Set the state of the server status
    const [serverStatus, setServerStatus] = useState<string>("waiting");
    
    //Only do this if profile changes
    const isLoggedIn = useMemo(() => profile != null, [profile]);
    
    const pageReady = apiInfo.token == null || (apiInfo.token != null && isLoggedIn)

    const api = useApi();

    //Lets just check if that token exists
    //If so lets get us some user info
    //Only run this if our apiInfo object changes
    useEffect(() => {
        //If we have a token, check its validity
        //If it tells us we are unauthorised, remove it and reload
        if(apiInfo.token != null && profile == null) {
            api.me.getProfile().then(data => {
                setProfile(data);
            }).catch(err => {
                if(err == "Unauthorized") {
                    RevokeUserToken(); //Change This
                    window.location.reload();
                }
            })
        }

        //Lets check the status of our api
        api.status().then(data => {
            if(data != "online") {
                throw new Error("Error");
            }
            setServerStatus("online");
        }).catch(err => {
            setServerStatus("offline");
        })
    }, [apiInfo])

    //While waiting display nothing
    if(serverStatus == "waiting") {
        return <div className="bg-soft flex flex-col justify-center text-center my-auto h-full w-full fixed"> 
        </div>
    }

    //If offline, alert the user and block functions
    if(serverStatus == "offline") {
        return <div className="bg-soft flex flex-col justify-center text-center my-auto h-full w-full fixed">
            <p className="text-8xl mb-2 tracking-widest font-thin">Oops</p>
            <p className="font-light text-xl">The server is offline</p>
            <p className="font-light text-md mt-2 italic">Come back later</p>
        </div>
    }

    //While verifying the token, tell the user as it can take a few seconds on the first load
    if(!pageReady) {
        return <div className="bg-soft text-black overflow-hiddden flex flex-col justify-center" 
        style={{
            height: "100vh"
        }}>
            <div className="flex flex-row w-full justify-center">
                <MoonLoader />
            </div>

            <h1 className="text-center mt-6 text-4xl font-light">Verifying Token</h1>
            <h1 className="text-center mt-6 text-2xl font-light italic">Please Wait...</h1>

        </div>
    }

    return (
        <div className="bg-soft text-black" 
        style={{
            minHeight: "100vh"
        }}>
            <Router>

            {/*ROUTES*/}
            <Switch>
                <TitleRoute path="/" exact title="Landing" component={Landing}/>

                <TitleRoute path="/spotify/callback" title="Callback">
                    <SpotifyCallback />
                </TitleRoute>

                <ProtectedRoute path="/dashboard" component={Dashboard} allowedCondition={isLoggedIn} title="Dashboard"/>

                <ProtectedRoute path="/mix" component={MixPlaylists} allowedCondition={isLoggedIn} title="Playlists" />
                
                <ProtectedRoute path="/analyze" component={ItemsAnalyzer} allowedCondition={isLoggedIn} title="Analyzer" />
                
                <TitleRoute path="/help/:section/:subsection" component={HelpPage} title="Help"/>
                <TitleRoute path="/help/:section" component={HelpPage} title="Help"/>
                <TitleRoute path="/help" component={HelpPage} title="Help"/>

                <TitleRoute component={FourOhFour} title="404"/>
                
            </Switch>
            </Router>
        </div>
  );
}

//Create the app with the global store
//Set the profile to null and the api configuration correctly
export default withStore(App, {
    profile: null,
    api: {
        token: GetUserToken(),
        url: process.env.REACT_APP_API_URL || "http://localhost:5000" /* If its set in our env change it, otherwise default to localhost:5000 */
    }
});
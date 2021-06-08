import { useStore } from "../lib/GlobalStore";
import { CreatePlaylistRequest, PlaylistInfo, PlaylistNodeSet, PrivateUser, PublicUser, SpotifyImage, TrackNode } from "../models/Spotify";

export interface ApiIdentity {
    url : string;
    token : string;
}

//Oooh look at this scary thing
/*
Its another custom hook
What does it do?
It just creates an easy to use interface with my api

Most requests are in the form of a promise
This means that when used, you must subscribe
Then once they come back they can be error checked and formatted before being passed back to the caller
*/
export function useApi() {
    const [api] = useStore<ApiIdentity>("api");

    //Default headers to send
    const headers = {
        "userid": api.token,
        'Content-Type': 'application/json'
    };

    return {
        playlist: (uri : string) => { //All code in this section is related to getting playlists
            const isUriValid = uri.startsWith("spotify:playlist:") && uri != "spotify:playlist:" && uri.split("spotify:playlist:").length == 2;
            return { 
                getInfo: () : Promise<PlaylistInfo> => { //This is where we grab the info
                    if(api.token == "" || !isUriValid) return new Promise((resolve, reject) => reject()); 
                    const id = uri.split("spotify:playlist:")[1];
                    
                    return fetch(`${api.url}/playlist/info?playlistId=${id}`, {
                        headers: headers
                    })
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            throw new Error(response.statusText); //We'll throw an error here, this is like if the response type is 404 or 500
                        }
                    })
                    .then(data => data.json()) //If everything is all good, parse the response and give it back
                    
                },

                getNodeSet: () : Promise<PlaylistNodeSet> => {
                    if(api.token == "" || !isUriValid) return new Promise((resolve, reject) => reject()); 
                    const id = uri.split("spotify:playlist:")[1];

                    return fetch(`${api.url}/playlist/nodeset?playlistId=${id}`, {
                        headers: headers
                    }).then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            throw new Error(response.statusText); //We'll throw an error here, this is like if the response type is 404 or 500
                        }
                    }).then(data => data.json());
                }
            }
        },

        playlists: (uris : string[]) => {
            return {
                getInfo: () : Promise<PlaylistInfo[]> => {
                    if(api.token == "") return new Promise((resolve, reject) => reject()); 

                    const ids = [];

                    for(const uri of uris) {
                        if(!uri.startsWith("spotify:playlist:") || uri == "spotify:playlist:" || uri.split("spotify:playlist:").length != 2) {
                            return new Promise((resolve, reject) => reject()); //If its in the wrong format, reject it
                        }

                        ids.push(uri.split("spotify:playlist:")[1]);
                    }

                    return fetch(`${api.url}/playlists/info?playlistIds=${ids.join(",")}`, {
                        headers: headers
                    })
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            throw new Error("Error"); //We'll throw an error here, this is like if the response type is 404 or 500
                        }
                    })
                    .then(data => data.json()) //If everything is all good, parse the response and give it back
                    
                },

                mix: (divisions? : number, num? : number) : Promise<TrackNode[]> => {
                    if(api.token == "") return new Promise((resolve, reject) => reject()); 

                    const ids = [];

                    for(const uri of uris) {
                        if(!uri.startsWith("spotify:playlist:") || uri == "spotify:playlist:" || uri.split("spotify:playlist:").length != 2) {
                            return new Promise((resolve, reject) => reject()); //If its in the wrong format, reject it
                        }

                        ids.push(uri.split("spotify:playlist:")[1]);
                    }

                    return fetch(`${api.url}/playlists/mix?playlistIds=${ids.join(",")}${divisions ? `&divisions=${divisions}` : ""}${num ? `&num=${num}` : ""}`, {
                        headers: headers
                    })
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            throw new Error(response.statusText); //We'll throw an error here, this is like if the response type is 404 or 500
                        }
                    })
                    .then(data => data.json()) //If everything is all good, parse the response and give it back
                    
                }
            }
        },

        create: {
            playlist: (request : CreatePlaylistRequest) : Promise<PlaylistInfo> => {
                if(api.token == "") return new Promise((resolve, reject) => reject()); 

                return fetch(`${api.url}/playlist/new`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify(request)
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        throw new Error(response.statusText); //We'll throw an error here, this is like if the response type is 404 or 500
                    }
                })
                .then(data => data.json()) 
            }
        },

        track: (uri : string) => {
            return {
                getNode: () : Promise<TrackNode> => {
                    if(api.token == "") return new Promise((resolve, reject) => reject()); 
                    if(!uri.startsWith("spotify:track:") || uri == "spotify:track:" || uri.split("spotify:track:").length != 2) {
                        return new Promise((resolve, reject) => reject()); //If its in the wrong format, reject it
                    }

                    const id = uri.split("spotify:track:")[1];
                    return fetch(`${api.url}/track/node?trackId=${id}`, {
                        headers: headers
                    })
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            throw new Error(response.statusText); //We'll throw an error here, this is like if the response type is 404 or 500
                        }
                    })
                    .then(data => data.json()) 
                }
            }
        },

        cover: {
            random: () : Promise<SpotifyImage> => {
                return fetch(`${api.url}/cover/random`)
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        throw new Error("Error"); //We'll throw an error here, this is like if the response type is 404 or 500
                    }
                })
                .then(data => data.json()) 
            }
        },

        me: {
            getProfile: () : Promise<PrivateUser> => {
                if(api.token == "") return new Promise((resolve, reject) => reject()); 

                return fetch(`${api.url}/me/profile`, {
                    headers: headers
                }).then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        throw new Error(response.statusText); //We'll throw an error here, this is like if the response type is 404 or 500
                    }
                }).then(data => data.json());
            }
        },

        user: (uri : string) => {
            const isUriValid = uri.startsWith("spotify:user:") && uri != "spotify:user:" && uri.split("spotify:user:").length == 2
            return {
                getProfile: () : Promise<PublicUser> => {
                    if(api.token == "" || !isUriValid) return new Promise((resolve, reject) => reject()); 

                    const id = uri.split("spotify:user:")[1];

                    return fetch(`${api.url}/user/info?userId=${id}`, {
                        headers: headers
                    }).then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            throw new Error(response.statusText); //We'll throw an error here, this is like if the response type is 404 or 500
                        }
                    }).then(data => data.json());
                },

                getNodeSets: () : Promise<PlaylistNodeSet[]> => {
                    if(api.token == "" || !isUriValid) return new Promise((resolve, reject) => reject()); 

                    const id = uri.split("spotify:user:")[1];

                    return fetch(`${api.url}/user/nodesets?userId=${id}`, {
                        headers: headers
                    }).then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            throw new Error(response.statusText); //We'll throw an error here, this is like if the response type is 404 or 500
                        }
                    }).then(data => data.json());
                }
            }
        },

        status: () : Promise<string> => {
            return fetch(`${api.url}/status`, {
                headers: headers
            }).then(data => data.text());
        },

        callback: (code : string) : Promise<any> => {
            return fetch(`${api.url}/spotify/callback?code=${code}`)
            .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            }).then(data => data.text());
        },

        navigateToSpotifyLogin: () : Promise<any> => {
            return fetch(`${api.url}/spotify/url`)
            .then(response => response.text())
            .then(url => {
                window.location.href = url;
                return url;
            })
        }
    }
}
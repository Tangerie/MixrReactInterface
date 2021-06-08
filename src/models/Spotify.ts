//This is just the type definitions of data coming from the api

export interface SpotifyImage {
    height : number;
    width : number;
    url : string;
}

export interface SpotifyFollowers {
    href : string;
    total : number;
}

export interface PublicUser {
    displayName : string;
    externalUrls : any;
    followers : SpotifyFollowers | null;
    href : string;
    id : string;
    images : SpotifyImage[] | null;
    type : string;
    uri : string;
}

export interface PrivateUser {
    displayName : string;
    externalUrls : any;
    followers : SpotifyFollowers | null;
    href : string;
    id : string;
    images : SpotifyImage[] | null;
    type : string;
    uri : string;
    country : string;
    email : string;
    product : string;
}

export interface PlaylistInfo {
    name : string;
    owner : PublicUser;
    id : string;
    uri : string;
    isPublic : boolean;
    isCollaborative : boolean;
    description : string;
    coverImage : SpotifyImage;
    totalSongs : number;
}

export interface TrackNode {
    acousticness : number,
    danceability : number,
    energy : number,
    instrumentalness : number,
    liveness : number,
    mode : number,
    speechiness : number,
    valence : number,
    tempo : number,
    timeSignature : number,
    id : string,
    uri : string,
    name : string,
    artists : string[],
    coverImage : SpotifyImage,
}

export interface NodeSet {
    nodes : TrackNode[];
    type : "Playlist" | "Track" | "User";
    origin : PlaylistInfo | TrackNode | PublicUser;
}

export interface PlaylistNodeSet {
    nodes : TrackNode[],
    info : PlaylistInfo
}

export interface CreatePlaylistRequest {
    name : string,
    ids : string[]
}

//Check the type of a URI
export function GetUriType(uri : string) : "Playlist" | "User" | "Track" | "" {
    if(uri.startsWith("spotify:playlist:")) return "Playlist";
    else if(uri.startsWith("spotify:user:")) return "User";
    else if(uri.startsWith("spotify:track:")) return "Track";
    else return ""; //If its invalid return empty string
}
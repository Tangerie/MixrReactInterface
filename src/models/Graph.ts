import { TrackNode } from "./Spotify";

//Structures for the graph data
export interface DataPoint {
    x : number,
    y : number,
    origin : TrackNode
}

export interface DataSet {
    id : string,
    data : DataPoint[],
}

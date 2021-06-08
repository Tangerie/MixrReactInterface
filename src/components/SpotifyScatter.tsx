import { ResponsiveScatterPlotCanvas } from '@nivo/scatterplot';
import { useEffect, useMemo } from 'react';
import { DataPoint, DataSet } from '../models/Graph';
import { NodeSet, PlaylistInfo, PublicUser, TrackNode } from '../models/Spotify';

export type NodeAxis = "acousticness" | "danceability" | "energy" | "instrumentalness" | "liveness" | "speechiness" | "valence";

interface IProps {
    xAxis : NodeAxis;
    yAxis : NodeAxis;
    nodeSets : NodeSet[];
    nodeSize : number;
}

//Insertion sort
//We want sets with a lower count to appear at the end of the array
//Insertion sort for project
function sortDataSets(dataSets : DataSet[]) : DataSet[] {
    const count = dataSets.length;
    if(count < 2) return dataSets; //No elements to sort

    for(let i = 1; i < count; i++) { //Starting from the 2nd element
        let currentEl = dataSets[i]; //The temporary variable

        //End of the sorted portion is at j
        let j = i - 1;
        while(j > -1 && currentEl.data.length > dataSets[j].data.length) {
            dataSets[j + 1] = dataSets[j]; //Shuffle em up
            j--;
        }

        dataSets[j + 1] = currentEl;
    }

    return dataSets;
}

/* Another fun one, this is the scatter graph seen on the analysis page
It contains more features then were utilised
It takes in a list of nodeSets, axis configurations and the graph settings
*/
export default function SpotifyScatter(props : IProps) {
    //Lets format some data
    //Figure out which axis to plot ect
    //Updates when the graph settings change
    const data : DataSet[] = useMemo<DataSet[]>(() => {
        const toReturn : DataSet[] = [];
        for(var set of props.nodeSets) {
            toReturn.push({
                id: set.type == "Playlist" ? (set.origin as PlaylistInfo).name 
                : set.type == "Track" ? (set.origin as TrackNode).name
                : set.type == "User" ? (set.origin as PublicUser).displayName : set.origin.id,
                data: set.nodes.map(n => {
                    return {
                        x: n[props.xAxis] as number,
                        y: n[props.yAxis] as number,
                        origin : n
                    }
                })
            });
        }

        return sortDataSets(toReturn);;
    }, [props.xAxis, props.yAxis, props.nodeSets]);

    //The heading to display along the axis
    const formattedX = props.xAxis[0].toUpperCase() + props.xAxis.slice(1);
    const formattedY = props.yAxis[0].toUpperCase() + props.yAxis.slice(1);

    //Theres a bunch of configuration as this in an external library
    return <div className="w-full h-full"><ResponsiveScatterPlotCanvas 
    data={data}
    margin={{ top: 60, right: 240, bottom: 70, left: 120 }}
    xScale={{ type: 'linear', min: 0, max: 1 }}
    yScale={{ type: 'linear', min: 0, max: 1 }}
    xFormat=".0%"
    yFormat=".0%"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 15,
        tickPadding: 5,
        tickRotation: 0,
        legend: formattedX,
        legendPosition: 'middle',
        legendOffset: 60
    }}
    axisLeft={{
        tickSize: 15,
        tickPadding: 5,
        tickRotation: 0,
        legend: formattedY,
        legendPosition: 'middle',
        legendOffset: -60
    }}

    nodeSize={props.nodeSize}

    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}

    colors={{ scheme: 'set1' }}
    theme={{
        fontSize: 12,
        fontFamily: "'Josefin Sans'",
    }}
    pixelRatio={3}

    tooltip={({node}) => {
        let track : TrackNode | undefined = undefined;

        //2 linear searches -> The search for the project
        /*
        Because we cant directly pass the track info to a node, when one is selected we must look it up
        The first search finds the correct group (playlist, user etc.)
        Once that happens the next search finds the correct node by comparing it's index with the node's index id (from its uid)
        */
        for(let i = 0; i < data.length; i++) {
            if(track == undefined) { //Only checks if the track hasn't been found yet
                if(data[i].id == node.data.serieId) {
                    for(let j = 0; j < data[i].data.length; j++) {
                        if(j.toString() == node.id.split(".")[1]) { //We need to check only the last hald of the id
                            track = data[i].data[j].origin;
                        }
                    }
                }
            }
        }
        
        //If the track wasn't found, just return an error box
        if(!track) return <div style={{
            color: node.style.color,
            background: '#333',
            padding: '12px 16px',
            opacity: 0.95}}>Error</div>
        
        //If the track was found, create a box with all its info
        return <div style={{
            color: node.style.color,
            background: '#333',
            padding: '12px 16px',
            opacity: 0.95}}>
                <strong className="text-md">{track.name}</strong>
                <ul className="text-xs">
                    {
                        //Format the artists names
                        track.artists.map((x, i) => <li key={i}>{i == 0 ? "By" : "and"} {x}</li>)
                    }
                </ul>
                <div className="text-sm w-full flex flex-row justify-between"><span className="mr-4">{formattedX}</span><span>{node.data.formattedX}</span></div>
                <div className="text-sm w-full flex flex-row justify-between"><span className="mr-4">{formattedY}</span><span>{node.data.formattedY}</span></div>
                <p className="text-xs">From {node.data.serieId}</p>
            </div>
    }}/></div>
}
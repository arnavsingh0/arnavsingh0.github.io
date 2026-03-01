import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const usStatesUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const visitedCountries = [
    "Canada", "Ireland", "United Kingdom", "France", "Spain",
    "India", "Turkey", "Singapore", "South Africa"
];

const visitedStates = [
    "New York", "New Hampshire", "Vermont", "Pennsylvania", "Massachusetts",
    "Rhode Island", "Connecticut", "Maine", "Delaware", "Maryland", "Virginia",
    "District of Columbia", "North Carolina", "South Carolina", "Georgia",
    "Florida", "Arizona", "California", "Nevada", "Hawaii", "Ohio", "Missouri",
    "Kansas", "Michigan", "Indiana", "Wisconsin", "Illinois", "New Jersey"
];

const Map = () => {
    const [tooltipContent, setTooltipContent] = useState("");
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    const handleZoomIn = () => {
        if (position.zoom >= 5) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
    };

    const handleZoomOut = () => {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
    };

    const handleReset = () => {
        setPosition({ coordinates: [0, 0], zoom: 1 });
    };

    const handleMoveEnd = (position) => {
        setPosition(position);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center font-sans overflow-hidden bg-black/40 rounded-xl border border-cyan-900/40 relative shadow-[inset_0_0_50px_rgba(6,182,212,0.05)]">
            {/* Holographic Radar Overlay Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Pulsing Radar Ring (Decorative) */}
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-30">
                <div className="w-[80%] h-[80%] rounded-full border border-cyan-500/30 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            </div>

            <div className="absolute top-6 left-6 z-20 flex flex-col">
                <h3 className="text-cyan-400 text-2xl font-bold tracking-[0.2em] uppercase font-mono drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                    Navigation System
                </h3>
                <p className="text-cyan-600 font-mono text-sm tracking-widest mt-1 uppercase">Global Footprint Database</p>
            </div>

            {/* UX User Controls Hint Overlay & Buttons */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-4">
                {/* On-Screen Zoom Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={handleZoomIn}
                        className="bg-black/60 hover:bg-cyan-900/50 text-cyan-400 font-mono text-xl w-10 h-10 flex items-center justify-center rounded border border-cyan-800 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)] focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                        +
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="bg-black/60 hover:bg-cyan-900/50 text-cyan-400 font-mono text-xl w-10 h-10 flex items-center justify-center rounded border border-cyan-800 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)] focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                        -
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-black/60 hover:bg-cyan-900/50 text-cyan-400 font-mono text-xs px-3 h-10 flex items-center justify-center rounded border border-cyan-800 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)] uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                        Reset
                    </button>
                </div>

                {/* Hints */}
                <div className="flex flex-col gap-2 font-mono text-xs text-cyan-500/80 uppercase tracking-widest">
                    <div className="flex items-center gap-3 bg-black/60 px-3 py-1.5 rounded border border-cyan-900/50 backdrop-blur-md">
                        <span className="w-4 h-4 rounded-full border border-cyan-500 flex justify-center items-center text-[8px] animate-pulse">⤡</span>
                        <span>Scroll to Zoom</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/60 px-3 py-1.5 rounded border border-cyan-900/50 backdrop-blur-md">
                        <span className="w-4 h-4 rounded-full border border-cyan-500 flex justify-center items-center text-[8px] animate-pulse">✥</span>
                        <span>Click & Drag to Pan</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full flex justify-center items-center relative z-10">
                <ComposableMap
                    projectionConfig={{ scale: 140 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <ZoomableGroup
                        zoom={position.zoom}
                        center={position.coordinates}
                        onMoveEnd={handleMoveEnd}
                        maxZoom={5}
                    >
                        {/* Render Countries except USA */}
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const name = geo.properties.name;
                                    const isUSA = name === "United States of America" || name === "United States";
                                    if (isUSA) return null; // We draw individual states instead

                                    const isVisited = visitedCountries.includes(name);

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                setTooltipContent(name);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                            fill={isVisited ? "rgba(6, 182, 212, 0.8)" : "rgba(15, 23, 42, 0.6)"}
                                            stroke="rgba(6, 182, 212, 0.3)"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: "none", transition: "all 0.3s ease" },
                                                hover: { fill: isVisited ? "rgba(34, 211, 238, 1)" : "rgba(30, 41, 59, 0.8)", outline: "none", cursor: "crosshair" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                        {/* Render US States */}
                        <Geographies geography={usStatesUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const name = geo.properties.name;
                                    const isVisited = visitedStates.includes(name);

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                setTooltipContent(name);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                            fill={isVisited ? "rgba(6, 182, 212, 0.8)" : "rgba(15, 23, 42, 0.6)"}
                                            stroke="rgba(6, 182, 212, 0.3)"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: "none", transition: "all 0.3s ease" },
                                                hover: { fill: isVisited ? "rgba(34, 211, 238, 1)" : "rgba(30, 41, 59, 0.8)", outline: "none", cursor: "crosshair" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>

            <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-3 font-mono text-xs bg-black/60 p-4 rounded-lg border border-cyan-900/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.8)] border border-cyan-200"></div>
                    <span className="text-cyan-100 uppercase tracking-widest font-semibold">Analyzed Sector</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-slate-800 rounded-sm border border-cyan-900/50"></div>
                    <span className="text-cyan-700 uppercase tracking-widest opacity-80">Unknown Terrain</span>
                </div>
            </div>

            <ReactTooltip
                id="map-tooltip"
                content={tooltipContent}
                isOpen={tooltipContent !== ""}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    color: '#22d3ee',
                    border: '1px solid rgba(6, 182, 212, 0.5)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
                    padding: '8px 12px',
                    zIndex: 100
                }}
            />
        </div>
    );
};

export default Map;

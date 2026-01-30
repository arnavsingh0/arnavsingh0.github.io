import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const currLocation = "United States";
const visitedCountries = [
    "United States",
    "Canada",
    "Ireland",
    "United Kingdom",
    "France",
    "Spain",
    "India",
    "Turkey",
    "Singapore",
    "South Africa"
];

// Mapping for some common name discrepancies
const countryNameMapping = {
    "United States": "United States of America",
    // Add others if needed
};

const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = () => {
    const highlighted = useMemo(() => {
        return visitedCountries.map(c => countryNameMapping[c] || c);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center font-sans">
            <h3 className="text-white text-xl font-bold mb-4">My Global Footprint 🌍</h3>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 100,
                }}
                className="w-full h-full"
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const isVisited = highlighted.includes(geo.properties.name);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={isVisited ? "#3b82f6" : "#2a303c"} // Blue for visited, dark gray for others
                                    stroke="#1a1e29"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: {
                                            fill: isVisited ? "#60a5fa" : "#374151",
                                            outline: "none",
                                            transition: "all 250ms"
                                        },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <div className="flex gap-4 mt-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Visited</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#2a303c] rounded-full border border-gray-600"></div>
                    <span>Yet to explore</span>
                </div>
            </div>
        </div>
    );
};

export default Map;

import React, { useState } from "react";

export const TripContext = React.createContext();

export function TripProvider({ children }) {
  const [totalDistance, setTotalDistance] = useState(Number());
  const [totalTime, setTotalTime] = useState(null);
  const [locations, setLocations] = useState(null);
  const [routeInstructions, setRouteInstructions] = useState([]);

  const updateState = (stateName, value) => {
    switch (stateName) {
      case "totalDistance":
        setTotalDistance(value);
        break;
      case "totalTime":
        setTotalTime(value);
        break;
      case "locations":
        setLocations(value);
        break;
      case "routeInstructions":
        setRouteInstructions(value);
        break;
      default:
        break;
    }
  };

  const tripData = {
    totalDistance,
    totalTime,
    locations,
    routeInstructions,
    updateState,
  };

  return (
    <TripContext.Provider value={tripData}>{children}</TripContext.Provider>
  );
}

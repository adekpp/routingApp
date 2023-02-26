import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useContext, useEffect } from "react";
import { TripContext } from "./context/TripContext";
const graphHopperApiKey = process.env.VITE_APP_GRAPHHOPPER_API_KEY;
const RoutingControl = ({ locations }) => {
  const map = useMap();
  const { updateState } = useContext(TripContext);
  useEffect(() => {
    if (!locations) return;
    const control = L.Routing.control({
      router: L.Routing.graphHopper(graphHopperApiKey, {}),
      routeWhileDragging: false,
      showAlternatives: false,
      waypoints: [
        L.latLng(locations.start.lat, locations.start.lon),
        L.latLng(locations.end.lat, locations.end.lon),
      ],
      collapsible: true,
    }).addTo(map);
    control.on("routesfound", function (e) {
      updateState("routeInstructions", e.routes[0].instructions);
      const distance = (e.routes[0].summary.totalDistance / 1000).toFixed();
      updateState("totalDistance", Number(distance));
      const time = (e.routes[0].summary.totalTime / 60).toFixed();
      updateState("totalTime", time);
    });

    return () => {
      map.removeControl(control);
    };
  }, [map, locations]);

  return null;
};

export default RoutingControl;

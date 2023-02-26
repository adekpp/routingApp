import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "lrm-graphhopper";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "./components/AppBar";
import RoutingControl from "./components/RoutingControl";

function Map() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const { state } = useLocation();

  useEffect(() => {
    window.history.replaceState({}, null, window.location.pathname);
    if (!state) navigate("/", { replace: true });
  }, [navigate, state]);

  return (
    <div className="flex flex-col h-screen">
      <AppBar />

      <MapContainer
        ref={mapRef}
        center={[51.152811, 19.897122]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "100vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RoutingControl locations={state} />
      </MapContainer>
    </div>
  );
}

export default Map;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGeolocation } from "./lib/getGeolocation";

function getFromLocalStorage(key, defaultValue) {
  const value = localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : defaultValue;
}

function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function App() {
  const navigate = useNavigate();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [routeHistory, setRouteHistory] = useState(
    getFromLocalStorage("data", [])
  );
  const [error, setError] = useState("");

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("data");
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("data");
      });
    };
  }, []);

  const getLatLon = async (e, start, end) => {
    e.preventDefault();
    if (!start || !end) return;
    try {
      const places = await getGeolocation(start, end);
      if (places) {
        const data = {
          start: start,
          end: end,
          places: places,
        };

        setToLocalStorage("data", [...routeHistory, data]);
        navigate(`/map`, { state: places });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col max-w-full place-content-center min-h-screen bg-gradient-to-b from-gray-400 to-slate-300">
      <h1 className="text-center mb-3">Gdzie się wybierasz?</h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form
        onSubmit={(e) => {
          getLatLon(e, start, end);
        }}
        className="flex gap-3 place-content-center items-center"
      >
        <label htmlFor="from">Z:</label>
        <input
          className="border-[1px] border-neutral-800 pl-2 py-1"
          type="text"
          onChange={(e) => setStart(e.target.value)}
        />
        <label htmlFor="to">Do:</label>
        <input
          className="border-[1px] border-neutral-800 pl-2 py-1"
          type="text"
          onChange={(e) => setEnd(e.target.value)}
        />
        <button className="bg-green-600 text-white rounded-md shadow-md px-2 py-1 active:scale-90">
          Start
        </button>
      </form>
      {routeHistory.length > 0 && (
        <div className="flex flex-col gap-2 place-content-center items-center">
          <h2 className="text-center mt-3">Historia tras</h2>
          <ul className="flex flex-col gap-2 place-content-center items-center">
            {routeHistory.map((route, index) => (
              <li key={index}>
                <Link className="underline" to="/map" state={route.places}>
                  {route.start} - {route.end}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

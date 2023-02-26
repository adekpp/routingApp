import { useContext, useRef, useState } from "react";
import { TripContext } from "../context/TripContext";
import useCalculateTripCosts from "../hooks/useCalculateTripCosts";
import PdfButton from "./PdfButton";

export default function AppBar() {
  const inputRef = useRef(null);
  const [pricePerKm, setPricePerKm] = useState(0.5);
  const { totalDistance } = useContext(TripContext);
  const { cost, daysNeeded } = useCalculateTripCosts(totalDistance, pricePerKm);

  return (
    <div
      className="fixed flex max-w-full w-full bg-gradient-to-b
    from-blue-600 to-blue-400 top-0  z-[999] py-2 px-3 shadow-md place-content-between text-white font-semibold text-sm"
    >
      {totalDistance > 0 && (
        <div className="flex items-center gap-x-3 w-full">
          <p>
            Szacowany koszt przejazdu to ok.{" "}
            <span className="font-bold ">{cost}</span> pln
          </p>
          {daysNeeded > 1 && <p>Czas przejazdu: {daysNeeded} dni </p>}
        </div>
      )}
      <div className="flex max-w-full w-full place-content-end items-center">
        <label htmlFor="pricePerKm" className="text-sm">
          Cena za km:
        </label>
        <input
          ref={inputRef}
          defaultValue={pricePerKm}
          type="number"
          className="ml-4 text-slate-900 pl-2 max-w-[100px]"
        />
        <button
          className="ml-4 bg-green-600 px-2 py-1 mr-3"
          onClick={() => {
            setPricePerKm(inputRef.current.value);
          }}
        >
          OK
        </button>
        <PdfButton cost={cost} distance={totalDistance} />
      </div>
    </div>
  );
}

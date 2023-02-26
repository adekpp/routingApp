import { useContext } from "react";
import { TripContext } from "../context/TripContext";
import { generatePdf } from "../lib/generatePdf";
export default function PdfButton({cost, distance}) {
  const { routeInstructions } = useContext(TripContext);
  if (routeInstructions.length === 0) return null;
    
  return <button className="font-normal bg-red-500 px-2 py-1" onClick={() => generatePdf(routeInstructions, cost, distance)}>Download route intructions</button>;
}

import { useEffect, useState } from "react";
import { calculateTripCost } from "../lib/trip";

export default function useCalculateTripCosts(totalDistance, costPerKm) {

  const [cost, setCost] = useState();
  const [daysNeeded, setDaysNeeded] = useState();

  useEffect(() => {
    if (!totalDistance || !costPerKm) {
      return;
    }
    const { daysNeeded, totalCost } = calculateTripCost(
      totalDistance,
      costPerKm
    );
    setCost(totalCost);
    setDaysNeeded(daysNeeded);
  
  }, [totalDistance, costPerKm]);

  return { cost, daysNeeded };
}

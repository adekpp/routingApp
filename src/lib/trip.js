export function calculateTripCost(distance, costPerKm) {
  const daysNeeded = Math.ceil(distance / 800);

  const travelCost = distance * costPerKm;
  const dailyFixedCost = 1000;
  const totalCost = (
    travelCost * 1.1 * daysNeeded +
    dailyFixedCost * daysNeeded
  ).toFixed(2);
  return { daysNeeded, totalCost };
}

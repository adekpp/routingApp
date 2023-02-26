export async function getGeolocation(start, end) {
  const startUrl = `https://nominatim.openstreetmap.org/search?q=${start}&format=json`;
  const endUrl = `https://nominatim.openstreetmap.org/search?q=${end}&format=json`;

  try {
    const [startData, endData] = await Promise.all([
      fetch(startUrl).then((res) => res.json()),
      fetch(endUrl).then((res) => res.json()),
    ]);

    if (
      !startData ||
      startData.length === 0 ||
      !endData ||
      endData.length === 0
    ) {
      throw new Error(`Nie mogę znaleźć takiej lokalizacji`);
    }

    const startLat = startData[0].lat;
    const startLon = startData[0].lon;
    const endLat = endData[0].lat;
    const endLon = endData[0].lon;

    const places = {
      start: {
        lat: startLat,
        lon: startLon,
      },
      end: {
        lat: endLat,
        lon: endLon,
      },
    };

    return places;
  } catch (error) {
    throw new Error(error.message);
  }
}

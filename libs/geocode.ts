/**
 * Free geocoding via OpenStreetMap's Nominatim API — no API key required.
 * Nominatim's usage policy requires a descriptive User-Agent and asks for
 * max ~1 request/second, which is fine for this use case (one call per reading).
 */

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  displayName: string;
}

export async function geocodePlace(place: string): Promise<GeocodeResult> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    place
  )}&format=json&limit=1`;

  const res = await fetch(url, {
    headers: {
      // Replace with your actual app name + contact per Nominatim's usage policy
      "User-Agent": "PravaahSoulMaps/1.0 (contact@yourdomain.com)",
    },
  });

  if (!res.ok) {
    throw new Error(`Geocoding request failed: ${res.status}`);
  }

  const results = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
  }>;

  if (!results.length) {
    throw new Error(`Could not find coordinates for "${place}". Please check the spelling or add more detail (city, state, country).`);
  }

  return {
    latitude: parseFloat(results[0].lat),
    longitude: parseFloat(results[0].lon),
    displayName: results[0].display_name,
  };
}
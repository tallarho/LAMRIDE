export function haversineDistance(coord1: { latitude: number; longitude: number }, coord2: { latitude: number; longitude: number }) {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const R = 6371e3; // Earth radius in meters
  const φ1 = toRad(coord1.latitude);
  const φ2 = toRad(coord2.latitude);
  const Δφ = toRad(coord2.latitude - coord1.latitude);
  const Δλ = toRad(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in meters
  return d;
}

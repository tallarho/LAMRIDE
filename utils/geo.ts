export function calculateBearing(start: { latitude: number; longitude: number }, end: { latitude: number; longitude: number }): number {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const lat1 = toRad(start.latitude);
  const lon1 = toRad(start.longitude);
  const lat2 = toRad(end.latitude);
  const lon2 = toRad(end.longitude);

  const dLon = lon2 - lon1;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const brng = Math.atan2(y, x);

  return (toDeg(brng) + 360) % 360; // возвращаем 0–360°
}

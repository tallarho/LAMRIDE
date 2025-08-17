import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { getDistance } from "geolib";

type Coord = {
  latitude: number;
  longitude: number;
};

export function useRouteTracking(finishPoint: Coord) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [timer, setTimer] = useState(0);
  const [path, setPath] = useState<Coord[]>([]);
  const [hasArrived, setHasArrived] = useState(false);
  const [heading, setHeading] = useState(0);
  const [distance, setDistance] = useState(0); // в км

  const intervalRef = useRef<number | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const finishedRef = useRef(false);

  // Подсчёт полного расстояния
  const calculateTotalDistance = (points: Coord[]) => {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += getDistance(points[i - 1], points[i]);
    }
    return total;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Геолокация недоступна");
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      setLocation(current);

      const startCoord = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };
      setPath([startCoord]);

      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000) as unknown as number;

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (loc) => {
          const { latitude, longitude, heading: newHeading } = loc.coords;

          setLocation(loc);
          if (typeof newHeading === "number") {
            setHeading(newHeading);
          }

          const newCoord = { latitude, longitude };

          setPath((prev) => {
            const last = prev[prev.length - 1];
            const dist = getDistance(last, newCoord);
            if (dist < 3) return prev;

            const updatedPath = [...prev, newCoord];
            const newDistance = calculateTotalDistance(updatedPath);
            setDistance(newDistance / 1000); // км
            return updatedPath;
          });

          const toFinish = getDistance(newCoord, finishPoint);
          if (toFinish < 30 && !finishedRef.current) {
            finishedRef.current = true;
            setHasArrived(true);

            // Останавливаем таймер и трекинг
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            if (locationSubscription.current) {
              locationSubscription.current.remove();
              locationSubscription.current = null;
            }
          }
        }
      );
    })();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (locationSubscription.current) locationSubscription.current.remove();
    };
  }, []);

  return {
    location,
    path,
    timer,
    hasArrived,
    heading,
    distance,
  };
}

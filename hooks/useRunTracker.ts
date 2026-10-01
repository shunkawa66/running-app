'use client';

import { useState, useEffect } from 'react';

export function useRunTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);

  // 現在地の監視は常に行いつつ、isTrackingが真のときだけ座標をルートに追加する
  useEffect(() => {
    if (!('geolocation' in navigator)) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPoint: [number, number] = [latitude, longitude];

        if (isTracking) {
          setRouteCoordinates((prev) => [...prev, newPoint]);
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isTracking]);

  const startRun = () => {
    setRouteCoordinates([]); // 軌跡をリセットしてスタート
    setIsTracking(true);
  };

  const stopRun = () => {
    setIsTracking(false);
  };

  return {
    isTracking,
    routeCoordinates,
    startRun,
    stopRun,
  };
}
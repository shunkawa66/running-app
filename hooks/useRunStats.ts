'use client';

import { useState, useEffect } from 'react';

// 2点間の緯度経度から距離（メートル）を計算する関数（ハバーサイン公式）
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const R = 6371e3; // 地球の半径（m）
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function useRunStats(isTracking: boolean, routeCoordinates: [number, number][]) {
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(0); // メートル単位

  // 軌跡がリセットされた（＝新しくスタートした）ときだけ、タイムと距離を0にする
  useEffect(() => {
    if (routeCoordinates.length === 0) {
      setSeconds(0);
      setDistance(0);
    }
  }, [routeCoordinates]);

  // 経過時間の計測（isTrackingがtrueのときだけカウントが進む）
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTracking) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking]);

  // 軌跡が更新されるたびに距離を累積計算する
  useEffect(() => {
    if (!isTracking) return;
    if (routeCoordinates.length < 2) return;

    const lastPoint = routeCoordinates[routeCoordinates.length - 1];
    const secondLastPoint = routeCoordinates[routeCoordinates.length - 2];
    const addedDistance = calculateDistance(secondLastPoint, lastPoint);

    if (addedDistance > 0.5) {
      setDistance((prev) => prev + addedDistance);
    }
  }, [routeCoordinates, isTracking]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  const formatDistance = (meters: number) => {
    return (meters / 1000).toFixed(2);
  };

  return {
    timeDisplay: formatTime(seconds),
    distanceDisplay: formatDistance(distance),
  };
}
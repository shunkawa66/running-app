'use client';

import { useState, useEffect } from 'react';

export function useCurrentLocation() {
  const [position, setPosition] = useState<[number, number]>([35.6812, 139.7671]); // 初期値
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      alert('お使いのブラウザは位置情報の取得に対応していません。');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setHasLocation(true);
      },
      (err) => {
        console.error('位置情報の取得に失敗しました:', err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return { position, hasLocation };
}
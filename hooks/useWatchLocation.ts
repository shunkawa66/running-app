'use client';

import { useState, useEffect } from 'react';

export function useWatchLocation() {
  const [position, setPosition] = useState<[number, number]>([35.6812, 139.7671]); // 初期値
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      alert('お使いのブラウザは位置情報の取得に対応していません。');
      return;
    }

    // 継続的に現在地を監視する
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setHasLocation(true);
      },
      (err) => {
        console.error('位置情報の監視に失敗しました:', err);
      },
      {
        enableHighAccuracy: true, // 高精度GPS
        maximumAge: 0,            // キャッシュを使わず最新の情報を取得
        timeout: 10000,
      }
    );

    // コンポーネントがアンマウントされたら監視を停止する（メモリリーク防止）
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { position, hasLocation };
}
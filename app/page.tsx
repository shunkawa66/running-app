'use client';

import dynamic from 'next/dynamic';
import { useWatchLocation } from '../hooks/useWatchLocation'; // 変更：watch用フックを使用

// Leafletはブラウザ側でのみ動作するため、SSRを無効化して動的読み込み
const BaseMap = dynamic(() => import('../components/BaseMap'), { ssr: false });
const MapUpdater = dynamic(() => import('../components/MapUpdater'), { ssr: false });
const CurrentLocationMarker = dynamic(() => import('../components/CurrentLocationMarker'), { ssr: false });

export default function Home() {
  // リアルタイムで位置情報を監視・取得するカスタムフックを使用
  const { position, hasLocation } = useWatchLocation();

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <h1 style={{ 
        position: 'absolute', 
        top: 10, 
        left: 10, 
        zIndex: 1000, 
        background: 'white', 
        padding: '8px 14px', 
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        ランニングアプリ 🏃‍♂️
      </h1>

      <BaseMap center={position}>
        <MapUpdater center={position} />
        <CurrentLocationMarker position={position} hasLocation={hasLocation} />
      </BaseMap>
    </main>
  );
}
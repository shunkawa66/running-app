'use client';

import dynamic from 'next/dynamic';
import { useWatchLocation } from '../hooks/useWatchLocation';
import { useRunTracker } from '../hooks/useRunTracker';
import { useRunStats } from '../hooks/useRunStats';

// Dynamic Imports
const BaseMap = dynamic(() => import('../components/BaseMap'), { ssr: false });
const MapUpdater = dynamic(() => import('../components/MapUpdater'), { ssr: false });
const CurrentLocationMarker = dynamic(() => import('../components/CurrentLocationMarker'), { ssr: false });
const RoutePolyline = dynamic(() => import('../components/RoutePolyline'), { ssr: false });

export default function Home() {
  const { position, hasLocation } = useWatchLocation();
  const { isTracking, routeCoordinates, startRun, stopRun } = useRunTracker();
  const { timeDisplay, distanceDisplay } = useRunStats(isTracking, routeCoordinates);

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* タイトル */}
      <h1 style={{ 
        position: 'absolute', top: 10, left: 10, zIndex: 1000, 
        background: 'white', padding: '8px 14px', borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)', fontSize: '16px', fontWeight: 'bold'
      }}>
        ランニングアプリ 🏃‍♂️
      </h1>

      {/* リアルタイム計測のダッシュボード（常時表示に変更） */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, background: 'white', padding: '10px 20px', borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)', display: 'flex', gap: '24px', alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>距離</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb' }}>
            {distanceDisplay} <span style={{ fontSize: '12px' }}>km</span>
          </div>
        </div>
        <div style={{ width: '1px', height: '30px', background: '#e5e7eb' }} />
        <div>
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>時間</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a' }}>
            {timeDisplay}
          </div>
        </div>
      </div>

      {/* スタート・ストップボタン（下部中央） */}
      <div style={{ 
        position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', 
        zIndex: 1000, display: 'flex', gap: '12px' 
      }}>
        {!isTracking ? (
          <button 
            onClick={startRun}
            style={{
              background: '#22c55e', color: 'white', border: 'none',
              padding: '12px 32px', borderRadius: '30px', fontSize: '16px',
              fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', cursor: 'pointer'
            }}
          >
            スタート
          </button>
        ) : (
          <button 
            onClick={stopRun}
            style={{
              background: '#ef4444', color: 'white', border: 'none',
              padding: '12px 32px', borderRadius: '30px', fontSize: '16px',
              fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', cursor: 'pointer'
            }}
          >
            ストップ
          </button>
        )}
      </div>

      {/* 地図コンポーネント */}
      <BaseMap center={position}>
        <MapUpdater center={position} />
        <CurrentLocationMarker position={position} hasLocation={hasLocation} />
        <RoutePolyline positions={routeCoordinates} />
      </BaseMap>
    </main>
  );
}
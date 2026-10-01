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
const RunDashboard = dynamic(() => import('../components/RunDashboard'), { ssr: false });
const RunControls = dynamic(() => import('../components/RunControls'), { ssr: false });

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

      {/* ダッシュボードとコントロールボタンを分離 */}
      <RunDashboard distanceDisplay={distanceDisplay} timeDisplay={timeDisplay} />
      <RunControls isTracking={isTracking} onStart={startRun} onStop={stopRun} />

      {/* 地図コンポーネント */}
      <BaseMap center={position}>
        <MapUpdater center={position} />
        <CurrentLocationMarker position={position} hasLocation={hasLocation} />
        <RoutePolyline positions={routeCoordinates} />
      </BaseMap>
    </main>
  );
}
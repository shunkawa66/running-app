'use client';

import { Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface RoutePolylineProps {
  positions: [number, number][];
}

export default function RoutePolyline({ positions }: RoutePolylineProps) {
  if (positions.length < 2) return null;

  return (
    <Polyline 
      positions={positions} 
      pathOptions={{ color: '#3b82f6', weight: 5, opacity: 0.8 }} 
    />
  );
}
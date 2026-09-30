'use client';

import { ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface BaseMapProps {
  center: [number, number];
  zoom?: number;
  children: ReactNode;
}

export default function BaseMap({ center, zoom = 16, children }: BaseMapProps) {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
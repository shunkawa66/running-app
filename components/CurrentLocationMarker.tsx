'use client';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leafletのデフォルトアイコンのパス切れ対策（おまじない）
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CurrentLocationMarkerProps {
  position: [number, number];
  hasLocation: boolean;
}

export default function CurrentLocationMarker({ position, hasLocation }: CurrentLocationMarkerProps) {
  return (
    <Marker position={position}>
      <Popup>
        {hasLocation ? 'いまここ！' : '現在地を取得中...'}
      </Popup>
    </Marker>
  );
}
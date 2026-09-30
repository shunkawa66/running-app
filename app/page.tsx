'use client'; // ブラウザ側で動かす宣言

import dynamic from 'next/dynamic';

// Leafletはサーバーサイドレンダリングに対応していないため、動的に読み込む
const MapWithNoSSR = dynamic(
  () => import('../components/MapComponent'), // 後から別ファイルに分けることもできます
  { ssr: false }
);

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <h1 style={{ position: 'absolute', zIndex: 1000, background: 'white', padding: '10px' }}>
        ランニングアプリ 🏃‍♂️
      </h1>
      <MapWithNoSSR />
    </main>
  );
}
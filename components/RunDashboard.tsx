'use client';

interface RunDashboardProps {
  distanceDisplay: string;
  timeDisplay: string;
}

export default function RunDashboard({ distanceDisplay, timeDisplay }: RunDashboardProps) {
  return (
    <div style={{
      position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, background: 'white', padding: '10px 20px', borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)', display: 'flex', gap: '20px', alignItems: 'center',
      whiteSpace: 'nowrap'
    }}>
      <div>
        <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>距離</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb', whiteSpace: 'nowrap' }}>
          {distanceDisplay} <span style={{ fontSize: '12px' }}>km</span>
        </div>
      </div>
      <div style={{ width: '1px', height: '30px', background: '#e5e7eb' }} />
      <div>
        <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>時間</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a', whiteSpace: 'nowrap' }}>
          {timeDisplay}
        </div>
      </div>
    </div>
  );
}
'use client';

interface RunControlsProps {
  isTracking: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function RunControls({ isTracking, onStart, onStop }: RunControlsProps) {
  return (
    <div style={{ 
      position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', 
      zIndex: 1000, display: 'flex', gap: '12px' 
    }}>
      {!isTracking ? (
        <button 
          onClick={onStart}
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
          onClick={onStop}
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
  );
}
import React from 'react';

const CRTOverlay: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      pointerEvents: 'none',
      background: `
        linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
        linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))
      `,
      backgroundSize: '100% 4px, 6px 100%',
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)',
      mixBlendMode: 'overlay',
      opacity: 0.4
    }}>
      <style>
        {`
          @keyframes flicker {
            0% { opacity: 0.95; }
            5% { opacity: 0.85; }
            10% { opacity: 0.95; }
            15% { opacity: 1; }
            50% { opacity: 0.95; }
            100% { opacity: 0.9; }
          }
          
          .crt-flicker {
            width: 100%;
            height: 100%;
            animation: flicker 0.15s infinite;
          }
        `}
      </style>
      <div className="crt-flicker"></div>
    </div>
  );
};

export default CRTOverlay;

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
        linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.06) 50%), 
        linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.008), rgba(0, 0, 255, 0.02))
      `,
      backgroundSize: '100% 3px, 6px 100%',
      /* Removed the heavy inset box-shadow — it was the main source of darkness */
      mixBlendMode: 'overlay',
      opacity: 0.25
    }}>
      <style>
        {`
          @keyframes flicker {
            0%   { opacity: 0.98; }
            5%   { opacity: 0.92; }
            10%  { opacity: 0.98; }
            15%  { opacity: 1; }
            50%  { opacity: 0.97; }
            100% { opacity: 0.95; }
          }
          
          .crt-flicker {
            width: 100%;
            height: 100%;
            animation: flicker 0.2s infinite;
          }
        `}
      </style>
      <div className="crt-flicker"></div>
    </div>
  );
};

export default CRTOverlay;

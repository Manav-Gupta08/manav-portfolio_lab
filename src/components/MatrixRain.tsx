import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - mixing katakana, latin, and digits
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=~アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let drops: number[] = [];

    // Initialize drops
    const initDrops = () => {
      columns = canvas.width / fontSize;
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }
    };
    initDrops();

    const draw = () => {
      // Semi-transparent black background to create trails
      // We use a CSS variable for the theme background, but for the canvas we need rgba
      // To work with both light/dark, we can just use a highly transparent layer
      // For a true matrix feel, a dark trail is best, but we'll try to read the computed style or just use rgba(0,0,0,0.05)
      const isLightMode = document.body.classList.contains('light-theme');
      ctx.fillStyle = isLightMode ? 'rgba(244, 245, 247, 0.1)' : 'rgba(2, 2, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get the neon green color from CSS variables
      const computedStyle = getComputedStyle(document.body);
      const neonGreen = computedStyle.getPropertyValue('--neon-green').trim() || '#00ff41';

      ctx.fillStyle = neonGreen;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly if it reaches the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -20,
        pointerEvents: 'none',
        opacity: 0.5 // Keep it slightly subtle so content is readable
      }}
    />
  );
};

export default MatrixRain;

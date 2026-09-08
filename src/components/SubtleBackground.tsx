import React, { useEffect, useRef, useState } from 'react';
import styles from './SubtleBackground.module.css';

interface Dot {
  id: number;
  x: number;
  y: number;
  travelX: number;
  travelY: number;
  opacity: number;
}

const SubtleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Throttle mouse updates via requestAnimationFrame
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          containerRef.current.style.setProperty('--mouse-x', `${x}px`);
          containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    };

    // Only add mouse tracking if hover is supported (ignore on pure touch devices to save perf)
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (mediaQuery.matches) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Ambient Dot Logic
  useEffect(() => {
    let timeoutId: number;
    let dotIdCounter = 0;

    const spawnDot = () => {
      // Very rare ambient activity - spawn every 3-8 seconds
      const nextSpawnTime = Math.random() * 5000 + 3000;
      
      timeoutId = setTimeout(() => {
        // Decide if it runs horizontal or vertical along the grid lines
        const isHorizontal = Math.random() > 0.5;
        
        // Grid size is 40px, so we snap to 40px intervals
        const snap = 40;
        
        let startX, startY, travelX, travelY;

        if (isHorizontal) {
          startX = Math.floor((Math.random() * window.innerWidth) / snap) * snap;
          startY = Math.floor((Math.random() * window.innerHeight) / snap) * snap;
          travelX = startX + (Math.random() > 0.5 ? 200 : -200);
          travelY = startY;
        } else {
          startX = Math.floor((Math.random() * window.innerWidth) / snap) * snap;
          startY = Math.floor((Math.random() * window.innerHeight) / snap) * snap;
          travelX = startX;
          travelY = startY + (Math.random() > 0.5 ? 200 : -200);
        }

        const newDot: Dot = {
          id: dotIdCounter++,
          x: startX,
          y: startY,
          travelX,
          travelY,
          opacity: 0
        };

        setDots(prev => [...prev, newDot]);

        // Animate opacity in and out
        setTimeout(() => {
          setDots(prev => prev.map(d => d.id === newDot.id ? { ...d, opacity: 1 } : d));
        }, 50);

        setTimeout(() => {
          setDots(prev => prev.map(d => d.id === newDot.id ? { ...d, opacity: 0 } : d));
        }, 2000);

        // Remove dot after animation
        setTimeout(() => {
          setDots(prev => prev.filter(d => d.id !== newDot.id));
        }, 3000);

        // Queue next spawn
        spawnDot();
      }, nextSpawnTime);
    };

    spawnDot();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.backgroundContainer} ref={containerRef}>
      <div className={styles.noiseLayer} />
      <div className={styles.gridLayer} />
      <div className={styles.lightReveal} />
      <div className={styles.vignette} />
      
      {dots.map(dot => (
        <div
          key={dot.id}
          className={styles.ambientDot}
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            opacity: dot.opacity,
            transform: `translate(${dot.opacity > 0 ? dot.travelX - dot.x : 0}px, ${dot.opacity > 0 ? dot.travelY - dot.y : 0}px)`
          }}
        />
      ))}
    </div>
  );
};

export default SubtleBackground;

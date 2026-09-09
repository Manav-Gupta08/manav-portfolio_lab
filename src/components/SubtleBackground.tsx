import React, { useEffect, useRef, useState } from 'react';
import styles from './SubtleBackground.module.css';

interface Dot {
  id: number;
  x: number;
  y: number;
  travelX: number;
  travelY: number;
  opacity: number;
  size: number;
  color: 'cyan' | 'green' | 'purple';
}

const DOT_COLORS = ['cyan', 'green', 'green', 'purple'] as const; // Green appears 2x more often

// Green blob approximate screen center (top-left region)
// Green blob: top:-30% left:-20% → visible center roughly at 10% x, 10% y
// Purple blob: bottom:-25% right:-15% → visible center roughly at 90% x, 85% y

const SubtleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);

  // Mouse tracking: position + color-aware grid reveal
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        containerRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${mouseY}px`);

        // ── Color-aware grid reveal ──
        // Normalize cursor to 0..1
        const xRatio = mouseX / rect.width;
        const yRatio = mouseY / rect.height;

        // Distance from cursor to each blob's approximate visible center
        // Green blob: top-left (~10% x, ~15% y of screen after animation)
        const distToGreen = Math.sqrt(
          Math.pow(xRatio - 0.10, 2) + Math.pow(yRatio - 0.15, 2)
        );
        // Purple blob: bottom-right (~88% x, ~82% y)
        const distToPurple = Math.sqrt(
          Math.pow(xRatio - 0.88, 2) + Math.pow(yRatio - 0.82, 2)
        );

        // Weight for purple: 0 = pure green, 1 = pure purple
        const total = distToGreen + distToPurple;
        const weightPurple = total > 0 ? distToGreen / total : 0;

        // Interpolate: Green=rgb(0,255,65) → Purple=rgb(176,38,255)
        const r = Math.round(weightPurple * 176);
        const g = Math.round((1 - weightPurple) * 255 + weightPurple * 38);
        const b = Math.round((1 - weightPurple) * 65 + weightPurple * 255);

        containerRef.current.style.setProperty('--reveal-r', r.toString());
        containerRef.current.style.setProperty('--reveal-g', g.toString());
        containerRef.current.style.setProperty('--reveal-b', b.toString());
      });
    };

    const mediaQuery = window.matchMedia('(hover: hover)');
    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      if (mediaQuery.matches) window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Ambient particles — increased count with size variety
  useEffect(() => {
    let animationFrameId: number;
    let particleList: Dot[] = [];

    // 80 particles with random sizes
    for (let i = 0; i < 80; i++) {
      particleList.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        travelX: (Math.random() - 0.5) * 0.35,
        travelY: Math.random() * -0.65 - 0.15,
        opacity: Math.random() * 0.55 + 0.08,
        size: Math.random() * 2.5 + 1, // 1px to 3.5px
        color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)],
      });
    }
    setDots(particleList);

    let lastTime = performance.now();
    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 16.66;
      lastTime = time;
      setDots(prev => prev.map(dot => {
        let newX = dot.x + dot.travelX * deltaTime;
        let newY = dot.y + dot.travelY * deltaTime;
        // Wrap around
        if (newY < -10) newY = window.innerHeight + 10;
        if (newX < -10) newX = window.innerWidth + 10;
        if (newX > window.innerWidth + 10) newX = -10;
        return { ...dot, x: newX, y: newY };
      }));
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const getDotStyle = (dot: Dot) => {
    switch (dot.color) {
      case 'cyan':   return { background: 'rgba(0,240,255,0.75)', boxShadow: `0 0 ${dot.size * 2}px rgba(0,240,255,0.5)` };
      case 'green':  return { background: 'rgba(0,255,65,0.75)',  boxShadow: `0 0 ${dot.size * 2}px rgba(0,255,65,0.5)` };
      case 'purple': return { background: 'rgba(176,38,255,0.65)', boxShadow: `0 0 ${dot.size * 2}px rgba(176,38,255,0.4)` };
    }
  };

  return (
    <div className={styles.backgroundContainer} ref={containerRef}>
      <div className={styles.noiseLayer} />
      <div className={styles.gridLayer} />
      <div className={styles.auroraLayer} />
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
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            ...getDotStyle(dot),
          }}
        />
      ))}
    </div>
  );
};

export default SubtleBackground;

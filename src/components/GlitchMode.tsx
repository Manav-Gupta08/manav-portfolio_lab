import React, { useEffect, useRef } from 'react';
import styles from './GlitchMode.module.css';

interface GlitchModeProps {
  isGlitched: boolean;
  onToggle: () => void;
}

// Convert text to binary representation
function toBinary(str: string): string {
  return str
    .split('')
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

// Corrupt a text node's content
function corruptText(original: string): string {
  const rnd = Math.random();
  if (rnd < 0.33) return toBinary(original.slice(0, Math.min(original.length, 6)));
  if (rnd < 0.66) {
    const hexGarble = Array.from({ length: original.length }, () =>
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('');
    return '0x' + hexGarble.slice(0, original.length * 2);
  }
  // Scramble chars
  return original
    .split('')
    .map((c) =>
      Math.random() < 0.6
        ? String.fromCharCode(33 + Math.floor(Math.random() * 94))
        : c
    )
    .join('');
}

const GlitchMode: React.FC<GlitchModeProps> = ({ isGlitched, onToggle }) => {
  const originalTextsRef = useRef<Map<Text, string>>(new Map());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pixelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Text corruption
  useEffect(() => {
    const excluded = ['DONT_CLICK_BTN', 'REBOOT_BTN'];

    if (isGlitched) {
      // Collect all text nodes in the page body (not the button)
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const el = node.parentElement;
            if (!el) return NodeFilter.FILTER_REJECT;
            if (excluded.some((_) => el.closest(`[data-glitch-exclude]`))) return NodeFilter.FILTER_REJECT;
            if (el.closest('[data-glitch-btn]')) return NodeFilter.FILTER_REJECT;
            if ((node.textContent ?? '').trim().length < 2) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      const textNodes: Text[] = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode as Text);
      }

      // Save originals
      originalTextsRef.current = new Map();
      textNodes.forEach((n) => originalTextsRef.current.set(n, n.textContent ?? ''));

      // Initial corruption
      textNodes.forEach((n) => {
        const orig = originalTextsRef.current.get(n) ?? '';
        n.textContent = corruptText(orig);
      });

      // Interval re-corrupt for flickering effect
      intervalRef.current = setInterval(() => {
        textNodes.forEach((n) => {
          if (!document.body.contains(n)) return;
          const orig = originalTextsRef.current.get(n) ?? '';
          n.textContent = corruptText(orig);
        });
      }, 400);
    } else {
      // Restore
      if (intervalRef.current) clearInterval(intervalRef.current);
      originalTextsRef.current.forEach((orig, node) => {
        if (document.body.contains(node)) node.textContent = orig;
      });
      originalTextsRef.current.clear();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isGlitched]);

  // Pixel-break canvas overlay
  useEffect(() => {
    if (isGlitched) {
      const canvas = document.createElement('canvas');
      canvas.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 9000; mix-blend-mode: screen; opacity: 0.45;
      `;
      document.body.appendChild(canvas);
      pixelCanvasRef.current = canvas;

      const draw = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);

        // Random pixel blocks
        const numBlocks = 80 + Math.floor(Math.random() * 60);
        for (let i = 0; i < numBlocks; i++) {
          const x = Math.floor(Math.random() * w);
          const y = Math.floor(Math.random() * h);
          const bw = 2 + Math.floor(Math.random() * 60);
          const bh = 1 + Math.floor(Math.random() * 12);
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          const a = 0.3 + Math.random() * 0.7;
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fillRect(x, y, bw, bh);
        }

        // Scanline tears
        const numLines = 3 + Math.floor(Math.random() * 6);
        for (let i = 0; i < numLines; i++) {
          const y = Math.floor(Math.random() * h);
          const shift = (Math.random() - 0.5) * 80;
          ctx.save();
          ctx.drawImage(canvas, shift, y, w, 4, 0, y, w, 4);
          ctx.restore();
        }

        animFrameRef.current = requestAnimationFrame(draw);
      };

      animFrameRef.current = requestAnimationFrame(draw);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (pixelCanvasRef.current) {
        pixelCanvasRef.current.remove();
        pixelCanvasRef.current = null;
      }
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (pixelCanvasRef.current) {
        pixelCanvasRef.current.remove();
        pixelCanvasRef.current = null;
      }
    };
  }, [isGlitched]);

  return (
    <div className={styles.wrapper} data-glitch-btn>
      <button
        id={isGlitched ? 'REBOOT_BTN' : 'DONT_CLICK_BTN'}
        className={`${styles.btn} ${isGlitched ? styles.reboot : styles.dontClick}`}
        onClick={onToggle}
      >
        {isGlitched ? (
          <span>⟳ REBOOT SYSTEM</span>
        ) : (
          <span>
            <span className={styles.skull}>☠</span> Don&apos;t Click
          </span>
        )}
      </button>
      {isGlitched && (
        <div className={styles.corruptLabel}>
          CRITICAL_ERROR: MEMORY_CORRUPTION_DETECTED — SYS_HALT
        </div>
      )}
    </div>
  );
};

export default GlitchMode;

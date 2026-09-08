import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Canvas.module.css';
import { portfolioData } from '../data/data';
import CoreIdentityNode from './nodes/CoreIdentityNode';
import ProjectNode from './nodes/ProjectNode';
import SkillNode from './nodes/SkillNode';
import DetailOverlay from './DetailOverlay';

// Define the connections between nodes to render SVG lines
const CONNECTIONS = [
  { from: 'core', to: 'project-1' },
  { from: 'core', to: 'project-2' },
  { from: 'core', to: 'project-3' },
  { from: 'core', to: 'project-4' },
  { from: 'core', to: 's-python' },
  { from: 'core', to: 's-java' },
  { from: 'core', to: 's-web' },
  { from: 'core', to: 's-dsa' },
  { from: 'core', to: 's-cyber' },
  { from: 's-java', to: 's-oop' },
  { from: 's-python', to: 's-backend' },
  { from: 's-cyber', to: 's-linux' },
];

const Canvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Physics for zooming/panning might be added here if needed.
  // For now, pure drag on a massive canvas.
  
  return (
    <div className={styles.viewport} ref={containerRef}>
      <div className="bg-grid" />
      
      <motion.div 
        className={styles.canvas}
        drag
        dragConstraints={{ left: -1500, right: 1500, top: -1500, bottom: 1500 }}
        dragElastic={0.1}
        dragMomentum={false}
        initial={{ x: 0, y: 0 }}
      >
        <ConnectionLines />

        {/* Nodes */}
        <CoreIdentityNode 
          data={portfolioData.profile} 
          onClick={() => setSelectedNodeId('core')} 
        />
        
        {portfolioData.projects.map((project) => (
          <ProjectNode 
            key={project.id} 
            data={project} 
            onClick={() => setSelectedNodeId(project.id)} 
          />
        ))}

        {portfolioData.skills.map((skill) => (
          <SkillNode 
            key={skill.id} 
            data={skill} 
            onClick={() => setSelectedNodeId(skill.id)} 
          />
        ))}

      </motion.div>

      {/* Overlay UI */}
      <DetailOverlay 
        nodeId={selectedNodeId} 
        onClose={() => setSelectedNodeId(null)} 
      />
      
      {/* HUD (Heads Up Display) */}
      <div className={styles.hud}>
        <div className={styles.hudText}>
          <span className="text-accent">SYS_STATUS:</span> ONLINE <br />
          <span className="text-muted">DRAG TO EXPLORE</span>
        </div>
      </div>
    </div>
  );
};

// Extracted component for lines to keep Canvas clean
const ConnectionLines: React.FC = () => {
  // Compute positions. Core is at 0,0.
  const getPos = (id: string) => {
    let raw = { x: 0, y: 0 };
    if (id === 'core') raw = { x: 0, y: 0 };
    else {
      const p = portfolioData.projects.find(p => p.id === id);
      if (p) raw = { x: p.x, y: p.y };
      else {
        const s = portfolioData.skills.find(s => s.id === id);
        if (s) raw = { x: s.x, y: s.y };
      }
    }
    // Offset by 2000 because the canvas is 4000x4000 and center is at 2000,2000
    return { x: raw.x + 2000, y: raw.y + 2000 };
  };

  return (
    <svg className={styles.svgOverlay} viewBox="0 0 4000 4000">
      {CONNECTIONS.map((conn, i) => {
        const from = getPos(conn.from);
        const to = getPos(conn.to);
        return (
          <line 
            key={i}
            x1={from.x} 
            y1={from.y} 
            x2={to.x} 
            y2={to.y} 
            stroke="var(--color-border)" 
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        );
      })}
    </svg>
  );
};

export default Canvas;

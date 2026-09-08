import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './DetailOverlay.module.css';
import { portfolioData, ProjectData, SkillData } from '../data/data';

interface Props {
  nodeId: string | null;
  onClose: () => void;
}

const DetailOverlay: React.FC<Props> = ({ nodeId, onClose }) => {
  // Find the data based on nodeId
  let data: any = null;
  let type: 'Core' | 'Project' | 'Skill' | null = null;

  if (nodeId === 'core') {
    data = portfolioData.profile;
    type = 'Core';
  } else if (nodeId?.startsWith('project-')) {
    data = portfolioData.projects.find(p => p.id === nodeId);
    type = 'Project';
  } else if (nodeId?.startsWith('s-')) {
    data = portfolioData.skills.find(s => s.id === nodeId);
    type = 'Skill';
  }

  return (
    <AnimatePresence>
      {nodeId && data && (
        <div className={styles.overlay}>
          <motion.div 
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className={styles.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>

            <div className={styles.header}>
              <div className={styles.typeLabel}>
                {type === 'Core' ? '> SYSTEM_INFO' : 
                 type === 'Project' ? `// MODULE: ${(data as ProjectData).type.toUpperCase()}` : 
                 `// KNOWLEDGE_NODE: ${(data as SkillData).category.toUpperCase()}`}
              </div>
              <h2 className={styles.title}>
                {type === 'Core' ? data.name : 
                 type === 'Project' ? (data as ProjectData).title : 
                 (data as SkillData).name}
              </h2>
            </div>

            <div className={styles.body}>
              {type === 'Core' && (
                <>
                  <p style={{marginBottom: '1rem', color: 'var(--color-text-primary)', fontSize: '1.2rem'}}>
                    {data.title}
                  </p>
                  <p>{data.description}</p>
                  
                  <div style={{marginTop: '2rem'}}>
                    <div className={styles.typeLabel}>&gt; CONTACT_PROTOCOLS</div>
                    <ul style={{listStyle: 'none', padding: 0}}>
                      <li style={{marginBottom: '0.5rem'}}><a href={`mailto:${data.email}`}>EMAIL: {data.email}</a></li>
                      <li style={{marginBottom: '0.5rem'}}><a href={data.github} target="_blank" rel="noreferrer">GITHUB: {data.github}</a></li>
                      <li style={{marginBottom: '0.5rem'}}><a href={data.linkedin} target="_blank" rel="noreferrer">LINKEDIN: {data.linkedin}</a></li>
                      <li style={{marginBottom: '0.5rem'}}><a href={data.leetcode} target="_blank" rel="noreferrer">LEETCODE: {data.leetcode}</a></li>
                      <li style={{marginBottom: '0.5rem'}}><a href={data.x} target="_blank" rel="noreferrer">X (TWITTER): {data.x}</a></li>
                    </ul>
                  </div>
                </>
              )}

              {type === 'Project' && (
                <>
                  <p>{(data as ProjectData).fullDescription}</p>
                  <div className={styles.techList}>
                    {(data as ProjectData).tech.map(t => (
                      <span key={t} className={styles.techItem}>{t}</span>
                    ))}
                  </div>
                </>
              )}

              {type === 'Skill' && (
                <>
                  <div style={{marginBottom: '2rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                      <span>Proficiency</span>
                      <span className="font-mono text-accent">{(data as SkillData).level}%</span>
                    </div>
                    <div style={{width: '100%', height: '4px', background: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden'}}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(data as SkillData).level}%` }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        style={{height: '100%', background: 'var(--color-accent)'}}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DetailOverlay;

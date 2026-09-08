import React from 'react';
import { motion } from 'framer-motion';
import styles from './Node.module.css';
import { ProjectData } from '../../data/data';

interface Props {
  data: ProjectData;
  onClick: () => void;
}

const ProjectNode: React.FC<Props> = ({ data, onClick }) => {
  return (
    <motion.div 
      className={`${styles.node} ${styles.projectNode}`}
      style={{ left: `calc(50% + ${data.x}px)`, top: `calc(50% + ${data.y}px)` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.5 + 0.2 }}
      whileHover={{ scale: 1.05 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={styles.subtitle}>// {data.type.toUpperCase()} MODULE</div>
      <h3 className={styles.title}>{data.title}</h3>
      <p className={styles.desc}>{data.shortDescription}</p>
      
      <div className={styles.techList}>
        {data.tech.slice(0, 3).map(t => (
          <span key={t} className={styles.techItem}>{t}</span>
        ))}
        {data.tech.length > 3 && <span className={styles.techItem}>+</span>}
      </div>
    </motion.div>
  );
};

export default ProjectNode;

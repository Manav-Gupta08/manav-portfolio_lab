import React from 'react';
import { motion } from 'framer-motion';
import styles from './Node.module.css';
import { SkillData } from '../../data/data';

interface Props {
  data: SkillData;
  onClick: () => void;
}

const SkillNode: React.FC<Props> = ({ data, onClick }) => {
  return (
    <motion.div 
      className={`${styles.node} ${styles.skillNode}`}
      style={{ left: `calc(50% + ${data.x}px)`, top: `calc(50% + ${data.y}px)` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.5 + 0.5 }}
      whileHover={{ scale: 1.1 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div style={{ fontWeight: 600 }}>{data.name}</div>
      <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
        LVL: {data.level}
      </div>
    </motion.div>
  );
};

export default SkillNode;

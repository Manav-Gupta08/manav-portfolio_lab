import React from 'react';
import { motion } from 'framer-motion';
import styles from './Node.module.css';

interface Props {
  data: {
    name: string;
    title: string;
    description: string;
  };
  onClick: () => void;
}

const CoreIdentityNode: React.FC<Props> = ({ data, onClick }) => {
  return (
    <motion.div 
      className={`${styles.node} ${styles.coreNode}`}
      style={{ left: '50%', top: '50%' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onClick={(e) => {
        // Prevent the drag event from the canvas from triggering click
        e.stopPropagation();
        onClick();
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.subtitle}>&gt; CORE_IDENTITY</div>
      <h1 className={styles.title}>{data.name}</h1>
      <h2 className={styles.subtitle} style={{color: 'var(--color-text-secondary)'}}>{data.title}</h2>
      <p className={styles.desc}>{data.description}</p>
    </motion.div>
  );
};

export default CoreIdentityNode;

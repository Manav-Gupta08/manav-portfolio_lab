import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        
        <motion.div 
          className={styles.sysStatus}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-green">[ STATUS: ONLINE ]</span>
          <span className={styles.pulse}></span>
        </motion.div>

        <h1 className={`${styles.title} font-display`}>
          <motion.span 
            className={styles.glitchText}
            data-text="MANAV"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            MANAV
          </motion.span>
          <br />
          <motion.span 
            className={`${styles.glitchText} text-cyan`}
            data-text="GUPTA"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            GUPTA
          </motion.span>
        </h1>
        
        <motion.div 
          className={styles.meta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className={styles.roleTag}>
            <span className={styles.tagBracket}>&lt;</span>
            BACKEND_ENGINEER
            <span className={styles.tagBracket}>/&gt;</span>
          </div>
          <div className={styles.roleTag}>
            <span className={styles.tagBracket}>&lt;</span>
            SEC_ANALYST
            <span className={styles.tagBracket}>/&gt;</span>
          </div>
        </motion.div>
        
        <motion.p 
          className={styles.bio}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Analyzing vulnerabilities, building robust architectures, and exploring the depths of systems programming. 
          <br/><br/>
          <span className="text-magenta">&gt; TARGET ACQUIRED</span>
        </motion.p>

        <motion.div 
          className={styles.ctaWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <a href="#projects" className={styles.cyberBtn}>
            ACCESS_DATA()
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

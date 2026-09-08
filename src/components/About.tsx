import React from 'react';
import TerminalWindow from './TerminalWindow';
import styles from './About.module.css';

const About: React.FC = () => {
  const terminalLines = [
    "cat /sys/manav/identity.txt",
    "Loading...",
    "NAME: Manav Gupta",
    "ROLE: Computer Science Engineer | Backend & Cyber Enthusiast",
    "--------------------------------------------------",
    "BIO: Focused on software engineering, backend architecture, and cybersecurity.",
    "Driven by the desire to understand how systems function internally at the lowest levels.",
    "Whether building practical applications, analyzing vulnerabilities, or exploring",
    "quantum computing, the goal is always to create robust, resilient solutions.",
    "--------------------------------------------------",
    "STATUS: Ready for new challenges."
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="text-cyan font-header" style={{ fontSize: '1.2rem', letterSpacing: '0.2em' }}>
            // SYS.ABOUT
          </span>
          <h2 className={styles.sectionTitle}>CORE_IDENTITY</h2>
        </div>
        
        <div className={styles.grid}>
          <div className={styles.terminalWrapper}>
             <TerminalWindow lines={terminalLines} />
          </div>
          
          <div className={`glass-panel ${styles.eduCard}`}>
            <div>
              <p className="text-cyan font-header" style={{fontSize: '1rem', letterSpacing: '0.1em'}}>// EDUCATION</p>
              <h3 className={styles.eduTitle}>COMPUTER SCIENCE <br/>& ENGINEERING</h3>
              <p className={styles.eduDetails}>B.TECH UNDERGRADUATE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

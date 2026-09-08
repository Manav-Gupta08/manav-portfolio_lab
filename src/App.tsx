import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import ProjectList from './components/ProjectList';
import Skills from './components/Skills';
import MatrixRain from './components/MatrixRain';
import CRTOverlay from './components/CRTOverlay';
import styles from './App.module.css';

function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLightMode]);

  return (
    <div className={styles.appContainer}>
      <div className="net-background"></div>
      <CRTOverlay />
      <MatrixRain />
      
      {/* Navigation / Header */}
      <nav className={`glass-panel ${styles.nav}`}>
        <div className={styles.logo}>
          <span className="text-cyan font-display">SYS.MANAV</span>
          <span className="text-magenta blink" style={{marginLeft: '10px', fontSize: '0.8rem'}}>[REC]</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>SYS.INFO</a>
          <a href="#skills" className={styles.navLink}>CAPABILITIES</a>
          <a href="#projects" className={styles.navLink}>ARCHIVE</a>
          <a href="#contact" className={styles.navLink}>COMM_LINK</a>
        </div>
        
        <button 
          className={styles.themeToggle} 
          onClick={() => setIsLightMode(!isLightMode)}
          aria-label="Toggle Theme"
        >
          {isLightMode ? '[ DARK_MODE ]' : '[ LIGHT_MODE ]'}
        </button>
      </nav>

      <main className={styles.mainContent}>
        <Hero />
        <About />
        <Skills />
        <ProjectList />
      </main>

      <footer id="contact" className={styles.footer}>
        <div className={`glass-panel ${styles.footerCard}`}>
          <div className={styles.footerContent}>
            <span className="text-magenta" style={{ fontSize: '0.9rem', letterSpacing: '0.1em' }}>[ CONNECTION SECURED ]</span>
            <h2 className={styles.footerTitle}>INITIATE TRANSFER?</h2>
            <div className={styles.footerLinks}>
              <a href="mailto:manavgupta0808@gmail.com" className={styles.cyberLink}>[ MAIL ]</a>
              <a href="https://github.com/Manav-Gupta08" target="_blank" rel="noreferrer" className={styles.cyberLink}>[ GITHUB ]</a>
              <a href="https://linkedin.com/in/manav-gupta-6602b929" target="_blank" rel="noreferrer" className={styles.cyberLink}>[ LINKEDIN ]</a>
              <a href="https://x.com/Manav_Gupta08" target="_blank" rel="noreferrer" className={styles.cyberLink}>[ TWITTER ]</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

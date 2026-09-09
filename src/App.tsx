import { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import CRTOverlay from './components/CRTOverlay';
import SubtleBackground from './components/SubtleBackground';
import styles from './App.module.css';
import { portfolioData } from './data/data';

// Toast state
interface Toast {
  id: number;
  message: string;
}

let toastId = 0;

function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Scroll progress + active section + nav shrink
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 60);

      // Active section detection
      const sections = ['dashboard', 'projects', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && scrollTop >= el.offsetTop - 150) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme toggle
  useEffect(() => {
    document.body.classList.toggle('light-theme', isLightMode);
  }, [isLightMode]);

  // Toast system
  const showToast = useCallback((message: string) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(portfolioData.profile.email).then(() => {
      showToast('Email copied to clipboard!');
    }).catch(() => {
      showToast('[ COPY FAILED ] — use: ' + portfolioData.profile.email);
    });
  }, [showToast]);

  const navLinkClass = (section: string) =>
    `${styles.navLink} ${activeSection === section ? styles.navLinkActive : ''}`;

  return (
    <div className={styles.appContainer}>
      <SubtleBackground />
      <CRTOverlay />

      {/* Scroll Progress Bar */}
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className={`glass-panel ${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.logo}>
          <span className="text-cyan font-display">SYS.MANAV</span>
          <span className="text-magenta blink" style={{ marginLeft: '10px', fontSize: '0.8rem' }}>
            <span style={{
              display: 'inline-block', width: '8px', height: '8px',
              backgroundColor: 'var(--neon-magenta)', borderRadius: '50%',
              marginRight: '4px', verticalAlign: 'middle'
            }}></span>
            [REC]
          </span>
        </div>
        <div className={styles.navLinks}>
          <a href="#dashboard" className={navLinkClass('dashboard')}>DASHBOARD</a>
          <a href="#projects" className={navLinkClass('projects')}>ARCHIVE</a>
          <a href="#contact" className={navLinkClass('contact')}>COMM_LINK</a>
        </div>
        <button
          className={styles.themeToggle}
          onClick={() => setIsLightMode(!isLightMode)}
        >
          [ {isLightMode ? 'DARK_MODE' : 'LIGHT_MODE'} ]
        </button>
      </nav>

      <main className={styles.mainContent}>
        <Hero />
        <Dashboard />
        <ProjectList />
      </main>

      {/* Footer / Contact */}
      <footer id="contact" className={styles.footer}>
        <div className={`glass-panel ${styles.footerCard}`}>
          <div className={styles.footerContent}>
            <div className={styles.footerSignalRow}>
              <span className={styles.signalDot}></span>
              <span className="text-magenta" style={{ fontSize: '0.85rem', letterSpacing: '0.12em' }}>
                [ CONNECTION SECURED ]
              </span>
              <span className={styles.signalDot}></span>
            </div>

            <h2 className={styles.footerTitle}>INITIATE TRANSFER?</h2>

            <p className={styles.footerSubtitle}>
              I'm open to collaborations, security research, and interesting backend problems.
              <br />Let's build something.
            </p>

            <div className={styles.footerLinks}>
              {/* Email — copies to clipboard */}
              <button
                className={styles.cyberLink}
                onClick={copyEmail}
                title="Click to copy email"
              >
                [ MAIL ]
              </button>
              <a href={portfolioData.profile.github} target="_blank" rel="noreferrer" className={styles.cyberLink}>
                [ GITHUB ]
              </a>
              <a href={portfolioData.profile.linkedin} target="_blank" rel="noreferrer" className={styles.cyberLink}>
                [ LINKEDIN ]
              </a>
              <a href={portfolioData.profile.x} target="_blank" rel="noreferrer" className={styles.cyberLink}>
                [ TWITTER ]
              </a>
              <a href={portfolioData.profile.leetcode} target="_blank" rel="noreferrer" className={styles.cyberLink}>
                [ LEETCODE ]
              </a>
            </div>

            <div className={styles.footerMeta}>
              <span>// Built by Manav Gupta</span>
              <span>// With Tea & Coffee XD</span>
              <span>// {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast notifications */}
      <div className={styles.toastContainer}>
        {toasts.map(toast => (
          <div key={toast.id} className={styles.toast}>
            <span className={styles.toastIcon}>✓</span>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

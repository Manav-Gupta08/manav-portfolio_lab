import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Dashboard.module.css';
import { portfolioData } from '../data/data';

// --- Live Clock ---
const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className={styles.clockWidget}>
      <span className={styles.clockLabel}>SYS_TIME</span>
      <span className={styles.clockTime}>
        {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
      </span>
      <span className={styles.clockDate}>
        {time.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
      </span>
    </div>
  );
};

// --- Animated Skill Bar ---
interface SkillBarProps {
  name: string;
  level: number;
  color?: string;
}
const SkillBar: React.FC<SkillBarProps> = ({ name, level, color = 'var(--neon-cyan)' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div className={styles.skillBarContainer} ref={ref}>
      <div className={styles.skillBarHeader}>
        <span>{name}</span>
        <span style={{ color }}>{level}%</span>
      </div>
      <div className={styles.skillBarTrack}>
        <motion.div
          className={styles.skillBarFill}
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
};

// --- Rotating Hacker Quotes Terminal ---
const QuoteTerminal: React.FC = () => {
  const quotes = portfolioData.hackerQuotes;
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (typing) {
      if (displayed.length < quotes[idx].length) {
        const t = setTimeout(() => setDisplayed(quotes[idx].slice(0, displayed.length + 1)), 25);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 3500);
        return () => clearTimeout(t);
      }
    } else {
      // Erase
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 15);
        return () => clearTimeout(t);
      } else {
        setIdx((prev) => (prev + 1) % quotes.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, idx, quotes]);

  return (
    <div className={styles.quoteTerminal}>
      <div className={styles.quotePrompt}><span className={styles.terminalPrompt}>sys@manav</span> :~$</div>
      <div className={styles.quoteText}>
        {displayed}<span className={styles.quoteCursor}>█</span>
      </div>
    </div>
  );
};

// --- ASCII Avatar ---
const AsciiAvatar: React.FC = () => (
  <div className={styles.asciiWrapper}>
    <div className={styles.asciiScanlines} />
    <pre className={styles.asciiArt}>{`
  ██████╗
 ██╔═══██╗
 ██║   ██║
 ██║▄▄ ██║
 ╚██████╔╝
  ╚══▀▀═╝
 ┌────────┐
 │ MANAV  │
 │ GUPTA  │
 └────────┘
  BACKEND |
  SEC_OPS ↓
`}</pre>
    <div className={styles.asciiStatus}>
      <span className={styles.asciiOnline}></span> IDENTITY VERIFIED
    </div>
  </div>
);

// --- Main Dashboard ---
const Dashboard: React.FC = () => {
  const { profile, skills } = portfolioData;

  const languages = skills.filter(s => s.category === 'Language');
  const tools = skills.filter(s => s.category === 'Tool');
  const concepts = skills.filter(s => s.category === 'Concept');
  const domains = skills.filter(s => s.category === 'Domain');

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.section
      id="dashboard"
      className={styles.dashboardWrapper}
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.hudContainer}>

        {/* ── Left Column ── */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>WHO AM I ??</h2>
            <span className={styles.panelBadge}>INITIATING USER...</span>
          </div>

          <AsciiAvatar />

          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <td className={styles.infoLabel}>User</td>
                <td className={styles.infoValue}>: ADMIN</td>
              </tr>
              <tr>
                <td className={styles.infoLabel}>Real Name</td>
                <td className={styles.infoValue}>: {profile.name}</td>
              </tr>
              <tr>
                <td className={styles.infoLabel}>Role</td>
                <td className={styles.infoValue}>: {profile.role}</td>
              </tr>
              <tr>
                <td className={styles.infoLabel}>OS</td>
                <td className={styles.infoValue}>: Kali GNU/Linux Rolling</td>
              </tr>
              <tr>
                <td className={styles.infoLabel}>Status</td>
                <td className={styles.infoValue}>: <span style={{ color: 'var(--neon-green)' }}>ONLINE</span></td>
              </tr>
              <tr>
                <td className={styles.infoLabel}>Shell</td>
                <td className={styles.infoValue}>: /bin/zsh</td>
              </tr>
            </tbody>
          </table>

          <LiveClock />

          <div className={styles.terminalBlock}>
            <div><span className={styles.terminalPrompt}>$</span> uname -a</div>
            <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Linux kali 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1kali1 x86_64 GNU/Linux
            </div>
          </div>

          <div className={styles.bioParagraph}>
            <span className={styles.bioLabel}>// about.txt</span>
            <p>{profile.bio}</p>
          </div>

          <QuoteTerminal />

          <a href={profile.resumeLink} download="Manav_Gupta_Resume.pdf" className={styles.actionButton} target="_blank" rel="noreferrer">
            ↗ Exfiltrate Resume
          </a>
        </div>

        {/* ── Right Column ── */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>CAPABILITIES</h2>
            <span className={styles.panelBadge}>SYSTEM DIAGNOSTICS</span>
          </div>

          {/* Languages with skill bars */}
          <div className={`${styles.skillCategory} ${styles.categoryBox}`}>
            <div className={styles.skillCategoryTitle}>Programming Languages</div>
            {languages.map(skill => (
              <SkillBar key={skill.id} name={skill.name} level={skill.level} color="var(--neon-cyan)" />
            ))}
          </div>

          {/* Tools with skill bars */}
          <div className={`${styles.skillCategory} ${styles.categoryBox}`}>
            <div className={styles.skillCategoryTitle}>Developer Tools</div>
            {tools.map(skill => (
              <SkillBar key={skill.id} name={skill.name} level={skill.level} color="var(--neon-green)" />
            ))}
          </div>

          {/* Concepts — tag cloud */}
          <div className={`${styles.skillCategory} ${styles.categoryBox}`}>
            <div className={styles.skillCategoryTitle}>CS Concepts</div>
            <div className={styles.skillGrid}>
              {concepts.map(skill => (
                <motion.div
                  key={skill.id}
                  className={styles.skillTag}
                  style={{ borderColor: 'rgba(0, 240, 255, 0.4)', color: 'var(--neon-cyan)' }}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 12px rgba(0,240,255,0.5)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {skill.name}
                  <span className={styles.skillLevel}>{skill.level}%</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Domains — tag cloud */}
          <div className={`${styles.skillCategory} ${styles.categoryBox}`}>
            <div className={styles.skillCategoryTitle}>Domains</div>
            <div className={styles.skillGrid}>
              {domains.map(skill => (
                <motion.div
                  key={skill.id}
                  className={styles.skillTag}
                  style={{ borderColor: 'rgba(176, 38, 255, 0.4)', color: 'var(--neon-purple)' }}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 12px rgba(176,38,255,0.5)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {skill.name}
                  <span className={styles.skillLevel}>{skill.level}%</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Dashboard;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import styles from './Hero.module.css';

const ROLES = [
  'BACKEND_ENGINEER',
  'SEC_ANALYST',
  'SYSTEMS_THINKER',
  'CTF_PLAYER',
  'LINUX_ENJOYER',
  'BUG_HUNTER',
];

const FUN_FACTS = [
  '> Currently running Kali on bare metal. No VMs.',
  '> Favorite attack vector: SQL injection (for labs only).',
  '> Coffee consumed today: [REDACTED].',
  '> Favourite OS: Kali GNU/Linux Rolling.',
  '> Currently reading: The Web Application Hacker\'s Handbook.',
  '> git commits today: more than I\'d like to admit.',
  '> Packet captures analysed this week: several.',
  '> Last CTF score: classified.',
];

// Konami Code sequence
const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];

// Stats shown in the right panel
const STATS = [
  { label: 'projects.count()', value: '4' },
  { label: 'skills.total()', value: '21' },
  { label: 'ctf.challenges()', value: 'many' },
  { label: 'os.current()', value: 'Kali Linux' },
  { label: 'shell.preferred()', value: '/bin/zsh' },
  { label: 'coffee.level()', value: '█████░░░░░ 50%' },
  { label: 'focus.mode()', value: 'ACTIVE' },
];

// ── Konami Overlay (portal-rendered, always fixed to viewport) ──
// KEY FIX: Centering is done with a plain wrapper div using flexbox (no CSS transform).
// The motion.div only handles scale/opacity — no transform conflict.
const KonamiOverlay: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;

  return createPortal(
    // Outer: plain div, full-screen flex centering — NO Framer Motion here
    <div className={styles.konamiPortalWrapper}>
      {/* Inner: motion.div for animation — no centering transform conflict */}
      <motion.div
        className={styles.konamiCard}
        initial={{ opacity: 0, scale: 0.75, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <div className={styles.konamiTitle}>ACCESS GRANTED</div>
        <div className={styles.konamiSub}>↑↑↓↓←→←→BA</div>
        <div className={styles.konamiMsg}>nice one, hacker 👾</div>
      </motion.div>
    </div>,
    document.body
  );
};

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [konamiTriggered, setKonamiTriggered] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [3, -3]);
  const rotateY = useTransform(springX, [-400, 400], [-4, 4]);

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedRole.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
      }, 80 + Math.random() * 40);
    } else if (!isDeleting && displayedRole.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedRole.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedRole(displayedRole.slice(0, -1));
      }, 40);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex]);

  // Rotate fun facts every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax — tracked on the whole section
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Konami code — tracked globally on window
  const konamiRef = useRef<string[]>([]);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const next = [...konamiRef.current, e.key].slice(-KONAMI.length);
      konamiRef.current = next;
      if (JSON.stringify(next) === JSON.stringify(KONAMI)) {
        setKonamiTriggered(true);
        setTimeout(() => setKonamiTriggered(false), 3000);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* Portal: always fixed to viewport, never inside stacking context */}
      <KonamiOverlay visible={konamiTriggered} />

      <section
        className={`${styles.heroSection} ${konamiTriggered ? styles.konamiActive : ''}`}
        ref={heroRef}
      >
        <div className={styles.heroGrid}>

          {/* ── Left Column ── */}
          <div className={styles.heroLeft}>
            <motion.div
              className={styles.sysStatus}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-green">[ STATUS: ONLINE ]</span>
              <span className={styles.pulse}></span>
            </motion.div>

            {/* Parallax name */}
            <motion.h1
              className={`${styles.title} font-display`}
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
            >
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
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              className={styles.meta}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className={styles.roleTag}>
                <span className={styles.tagBracket}>&lt;</span>
                <span className={styles.typewriterText}>{displayedRole}</span>
                <span className={styles.typeCursor}>|</span>
                <span className={styles.tagBracket}>/&gt;</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Analyzing vulnerabilities, building robust architectures, and exploring the depths of systems programming.
            </motion.p>

            {/* Rotating fun fact */}
            <motion.div
              className={styles.funFact}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.span
                key={factIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-magenta"
              >
                {FUN_FACTS[factIndex]}
              </motion.span>
            </motion.div>

            <motion.div
              className={styles.ctaWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <a href="#projects" className={styles.cyberBtn}>ACCESS_DATA()</a>
              <a href="#dashboard" className={styles.cyberBtnSecondary}>WHO_AM_I()</a>
            </motion.div>

            <motion.p
              className={styles.konamiHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: 5 }}
            >
              // psst — try the konami code
            </motion.p>
          </div>

          {/* ── Right Column: Stats Terminal ── */}
          <motion.div
            className={styles.heroRight}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.statTerminal}>
              {/* Terminal chrome */}
              <div className={styles.terminalBar}>
                <div className={styles.terminalDots}>
                  <span className={styles.dotRed}></span>
                  <span className={styles.dotYellow}></span>
                  <span className={styles.dotGreen}></span>
                </div>
                <span className={styles.terminalTitle}>root@manav: ~/profile</span>
              </div>

              {/* Terminal body */}
              <div className={styles.terminalBody}>
                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span> cat identity.json
                </div>

                <div className={styles.jsonBlock}>
                  <span className={styles.jsonBrace}>{'{'}</span>
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className={styles.jsonLine}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.12 }}
                    >
                      <span className={styles.jsonKey}>"{stat.label}"</span>
                      <span className={styles.jsonColon}>: </span>
                      <span className={styles.jsonVal}>"{stat.value}"</span>
                      {i < STATS.length - 1 && <span className={styles.jsonComma}>,</span>}
                    </motion.div>
                  ))}
                  <span className={styles.jsonBrace}>{'}'}</span>
                </div>

                <div className={styles.terminalLine} style={{ marginTop: '1rem' }}>
                  <span className={styles.prompt}>$</span> whoami
                </div>
                <div className={styles.terminalOutput}>manav — backend dev / sec analyst</div>

                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span><span className={styles.cursorBlink}>█</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Hero;

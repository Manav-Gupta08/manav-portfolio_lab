import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, ProjectData } from '../data/data';
import styles from './ProjectList.module.css';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const TYPE_COLORS: Record<ProjectData['type'], string> = {
  Frontend:   'var(--type-frontend)',
  Backend:    'var(--type-backend)',
  Fullstack:  'var(--type-fullstack)',
  System:     'var(--type-system)',
  IoT:        'var(--type-iot)',
};

const TYPE_GLOWS: Record<ProjectData['type'], string> = {
  Frontend:   'rgba(0, 240, 255, 0.4)',
  Backend:    'rgba(176, 38, 255, 0.4)',
  Fullstack:  'rgba(245, 197, 24, 0.4)',
  System:     'rgba(0, 255, 65, 0.4)',
  IoT:        'rgba(255, 107, 53, 0.4)',
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const color = TYPE_COLORS[project.type];
  const glow = TYPE_GLOWS[project.type];

  return (
    <motion.div
      className={`glass-panel ${styles.projectCard} ${expanded ? styles.expanded : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      style={{
        '--card-color': color,
        '--card-glow': glow,
      } as React.CSSProperties}
    >
      {/* Scanline hover effect */}
      <div className={styles.scanlineEffect} />

      <div className={styles.cardInner}>
        <div className={styles.projectHeader}>
          <div className={styles.tableHeader}>
            <span>ID: {String(index + 1).padStart(3, '0')}</span>
            <div className={styles.headerRight}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.githubIconBtn}
                  title="View Source on GitHub"
                >
                  <GithubIcon size={16} />
                </a>
              )}
              <span
                className={styles.typeBadge}
                style={{ color, borderColor: color, boxShadow: `0 0 8px ${glow}` }}
              >
                {project.type.toUpperCase()}
              </span>
            </div>
          </div>

          <h3 className={styles.projectTitle}>{project.title}</h3>
          <div className={styles.divider} style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
          <p className={styles.projectDesc}>{project.shortDescription}</p>
        </div>

        {/* Expandable full description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className={styles.fullDesc}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <div className={styles.fullDescInner}>
                <span className={styles.fullDescLabel}>// full_description.txt</span>
                <p>{project.fullDescription}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className={styles.projectFooter}>
          <div className={styles.techStack}>
            {project.tech.map(t => (
              <span key={t} className={styles.techTag} style={{ color, borderColor: `${color}55` }}>
                [{t}]
              </span>
            ))}
          </div>
          <div className={styles.actions}>
            <motion.button
              className={styles.viewBtn}
              style={{ borderColor: color, color }}
              onClick={() => setExpanded(!expanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {expanded ? '> _COLLAPSE' : '> _EXPAND'}
            </motion.button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={styles.githubBtn}
              >
                [LIVE]
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectList: React.FC = () => {
  return (
    <section id="projects" className={styles.projectSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-cyan font-header" style={{ fontSize: '1.1rem', letterSpacing: '0.2em' }}>
            // SYS.PROJECTS
          </span>
          <h2 className={styles.sectionTitle}>DB_QUERY_RESULTS</h2>
          <p className={styles.sectionSubtitle}>
            Click any card to expand full project details.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {portfolioData.projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;

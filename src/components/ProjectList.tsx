import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, ProjectData } from '../data/data';
import styles from './ProjectList.module.css';

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
            <span
              className={styles.typeBadge}
              style={{ color, borderColor: color, boxShadow: `0 0 8px ${glow}` }}
            >
              {project.type.toUpperCase()}
            </span>
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
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={styles.githubBtn}
              >
                [GITHUB]
              </a>
            )}
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

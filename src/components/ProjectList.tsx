import React from 'react';
import { portfolioData } from '../data/data';
import styles from './ProjectList.module.css';

const ProjectList: React.FC = () => {
  return (
    <section id="projects" className={styles.projectSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="text-cyan font-header" style={{ fontSize: '1.2rem', letterSpacing: '0.2em' }}>
            // SYS.PROJECTS
          </span>
          <h2 className={styles.sectionTitle}>DB_QUERY_RESULTS</h2>
        </div>

        <div className={styles.grid}>
          {portfolioData.projects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`glass-panel ${styles.projectCard}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.projectHeader}>
                  <div className={styles.tableHeader}>
                    <span>ID: {String(idx + 1).padStart(3, '0')}</span>
                    <span>TYPE: {project.type.toUpperCase()}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.divider}></div>
                  <p className={styles.projectDesc}>{project.shortDescription}</p>
                </div>
                
                <div className={styles.projectFooter}>
                  <div className={styles.techStack}>
                    {project.tech.map(t => (
                      <span key={t} className={styles.techTag}>[{t}]</span>
                    ))}
                  </div>
                  <button className={styles.viewBtn}>
                    &gt; _EXECUTE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;

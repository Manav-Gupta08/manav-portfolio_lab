import React from 'react';
import { portfolioData, SkillData } from '../data/data';
import styles from './Skills.module.css';

// Group skills by category
const groupedSkills = portfolioData.skills.reduce((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = [];
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, SkillData[]>);

const Skills: React.FC = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="text-cyan font-header" style={{ fontSize: '1.2rem', letterSpacing: '0.2em' }}>
            // SYS.DIAGNOSTICS
          </span>
          <h2 className={styles.sectionTitle}>CAPABILITY_METRICS</h2>
        </div>
        
        <div className={styles.grid}>
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className={`glass-panel ${styles.skillCard}`}>
              <div className={styles.cardHeader}>
                <span 
                  className="text-green font-header pixel-glitch" 
                  style={{fontSize: '1rem', letterSpacing: '0.1em', display: 'inline-block'}}
                  data-text={`> ${category.toUpperCase()}_MODULES`}
                >
                  {'> '} {category.toUpperCase()}_MODULES
                </span>
              </div>
              <div className={styles.skillsList}>
                {skills.map(skill => (
                  <div key={skill.id} className={styles.skillRow}>
                    <div className={styles.skillLabelContainer}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevelTxt}>{skill.level}%</span>
                    </div>
                    <div className={styles.progressBarBg}>
                      <div 
                        className={styles.progressBarFill} 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

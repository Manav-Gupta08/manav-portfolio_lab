import React, { useState, useEffect } from 'react';
import styles from './TerminalWindow.module.css';

interface TerminalWindowProps {
  lines: string[];
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ lines }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];

    const typeChar = setTimeout(() => {
      setDisplayedLines(prev => {
        const newLines = [...prev];
        if (!newLines[currentLineIndex]) {
          newLines[currentLineIndex] = '';
        }
        newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
        return newLines;
      });

      if (currentCharIndex < currentLine.length - 1) {
        setCurrentCharIndex(prev => prev + 1);
      } else {
        // Line finished, move to next line after a short pause
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 500);
      }
    }, 20 + Math.random() * 30); // Randomize typing speed slightly

    return () => clearTimeout(typeChar);
  }, [currentLineIndex, currentCharIndex, lines]);

  return (
    <div className={`glass-panel ${styles.terminal}`}>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <span className={styles.btnRed}></span>
          <span className={styles.btnYellow}></span>
          <span className={styles.btnGreen}></span>
        </div>
        <div className={styles.title}>root@manav: ~/system/identity</div>
      </div>
      <div className={styles.body}>
        {displayedLines.map((line, idx) => (
          <div key={idx} className={styles.line}>
            <span className={styles.prompt}>manav@sys:~$</span> {line}
          </div>
        ))}
        {currentLineIndex < lines.length && (
          <div className={styles.cursorBlock}></div>
        )}
        {currentLineIndex >= lines.length && (
          <div className={styles.line}>
            <span className={styles.prompt}>manav@sys:~$</span> <span className={styles.cursorBlockBlink}></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalWindow;

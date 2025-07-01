import { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';

export default function ProgressBar({inputNumber, circleRadius}) {
  const [progress, setProgress] = useState(0);

  // Simulate progress increase (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < inputNumber ? prev + 1 : inputNumber));
    }, 100);
    return () => clearInterval(interval);
  }, [inputNumber]);

  // Circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container}>
      <svg className={styles.progressRing} width='120' height='120'>
        <circle
          className={styles.progressRingBackground}
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
        />
        <circle
          className={styles.progressRingFill}
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className={styles.progressText}>{progress}%</div>
    </div>
  );
}
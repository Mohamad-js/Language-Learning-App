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
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container}>
      <div className={styles.momCircle}>
         <svg className={styles.progressRing} width='200' height='200'>
            <circle
               className={styles.progressRingBackground}
               cx="100"
               cy="100"
               r={radius}
            />
            <circle
               className={styles.progressRingFill}
               cx="100"
               cy="100"
               r={radius}
               strokeDasharray={circumference}
               strokeDashoffset={strokeDashoffset}
            />
         </svg>
         <div className={styles.sonCircle}></div>
      </div>
      <div className={styles.progressText}>{progress}%</div>
    </div>
  );
}
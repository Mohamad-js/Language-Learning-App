import { useState, useEffect } from 'react';
import styles from './ProgressBar.module.sass';

export default function ProgressBar({inputNumber, title, percent, endNumber}) {
  const [progress, setProgress] = useState(0);

  // Simulate progress increase (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < inputNumber ? prev + 1 : inputNumber));
    }, 20);
    return () => clearInterval(interval);
  }, [inputNumber]);

  // Circle properties
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / endNumber) * circumference;

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
      <div className={styles.progressInfo}>
         <div className={styles.top}>
            <div className={styles.progress}>{progress}</div>
            {
               percent ? <div className={styles.percent}>%</div> : null
            }
         </div>
         <div className={styles.progressText}>{title}</div>
      </div>

   </div>
  );
}
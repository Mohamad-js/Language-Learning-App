import { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';

export default function ProgressBar({
   inputNumber, title, percent, endNumber, circleWidth, lineWidth,
   lineStroke, numberSize, titleSize, recWidth, recHeight, strokeColor,
   textColor, percentSize
   }) {
  const [progress, setProgress] = useState(0);

  // Simulate progress increase (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < inputNumber ? prev + 1 : inputNumber));
    }, 20);
    return () => clearInterval(interval);
  }, [inputNumber]);

  // Circle properties
  const radius = lineWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / endNumber) * circumference;
  const ribbonWidth = circleWidth / 2

  return (
   <div className={styles.container}>
      <div className={styles.momCircle} style={{ width: recWidth, height: recHeight}}>
         <svg className={styles.progressRing} width= {circleWidth} height={circleWidth}>
            <circle
               className={styles.progressRingBackground}
               cx = {ribbonWidth}
               cy = {ribbonWidth}
               r={radius}
            />
            <circle
               className={styles.progressRingFill}
               style={{strokeWidth: lineStroke, stroke: strokeColor}}
               cx = {ribbonWidth}
               cy = {ribbonWidth}
               r={radius}
               strokeDasharray={circumference}
               strokeDashoffset={strokeDashoffset}
            />
         </svg>

         <div className={styles.progressInfo}>
            <div className={styles.top}>
               <div className={styles.progress}
                  style={{ fontSize: numberSize, color: textColor }}
               >{progress}</div>
               {
                  percent ? <div className={styles.percent}
                     style={{ fontSize: percentSize, color: textColor }}
                  >%</div> : null
               }
            </div>
            <div className={styles.progressText}
               style={{ fontSize: titleSize}}
            >{title}</div>
         </div>
      </div>

   </div>
  );
}
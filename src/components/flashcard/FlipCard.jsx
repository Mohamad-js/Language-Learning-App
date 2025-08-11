// components/FlipCard.jsx
import { useState } from 'react';
import styles from './FlipCard.module.css';

export default function FlipCard({ 
   word, role, british, american, definition, examples, lesson, level
}) {
   const [isFlipped, setIsFlipped] = useState(false);

   const handleClick = () => {
      setIsFlipped(!isFlipped);
   };

  return (
      <div className={styles.container} onClick={handleClick}>
         <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
            <div className={styles.front}>
               <div className={styles.infoHolder}>
                  <div className={styles.info}>{level}</div>
                  <div className={styles.info}>{lesson}</div>
               </div>

               <div className={styles.word}>{word}</div>
               <div className={styles.role}>{role}</div>

               <div className={styles.phoneticsHolder}>
                  <div className={styles.phonetics}>{british}</div>
                  <div className={styles.phonetics}>{american}</div>
               </div>
            </div>
            <div className={styles.back}>
               <div className={styles.infoHolder}>
                  <div className={styles.info}>{level}</div>
                  <div className={styles.info}>{lesson}</div>
               </div>
               
               <div className={styles.definition}>{definition}</div>
               <div className={styles.examples}>{
                  examples.map((item, index) => (
                     <div key={index} className={styles.exmaple}>{item}</div>
                  ))
               }</div>
            </div>
         </div>
      </div>
  );
}
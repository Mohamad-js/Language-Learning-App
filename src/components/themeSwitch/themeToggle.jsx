import styles from './themeToggle.module.css';
import { useEffect, useState } from 'react';
import { useTheme } from "../context/ThemeContext";




function ThemeToggle() {
  const { lightTheme, toggleTheme } = useTheme();

   return (
      <div className={styles.container}>
         <label className={styles.switch} onClick={toggleTheme}>
            <input
               type="checkbox"
               id="toggle"
               checked={lightTheme}
               onChange={() => {}} // Prevent default input behavior
               onClick={(e) => e.stopPropagation()} // Prevent label click from triggering input's native behavior
            />
            <span className={styles.slider}>
               <div className={styles.moonsHole}>
                  <div className={styles.moonHole}></div>
                  <div className={styles.moonHole}></div>
                  <div className={styles.moonHole}></div>
               </div>
               <div className={styles.blackClouds}>
                  <div className={styles.blackCloud}></div>
                  <div className={styles.blackCloud}></div>
                  <div className={styles.blackCloud}></div>
               </div>
               <div className={styles.clouds}>
                  <div className={styles.cloud}></div>
                  <div className={styles.cloud}></div>
                  <div className={styles.cloud}></div>
                  <div className={styles.cloud}></div>
                  <div className={styles.cloud}></div>
                  <div className={styles.cloud}></div>
                  <div className={styles.cloud}></div>
               </div>
               <div className={styles.stars}>
                  <svg className={styles.star} viewBox="0 0 20 20">
                     <path
                        d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                     ></path>
                  </svg>
                  <svg className={styles.star} viewBox="0 0 20 20">
                     <path
                        d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                     ></path>
                  </svg>
                  <svg className={styles.star} viewBox="0 0 20 20">
                     <path
                        d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                     ></path>
                  </svg>
                  <svg className={styles.star} viewBox="0 0 20 20">
                     <path
                        d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                     ></path>
                  </svg>
                  <svg className={styles.star} viewBox="0 0 20 20">
                     <path
                        d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                     ></path>
                  </svg>
               </div>
            </span>
         </label>
      </div>
   );
}

export default ThemeToggle;
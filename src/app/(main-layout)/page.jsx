"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loading/loading";
import styles from './page.module.css'
import Iridescence from "@/components/Iridescence/iridescence";
import { IoCloseOutline } from "react-icons/io5";
import { idioms } from "@/data/idioms";




const Home = () => {
   const [showIdiom, setShowIdiom] = useState(false)
   const [dailyIdiom, setDailyIdiom] = useState(null);
   const timeoutRef = useRef(null);

   const updateIdiom = () => {
      const now = new Date();
      const utcNow = new Date(now.toUTCString());

      // Define a fixed start date (e.g., January 1, 2024). Adjust this to your desired starting point.
      const startDate = new Date('2025-08-25T00:00:00Z');
      const daysSinceStart = Math.floor(
         (utcNow.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Compute the index using modulo to cycle through the 360 messages
      const index = Math.abs(daysSinceStart) % 360; // Use abs to handle dates before start

      setDailyIdiom(idioms[index]);
   };

   const getTimeToNextMidnightIRST = () => {
      const now = new Date();
      // Calculate next midnight in IRST (UTC+3:30)
      const nextMidnight = new Date(now);
      nextMidnight.setUTCDate(nextMidnight.getUTCDate() + 1);
      nextMidnight.setUTCHours(20, 30, 0, 0); // 20:30 UTC = 00:00 IRST
      let timeToNext = nextMidnight.getTime() - now.getTime();

      // If the time has already passed today, schedule for the next day
      if (timeToNext <= 0) {
         nextMidnight.setUTCDate(nextMidnight.getUTCDate() + 1);
         timeToNext = nextMidnight.getTime() - now.getTime();
      }

      return timeToNext;
   };

   const toggleIdiomCard = () => {
      setShowIdiom(!showIdiom)
   }

   useEffect(() => {
      updateIdiom(); // Initial update

      const setupNextUpdate = () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
         const timeToNext = getTimeToNextMidnightIRST();
         timeoutRef.current = setTimeout(() => {
            updateIdiom();
            setupNextUpdate(); // Chain the next update for 24 hours later
         }, timeToNext);

         console.log('time to next update (ms):', timeToNext);
      };

      setupNextUpdate();

      return () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
      };
   }, []);

   // while (!dailyIdiom) {
   //    setIsLoading(true)
   // }


   return (
      <div className={styles.bigMom}>
         <Iridescence
            color={[1, 1, 1]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
         />

         <div className={styles.pageHolder}>
            <div className={styles.pageTitle}>Home Page</div>

            <div className={styles.topSection} onClick={toggleIdiomCard}>
               <div className={styles.motivTitle}>Today&apos;s Expression</div>
               <div className={styles.motivText}>
                  {dailyIdiom?.example}
               </div>
            </div>

            {
               showIdiom && 
               <div className={styles.idiomInfoHolder}>
                  <div className={styles.idiomCard}>
                     <div className={styles.closeIconHolder} onClick={toggleIdiomCard}>
                        <IoCloseOutline className={styles.close} />
                     </div>
                     <div className={styles.idiom}>{dailyIdiom?.idiom}</div>
                     <div className={styles.meaning}>{dailyIdiom?.meaning}</div>
                  </div>
               </div>
            }

            <div className={styles.activityHolder}>
               <div className={styles.activityTitle}>Lessons to Learn</div>
               <div className={styles.lessonsHolder}>
                  <div className={styles.activity}>
                     <Link href='/words'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn}>Vocabulary</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>6 CEFR Levels</div>
                              <div className={styles.infoText}>5000 Words</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={styles.activity}>
                     <Link href='/grammar'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn}>Grammar</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>38 Topics</div>
                              <div className={styles.infoText}>164 Lessons</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={styles.activity}>
                     <Link href='/expressions'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn}>Expressions</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>Under Dev</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={styles.activity}>
                     <Link href='/collocations'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn}>Collocations</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>Under Dev</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={styles.activity}>
                     <Link href='/synonyms'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn}>Synonyms</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>Under Dev</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={styles.activity}>
                     <Link href='/family'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn}>Word Family</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>Under Dev</div>
                           </div>
                        </div>
                     </Link>
                  </div>
               </div>
            </div>
         </div>

         {/* {isLoading && (
            <div className={styles.bottomLayer}>
               <Loader />
            </div>
         )} */}
      </div>
   );
};

export default Home;
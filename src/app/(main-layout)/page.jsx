"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loading/loading";
import styles from './page.module.css'
import Iridescence from "@/components/Iridescence/iridescence";
import { IoCloseOutline } from "react-icons/io5";
import { idioms } from "@/data/idioms";
import { useUpdateDialog } from "@/components/hooks/useUpdateDialogue";
import UpdateMsg from "@/components/updateMsg/updateMsg";




const Home = () => {
   const [showIdiom, setShowIdiom] = useState(false);
   const [dailyIdiom, setDailyIdiom] = useState(null);
   const timeoutRef = useRef(null);
   const { showDialog, version, updates, titles, closeDialog } = useUpdateDialog();




   const updateIdiom = () => {
      const now = new Date();
      // Convert current time to IRST (UTC+3:30)
      const offsetIRST = 3.5 * 60 * 60 * 1000; // 3 hours 30 minutes in milliseconds
      const nowIRST = new Date(now.getTime() + offsetIRST);

      // Define a fixed start date (e.g., January 1, 2024, 00:00 IRST)
      const startDate = new Date('2025-08-25T00:00:00+03:30');
      const daysSinceStart = Math.floor(
         (nowIRST.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Compute the index using modulo to cycle through the 360 idioms
      const index = Math.abs(daysSinceStart) % 360;
      setDailyIdiom(idioms[index]);
      console.log('Idiom updated at:', nowIRST.toISOString(), 'Idiom:', idioms[index]);
   };

   const getTimeToNextMidnightIRST = () => {
      const now = new Date();
      const offsetIRST = 3.5 * 60 * 60 * 1000; // 3 hours 30 minutes in milliseconds
      const nowIRST = new Date(now.getTime() + offsetIRST);

      // Set next midnight IRST (00:00 IRST = 20:30 UTC previous day)
      const nextMidnightIRST = new Date(nowIRST);
      nextMidnightIRST.setHours(0, 0, 0, 0); // Set to 00:00:00.000 IRST
      if (nowIRST.getHours() >= 0) {
         // If it's after midnight IRST, schedule for next day
         nextMidnightIRST.setDate(nextMidnightIRST.getDate() + 1);
      }

      // Convert next midnight IRST back to UTC for timeout
      const nextMidnightUTC = new Date(nextMidnightIRST.getTime() - offsetIRST);
      const timeToNext = nextMidnightUTC.getTime() - now.getTime();

      return timeToNext;
   };

   const toggleIdiomCard = () => {
      setShowIdiom(!showIdiom);
   };

   useEffect(() => {
      updateIdiom(); // Initial update

      const setupNextUpdate = () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
         const timeToNext = getTimeToNextMidnightIRST();
         console.log('Time to next update (ms):', timeToNext, 'Scheduled for:', new Date(Date.now() + timeToNext).toISOString());
         timeoutRef.current = setTimeout(() => {
            updateIdiom();
            setupNextUpdate(); // Schedule the next update
         }, timeToNext);
      };

      setupNextUpdate();

      return () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
      };
   }, []);


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

         {
            showDialog &&
            <UpdateMsg
               updates = {updates}
               onClose = {closeDialog}
               titles = {titles}
               version = {version}
            />
         }


      </div>
   );
};

export default Home;
"use client";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import Loader from "@/components/loading/loading";
import styles from './page.module.css'
import Iridescence from "@/components/Iridescence/iridescence";
import { IoCloseOutline } from "react-icons/io5";
import { idioms } from "@/data/idioms";
import { useUpdateDialog } from "@/components/hooks/useUpdateDialogue";
import UpdateMsg from "@/components/updateMsg/updateMsg";
import { useTheme } from "@/components/context/ThemeContext";
import Aurora from "@/components/aurora/aurora";
import Tour from "@/components/tour/tour";


function urlBase64ToUint8Array(base64String) {
   const padding = '='.repeat((4 - base64String.length % 4) % 4);
   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
   const rawData = atob(base64);
   return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}


const Home = () => {
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;

   const [showIdiom, setShowIdiom] = useState(false);
   const [dailyIdiom, setDailyIdiom] = useState(null);
   const timeoutRef = useRef(null);
   const { showDialog, version, updates, titles, closeDialog } = useUpdateDialog();

   const [tourOpen, setTourOpen] = useState(false);
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
      const hasSeenTour = localStorage.getItem('joyride-tour-completed');
      if (!hasSeenTour) {
         setTourOpen(true);
      }
   }, []);

   const steps = [
      {
         target: '#tour_start',
         title: 'Welcome :)',
         content: 'This is the Home page. Your language learning journey starts from here :)',
         disableBeacon: true,
      },
      {
         target: '#tour_idiom',
         title: 'Daily Idiom',
         content: 'This card shows an idiom every day in an example. You can click on it to check the idiom and its definition.',
      },
      {
         target: '#tour_words',
         title: 'Vocabulary Section',
         content: 'This section teaches you 6330 most common vocabularies in English based on their CEFR level through examples and images.',
      },
      {
         target: '#tour_grammar',
         title: 'Grammar Section',
         content: 'You can learn 164 most important English grammar rules through easy explanations and many examples.',
      },
      {
         target: '#tour_prep',
         title: 'Prepositions Section',
         content: 'For each word you learn in Vocabularies section, you will learn its important prepositions here.',
      },
      {
         target: '#tour_colloc',
         title: 'Collocations Section',
         content: 'For each word you learn in Vocabularies section, you will find its useful collocations here.',
      },
      {
         target: '#tour_syn',
         title: 'Synonyms Section',
         content: 'For each word you learn in Vocabularies section, you can learn its synonyms and the difference between them.',
      },
      {
         target: '#tour_family',
         title: 'Word Family Section',
         content: 'For each word you learn in Vocabularies section, you can learn its word families in this section.',
      },
   ];

   const handleTourComplete = () => {
      setTourOpen(false);
      localStorage.setItem('joyride-tour-completed', 'true');
   };

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

   const darkColor = darkMode ? { color: 'white' } : {};


   return (
      <div className={styles.bigMom}>
         {
         lightTheme ? 
            <Iridescence
               color={[1, 1, 1]}
               mouseReact={false}
               amplitude={0.1}
               speed={1.0}
            />
         :
            <div className={styles.ether}>  
               <Aurora
                  colorStops={["#5d00ff", "#aa00ff", "#ff00e6"]}
                  blend={10}
                  amplitude={1}
                  speed={1}
               />

            </div>
         }


         <div className={styles.pageHolder}>
            <div className={styles.pageTitle} style={darkColor} id="tour_start">Home Page</div>

            <div className={`${styles.topSection} ${darkMode ? styles.darkTop : ''}`}
               onClick={toggleIdiomCard}
               id="tour_idiom"
            >
               <div className={styles.motivTitle}>Today&apos;s Idiom</div>
               <div className={styles.motivText}>
                  {dailyIdiom?.example}
               </div>
            </div>

            {
               showIdiom && 
               <div className={styles.idiomInfoHolder}>
                  <div className={`${styles.idiomCard} ${darkMode ? styles.darkIdiom : ''}`}>
                     <div className={styles.closeIconHolder} onClick={toggleIdiomCard}>
                        <IoCloseOutline className={styles.close} style={darkColor}/>
                     </div>
                     <div className={styles.idiom} style={darkColor}>{dailyIdiom?.idiom}</div>
                     <div className={styles.meaning}>{dailyIdiom?.meaning}</div>
                  </div>
               </div>
            }

            <div className={styles.activityHolder}>
               <div className={styles.activityTitle} style={darkColor}>Lessons to Learn</div>

               <div className={styles.lessonsHolder}>
                  <div className={`${styles.activity} ${darkMode ? styles.darkTab : ''}`} id='tour_words'>
                     <Link href='/words'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn} style={darkColor}>Vocabulary</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>6 CEFR Levels</div>
                              <div className={styles.infoText}>6330 Words</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={`${styles.activity} ${darkMode ? styles.darkTab : ''}`} id='tour_grammar'>
                     <Link href='/grammar'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn} style={darkColor}>Grammar</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>38 Topics</div>
                              <div className={styles.infoText}>164 Lessons</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={`${styles.activity} ${darkMode ? styles.darkTab : ''}`} id='tour_prep'>
                     <Link href='/expressions'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn} style={darkColor}>Prepositions</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>Soon</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={`${styles.activity} ${darkMode ? styles.darkTab : ''}`} id='tour_colloc'>
                     <Link href='/collocations'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn} style={darkColor}>Collocations</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>Soon</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={`${styles.activity} ${darkMode ? styles.darkTab : ''}`} id='tour_syn'>
                     <Link href='/synonyms'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn} style={darkColor}>Synonyms</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>Soon</div>
                           </div>
                        </div>
                     </Link>
                  </div>

                  <div className={`${styles.activity} ${darkMode ? styles.darkTab : ''}`} id='tour_family'>
                     <Link href='/family'>
                        <div className={styles.infoHolder}>
                           <div className={styles.actBtn} style={darkColor}>Word Family</div>
                           <div className={styles.info}>
                              <div className={styles.infoText}>Soon</div>
                           </div>
                        </div>
                     </Link>
                  </div>
               </div>
            </div>

            
         </div>

         {/* {
            showDialog &&
            <UpdateMsg
               updates = {updates}
               onClose = {closeDialog}
               titles = {titles}
               version = {version}
            />
         } */}

         {isClient && tourOpen && (
            <Tour
               steps={steps}
               run={tourOpen}
               onTourComplete={handleTourComplete}
            />
         )}
         
      </div>
   );
};

export default Home;
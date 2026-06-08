"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import Loader from "@/components/loading/loading";
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
      <div className='relative w-full min-h-dvh p-5 flex flex-col gap-3'>

         {
         lightTheme ? 
            <Iridescence
               color={[1, 1, 1]}
               mouseReact={false}
               amplitude={0.1}
               speed={1.0}
            />
         :
            <div className='absolute min-h-dvh w-full left-0 top-0 bg-black'>  
               <Aurora
                  colorStops={["#5d00ff", "#aa00ff", "#ff00e6"]}
                  blend={10}
                  amplitude={1}
                  speed={1}
               />

            </div>
         }


            <div className='' id="tour_start">Home Page</div>

            <div className='p-5 bg-white/40 backdrop-blur-sm rounded-2xl'
               onClick={toggleIdiomCard}
               id="tour_idiom"
            >
               <div className='text-sm'>Today&apos;s Idiom</div>
               <div>
                  {dailyIdiom?.example}
               </div>
            </div>

            {
               showIdiom && 
               <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-1 flex justify-center items-center p-5'
                  onClick={toggleIdiomCard}
               >
                  <div className='relative w-full p-5 pr-3 bg-white rounded-2xl flex flex-col gap-3'
                     onClick={(e) => e.stopPropagation()}
                  >
                     <div className='w-full flex justify-between'>
                        <div className="text-sm">Meaning</div>
                        <IoCloseOutline size={30} className='' onClick={toggleIdiomCard} />
                     </div>

                     <div className='text-2xl'>{dailyIdiom?.idiom}</div>
                     <div className='text-lg'>{dailyIdiom?.meaning}</div>
                  </div>
               </div>
            }

            <div className='w-full flex flex-col gap-3 bg-white/40 backdrop-blur-sm p-5 rounded-2xl'>
               <div className='text-lg text-center'>Start From Here</div>

               <div className='flex justify-between flex-wrap gap-y-2'>
                  <div className='border border-white active:bg-white w-40 h-23 rounded-2xl p-3' id='tour_words'>
                     <Link href='/words'>
                        <div className='flex flex-col h-full justify-between'>
                           <div className='text-xl font-bold text-black/70'>Vocabulary</div>
                           <div className=''>6330 Words</div>
                        </div>
                     </Link>
                  </div>

                  <div className='border border-white active:bg-white w-40 h-23 rounded-2xl p-3' id='tour_grammar'>
                     <Link href='/grammar'>
                        <div className='flex flex-col h-full justify-between'>
                           <div className='text-xl font-bold text-black/70'>Grammar</div>
                           <div className='text-black/70'>164 Lessons</div>
                        </div>
                     </Link>
                  </div>

                  <div className='border border-white active:bg-white w-40 h-23 rounded-2xl p-3' id='tour_prep'>
                     <Link href='/expressions'>
                        <div className='flex flex-col h-full justify-between'>
                           <div className='text-xl font-bold text-black/70'>Prepositions</div>
                           <div className='text-black/70'>Coming Soon</div>
                        </div>
                     </Link>
                  </div>

                  <div className='border border-white active:bg-white w-40 h-23 rounded-2xl p-3' id='tour_colloc'>
                     <Link href='/collocations'>
                        <div className='flex flex-col h-full justify-between'>
                           <div className='text-xl font-bold text-black/70'>Collocations</div>
                           <div className='text-black/70'>Coming Soon</div>
                        </div>
                     </Link>
                  </div>

                  <div className='border border-white active:bg-white w-40 h-23 rounded-2xl p-3' id='tour_syn'>
                     <Link href='/synonyms'>
                        <div className='flex flex-col h-full justify-between'>
                           <div className='text-xl font-bold text-black/70'>Synonyms</div>
                           <div className='text-black/70'>Coming Soon</div>
                        </div>
                     </Link>
                  </div>

                  <div className='border border-white active:bg-white w-40 h-23 rounded-2xl p-3' id='tour_family'>
                     <Link href='/family'>
                        <div className='flex flex-col h-full justify-between'>
                           <div className='text-xl font-bold text-black/70'>Word Family</div>
                           <div className='text-black/70'>Coming Soon</div>
                        </div>
                     </Link>
                  </div>
               </div>

               <div className="relative w-full h-50">
                  <Image
                     src='/images/illustrations/studying.png'
                     alt='Studying Illustration'
                     fill
                  />
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

         {/* {isClient && tourOpen && (
            <Tour
               steps={steps}
               run={tourOpen}
               onTourComplete={handleTourComplete}
            />
         )} */}
         
      </div>
   );
};

export default Home;
"use client";
import { VscWholeWord } from "react-icons/vsc";
import { MdOutlineSpellcheck } from "react-icons/md";
import { PiTreeStructureLight } from "react-icons/pi";
import { VscDebugDisconnect } from "react-icons/vsc";import { GiGearStickPattern } from "react-icons/gi";
import { LuGroup } from "react-icons/lu";
import { GoArrowRight } from "react-icons/go";
import { idioms } from "@/data/idioms";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useUpdateDialog } from "@/components/hooks/useUpdateDialogue";
import UpdateMsg from "@/components/updateMsg/updateMsg";
import Tour from "@/components/tour/tour";
import rawA1Vocabs from "../../../database/rawA1.json"
import VocabularyManager from "@/components/VocabularyManager";
import { useLoading } from "@/components/LoadingProvider";
import { motion } from "framer-motion";
import { slideUp, fadeIn, fadeRight, expandParent, expandChild } from "@/lib/animations/entrance";
import { toast } from "sonner";
import NotificationButton from "@/components/NotifBtn/NotificationButton";




const Home = () => {
   
   const [showIdiom, setShowIdiom] = useState(false);
   const [dailyIdiom, setDailyIdiom] = useState(null);
   const [isCompact, setIsCompact] = useState(false);

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

   useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 399px) and (max-height: 829px)");
      
      setIsCompact(mediaQuery.matches);

      const handler = (event) => setIsCompact(event.matches);
      mediaQuery.addEventListener("change", handler);
      
      return () => mediaQuery.removeEventListener("change", handler);
   }, []);

   const underDev = (page) => {
      toast.warning(`The ${page} section is under development.`)
   }


   return (
      <div className='fixed w-full h-screen flex flex-col gap-3'>


         <VocabularyManager initialData={rawA1Vocabs} />

         <div className="absolute top-0 w-full h-65 bg-linear-to-r from-violet-200 to-pink-200 p-7 dark:bg-linear-to-r dark:from-violet-900 dark:to-rose-800">
            <motion.div {...fadeRight} 
               className='h-full flex flex-col justify-center gap-2'
               onClick={toggleIdiomCard}
               id="tour_idiom"
            >  
               <div className="flex items-center gap-3">
                  <div className='text-sm font-semibold'>Today&apos;s Idiom</div>
                  <GoArrowRight />
               </div>
               
               <div className="text-2xl font-comfortaa font-light">
                  {dailyIdiom?.idiom}
               </div>
            </motion.div>
         </div>
            


         {
            showIdiom && 
            <motion.div
               {...fadeIn}
               className='fixed top-0 left-0 w-full h-full bg-foreground/10 backdrop-blur-sm z-2 flex justify-center items-center p-10'
               onClick={toggleIdiomCard}
            >
               <motion.div
                  {...slideUp}
                  className='relative w-full bg-background rounded-2xl flex flex-col gap-3 drop-shadow-xl p-7'
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className='w-full flex justify-between'>
                     <div className="text-sm">Meaning</div>
                     <IoCloseOutline size={30} className='' onClick={toggleIdiomCard} />
                  </div>

                  <div className='text-2xl'>{dailyIdiom?.idiom}</div>
                  <div className='text-lg mb-7'>{dailyIdiom?.meaning}</div>
                  <div className='text-md'>{dailyIdiom?.example}</div>
               </motion.div>
            </motion.div>
         }

         <div
            className='relative bg-gray-100 dark:bg-background w-full top-50 flex flex-col justify-between flex-1 gap-3 rounded-[50px] p-7'
         >
            <motion.div 
               variants={expandParent}
               initial='hidden'
               animate='visible'

               className="flex flex-col gap-2"
            >
               {
                  !isCompact &&
                     <div className='p-2 text-sm text-center z-1'>Start Your Language Journey</div>
               }

               <div className='flex justify-between flex-wrap gap-2'>

                  <motion.div variants={expandChild}
                     className='min-w-30 min-h-30 flex flex-col justify-center items-center bg-white dark:bg-foreground/3 border border-foreground/0 active:border-foreground/50 rounded-4xl overflow-hidden drop-shadow-lg flex-1' id='tour_words'
                  >
                     <Link href='/words'>
                        <div className='flex flex-col justify-center items-center gap-3' >
                           <VscWholeWord size={40} className="text-foreground/40" />
                           <div className="">Vocabulary</div>
                        </div>
                     </Link>
                  </motion.div>

                  <motion.div variants={expandChild}
                     className='min-w-30 min-h-30 flex flex-col justify-center items-center bg-white dark:bg-foreground/3 border border-foreground/0 active:border-foreground/50 rounded-4xl overflow-hidden drop-shadow-lg flex-1' id='tour_words'
                  >
                     <div onClick={()=> underDev('Grammar')}>
                        <div className='flex flex-col justify-center items-center gap-3' >
                           <MdOutlineSpellcheck size={40} className="text-foreground/40" />
                           <div className="">Grammar</div>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div variants={expandChild}
                     className='min-w-30 min-h-30 flex flex-col justify-center items-center bg-white dark:bg-foreground/3 border border-foreground/0 active:border-foreground/50 rounded-4xl overflow-hidden drop-shadow-lg flex-1' id='tour_words'
                  >
                     <div onClick={()=> underDev('Stems')}>
                        <div className='flex flex-col justify-center items-center gap-3' >
                           <PiTreeStructureLight size={40} className="text-foreground/40" />
                           <div className="">Stems</div>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div variants={expandChild}
                     className='min-w-30 min-h-30 flex flex-col justify-center items-center bg-white dark:bg-foreground/3 border border-foreground/0 active:border-foreground/50 rounded-4xl overflow-hidden drop-shadow-lg flex-1' id='tour_words'
                  >
                     <div onClick={()=> underDev('Patterns')}>
                        <div className='flex flex-col justify-center items-center gap-3' >
                           <GiGearStickPattern size={40} className="text-foreground/40" />
                           <div className="">Patterns</div>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div variants={expandChild}
                     className='min-w-30 min-h-30 flex flex-col justify-center items-center bg-white dark:bg-foreground/3 border border-foreground/0 active:border-foreground/50 rounded-4xl overflow-hidden drop-shadow-lg flex-1' id='tour_words'
                  >
                     <div onClick={()=> underDev('Synonyms')}>
                        <div className='flex flex-col justify-center items-center gap-3' >
                           <LuGroup size={40} className="text-foreground/40" />
                           <div className="">Synonyms</div>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div variants={expandChild}
                     className='min-w-30 min-h-30 flex flex-col justify-center items-center bg-white dark:bg-foreground/3 border border-foreground/0 active:border-foreground/50 rounded-4xl overflow-hidden drop-shadow-lg flex-1' id='tour_words'
                  >
                     <div onClick={()=> underDev('Phrasals')}>
                        <div className='flex flex-col justify-center items-center gap-3' >
                           <VscDebugDisconnect size={40} className="text-foreground/40" />
                           <div className="">Phrasals</div>
                        </div>
                     </div>
                  </motion.div>

               </div>
               <NotificationButton />
            </motion.div>


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
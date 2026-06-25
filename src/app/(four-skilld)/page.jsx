"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";import { idioms } from "@/data/idioms";
import { useUpdateDialog } from "@/components/hooks/useUpdateDialogue";
import UpdateMsg from "@/components/updateMsg/updateMsg";
import Tour from "@/components/tour/tour";
import rawA1Vocabs from "../../../database/rawA1.json"
import VocabularyManager from "@/components/VocabularyManager";
import { useLoading } from "@/components/LoadingProvider";
import { motion } from "framer-motion";
import { fadeRight, expandParent, expandChild } from "@/lib/animations/entrance";
import MotionBackground from "@/components/MotionBackground";
import { toast } from "sonner";



const Home = () => {
   const { stopLoading, startLoading } = useLoading();
   const [isReady, setIsReady] = useState(false)
   
   const [showIdiom, setShowIdiom] = useState(false);
   const [dailyIdiom, setDailyIdiom] = useState(null);
   const [isCompact, setIsCompact] = useState(false);

   const timeoutRef = useRef(null);
   const { showDialog, version, updates, titles, closeDialog } = useUpdateDialog();

   const [tourOpen, setTourOpen] = useState(false);
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      startLoading()
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

   const handleIllustrationLoad = () => {
      stopLoading()
      setIsReady(true)
   }

   const underDev = (page) => {
      toast.warning(`The ${page} section is under development.`)
   }


   return (
      <div className='fixed w-full h-screen p-5 pb-30 flex flex-col gap-3'>

         <MotionBackground />

         <VocabularyManager initialData={rawA1Vocabs} />


         <div id="tour_start"
            className='bg-background/50 w-fit rounded-xl drop-shadow-xl text-sm p-2 z-1'
         >
            Home Page
         </div>

            
         <motion.div {...fadeRight} 
            className='p-5 bg-background drop-shadow-xl rounded-2xl mb-5'
            onClick={toggleIdiomCard}
            id="tour_idiom"
         >
            <div className='text-xs text-foreground/50 mb-1'>Today&apos;s Idiom</div>
            <div className="super-compact:text-sm">
               {dailyIdiom?.example}
            </div>
         </motion.div>
            


         {
            showIdiom && 
            <div className='fixed top-0 left-0 w-full h-full bg-background/50 backdrop-blur-sm z-2 flex justify-center items-center p-5'
               onClick={toggleIdiomCard}
            >
               <div className='relative w-full p-5 pr-3 bg-background rounded-2xl flex flex-col gap-3'
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

         <div
            className='w-full flex flex-col justify-between flex-1 gap-3'
         >
            <motion.div 
               variants={expandParent}
               initial='hidden'
               animate='visible'

               className="flex flex-col gap-2"
            >
               {
                  !isCompact &&
                     <div className='p-2 bg-background/50 text-sm text-center z-1 rounded-xl drop-shadow-xl'>Start Your Language Journey</div>
               }

               <div className='flex justify-between flex-wrap gap-2'>

                  <motion.div variants={expandChild}
                     className='min-w-[32vw] flex flex-col justify-between flex-1 border border-background rounded-2xl overflow-hidden drop-shadow-lg' id='tour_words'
                  >
                     <Link href='/words'>
                        <div className="relative w-full h-28">
                           <Image
                              className='object-cover object-bottom'
                              src='/images/illustrations/Vocabs.jpg'
                              alt='Studying Illustration'
                              fill
                              onLoad={handleIllustrationLoad}
                           />
                        </div>

                        <div className='flex flex-1 flex-col justify-between bg-background p-3' >
                           <div className='text-xl font-bold'>Vocabulary</div>
                           
                           <div className="text-sm">6330 Key Words by the CEFR Levels</div>

                           <div className='w-full flex justify-end'>
                              <FaArrowRight className='text-foreground/40' size={20} />
                           </div>
                        </div>
                     </Link>
                  </motion.div>

                  <motion.div variants={expandChild} 
                     className='min-w-[32vw] flex flex-col justify-between flex-1 border border-background rounded-2xl overflow-hidden drop-shadow-lg' id='tour_grammar'
                  >
                     <div onClick={() => underDev('Grammar')}>
                        <div className="relative w-full h-28">
                           <Image
                              className='object-cover object-bottom'
                              src='/images/illustrations/Grammar.jpg'
                              alt='Studying Illustration'
                              fill
                              onLoad={handleIllustrationLoad}
                           />
                        </div>
                     </div>

                     <div className='flex flex-1 flex-col justify-between bg-background p-3'>
                        <div className='text-xl font-bold'>Grammar</div>
                           <div className="text-sm">164 Most Common English Grammar</div>

                           <div className='w-full flex justify-end'>
                              <FaArrowRight className='text-foreground/40' size={20} />
                           </div>
                     </div>
                  </motion.div>

                  <motion.div variants={expandChild}
                     className='min-w-[32vw] flex flex-col justify-between flex-1 border border-background rounded-2xl overflow-hidden drop-shadow-lg' id='tour_prep'
                  >
                     <div onClick={() => underDev('Patterns')}>
                        <div className="relative w-full h-28">
                           <Image
                              className='object-cover object-bottom'
                              src='/images/illustrations/Pattern.jpg'
                              alt='Studying Illustration'
                              fill
                              onLoad={handleIllustrationLoad}
                           />
                        </div>

                        <div className='flex flex-1 flex-col justify-between bg-background p-3'>
                           <div className='text-xl font-bold'>Patterns</div>
                           <div className="text-sm">Coming soon</div>

                           <div className='w-full flex justify-end'>
                              <FaArrowRight className='text-foreground/40' size={20} />
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div variants={expandChild}
                     className='min-w-[32vw] flex flex-col justify-between flex-1 border border-background rounded-2xl overflow-hidden drop-shadow-lg' id='tour_family'
                  >
                     <div onClick={() => underDev('Word Family')}>
                        <div className="relative w-full h-28">
                           <Image
                              className='object-cover object-bottom'
                              src='/images/illustrations/Word_Families.jpg'
                              alt='Studying Illustration'
                              fill
                              onLoad={handleIllustrationLoad}
                           />
                        </div>

                        <div className='flex flex-1 flex-col justify-between bg-background p-3'>
                           <div className='text-xl font-bold'>Word Family</div>
                           <div className="text-sm">Coming soon</div>

                           <div className='w-full flex justify-end'>
                              <FaArrowRight className='text-foreground/40' size={20} />
                           </div>
                        </div>
                     </div>
                  </motion.div>

               </div>
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
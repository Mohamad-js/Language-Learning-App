'use client';
import { HiViewfinderCircle } from "react-icons/hi2";
import { BsArrowRepeat } from "react-icons/bs";
import { useNavigation } from '@/app/context/NavigationProvider';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/components/backButton/back';
import { getLessonsByLevel } from '@/lib/db';
import { motion } from 'framer-motion';
import { fadeUpChild, fadeUpParent, fadeRight } from '@/lib/animations/entrance';
import Navigation from '@/components/Navigation/navigation';
import Image from 'next/image';

function Words() {
   const { active, practiceOnly, setPracticeOnly, setNextIsReview } = useNavigation();
   const [vocabs, setVocabs] = useState([]);
   const [currentLevel, setCurrentLevel] = useState('A1');
   const router = useRouter();
   const scrollRef = useRef(null);

   

   useEffect(() => {
      const handleDefaultBack = (event) => {
         event.preventDefault();
         router.push('/');
      };

      window.addEventListener('popstate', handleDefaultBack);
      
      return () => {
         window.removeEventListener('popstate', handleDefaultBack);
      };
   }, [router]);

   useEffect(() => {
      const loadAllTheWords = async () => {
         try {
            const uniqueList = await getLessonsByLevel(currentLevel);
            setVocabs(uniqueList);

         } catch (error) {
            console.error("Failed to load vocabs:", error);
         }
      };

      loadAllTheWords();
   }, [currentLevel]);


   useEffect(() => {
      active === 0 && setCurrentLevel('A1');
      active === 1 && setCurrentLevel('A2');
      active === 2 && setCurrentLevel('B1');
      active === 3 && setCurrentLevel('B2');
      active === 4 && setCurrentLevel('C1');
      active === 5 && setCurrentLevel('C2');
   }, [active]);

   // Lock Algorithm: Compute the display status sequentially
   const processedVocabs = vocabs.map((item, index, array) => {
      // Normalize DB status to lowercase just in case ("Waiting" -> "waiting")
      const dbStatus = item.status?.toLowerCase() || 'waiting';
      let displayStatus = 'waiting';

      if (dbStatus === 'done') {
         displayStatus = 'done';
      } else if (index === 0) {
         // The very first item is always unlocked if it's not done yet
         displayStatus = 'ready';
      } else {
         // Unlock this item ONLY if the previous item in the array is 'done'
         const prevStatus = array[index - 1].status?.toLowerCase() || 'waiting';
         if (prevStatus === 'done') {
            displayStatus = 'ready';
         }
      }

      return { ...item, displayStatus };
   });

   const readyIndex = processedVocabs.findIndex(
      item => item.displayStatus === "ready"
   );

   const handleAnimationComplete = () => {
      if (!scrollRef.current || readyIndex === -1) return;

      const card = scrollRef.current.children[readyIndex];

      card?.scrollIntoView({
         behavior: "smooth",
         inline: "center",
         block: "nearest",
      });
   };

   const prepare = (lessonNumber) => {
      practiceOnly && setPracticeOnly(false)

      if(lessonNumber % 5 === 0){

      }
   }

   return (
      <div className={`fixed top-0 overflow-hidden w-full min-h-dvh flex flex-col justify-center items-center bg-gray-100 dark:bg-background`}>

         <Back to='/' />

         <motion.div
            ref={scrollRef}
            key={vocabs.length}
            variants={fadeUpParent}
            initial='hidden'
            animate='visible'
            onAnimationComplete={handleAnimationComplete}
            className='w-full h-[80vh] flex flex-nowrap justify-start gap-3 overflow-auto snap-x snap-mandatory scrollbar-none p-3 z-1'>
         {
            processedVocabs.map((item, index) => (

               <motion.div 
                  variants={fadeUpChild}              
                  key={index} 
                  className={`w-[90vw] shrink-0 snap-always snap-center h-full flex flex-col justify-center items-center gap-2 rounded-[100px] [corner-shape:superellipse(2)] overflow-hidden drop-shadow-lg`}
               >
                  <div className="w-full h-full flex gap-1">
                     {/* Conditionally render based on whether it's a lesson or a review */}
                     {item.type === 'review' ? (
                        <>
                           <div className="font-bold text-gray-400">Review {item.review}:</div>
                           <div className="text-lg text-black">Lessons {item.lessons}</div>
                        </>
                     ) : (
                        <div className='relative w-full h-full'>
                           <div className="relative w-full h-full">
                              <Image
                                 className='object-cover'
                                 src={`/images/${item.category}.jpg`}
                                 alt='lesson image'
                                 fill
                              />
                           </div>

                           <div className='absolute left-0 bottom-0 w-full h-100 bg-linear-to-t from-background to-transparent'></div>

                           <div className="absolute w-full bottom-0 left-0 flex flex-col justify-center items-start p-7 gap-5">
                              <div className="w-full">
                                 <div className="w-full flex justify-between gap-3 items-center">
                                    <div className="text-4xl font-yanone">{item.category}</div>
                                    
                                    {
                                       item.displayStatus === 'ready' ?
                                          <div className="w-15 h-15 bg-foreground/10 rounded-full flex justify-center items-center border border-foreground/20 active:border-foreground">
                                             <HiViewfinderCircle size={30} />
                                          </div>
                                       :
                                       item.displayStatus === 'done' ?
                                          <Link href={`/words/${item.lesson}`}>
                                             <div
                                                onClick={() => prepare(item.lesson)}
                                                className="w-15 h-15 bg-foreground/10 rounded-full flex justify-center items-center border border-foreground/20 active:border-foreground">
                                                <BsArrowRepeat size={30} />
                                             </div>
                                          </Link>
                                       : null
                                    }

                                 </div>

                                 <div className="w-full flex gap-2">
                                    <div className="">{item.words.length}</div>
                                    words
                                 </div>

                              </div>


                              {
                                 item.displayStatus === 'ready' ? (
                                    <Link 
                                       href={item.type === 'review' ? `/review/${item.review}` : `/words/${item.lesson}`} 
                                       onClick={() => prepare(item.lesson)} 
                                       className='h-full w-full'
                                    >
                                       <button className='w-full h-15 bg-foreground text-background font-bold rounded-[50px] active:scale-95'>
                                          START
                                       </button>
                                    </Link>
                                 ) :
                                 
                                 item.displayStatus === 'done' ? (
                                    <Link 
                                       href={item.type === 'review' ? `/review/${item.review}` : `/words/${item.lesson}`} 
                                       className='h-full w-full'
                                    >
                                       <button
                                          onClick={() => setPracticeOnly(true)}
                                          className='w-full h-15 border border-foreground font-bold rounded-[50px] active:bg-foreground active:text-background'>
                                          PRACTICE
                                       </button>
                                    </Link>
                                 ) : (
                                    <div className="text-red-500 p-5">LOCKED</div>
                                 )
                              }
                           </div>

                        </div>
                     )}
                  </div>
                  
               </motion.div>
               
            ))
         }
         </motion.div>

         <Navigation />

      </div>
   );
}

export default Words;
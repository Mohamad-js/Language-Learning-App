'use client';
import { useNavigation } from '@/app/context/NavigationProvider';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/components/backButton/back';
import { getLessonsByLevel } from '@/lib/db';
import { useLoading } from '@/components/LoadingProvider';
import { motion } from 'framer-motion';
import { fadeUpChild, fadeUpParent, fadeRight } from '@/lib/animations/entrance';
import Navigation from '@/components/Navigation/navigation';

function Words() {
   const { active } = useNavigation();
   const { startLoading } = useLoading();
   const [vocabs, setVocabs] = useState([]);
   const [currentLevel, setCurrentLevel] = useState('A1');
   const router = useRouter();

   

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

   return (
      <div className={`fixed top-0 w-full min-h-dvh flex flex-col pt-20 p-5 gap-5 ${active === 0 ? 'bg-linear-to-tr from-[#5d50c6] via-[#f85e9f] to-[#f18fac]' : active === 1 ? 'bg-linear-to-r from-[#fef08a] via-[#84cc16] to-[#16a34a]' : active === 2 ? 'bg-linear-to-r from-[#db2777] via-[#ef4444] to-[#f97316]' : active === 3 ? 'bg-linear-to-tl from-[#831843] via-[#a21caf] to-[#e879f9]' : active === 4 ? 'bg-linear-to-r from-[#4ade80] via-[#14b8a6] to-[#0891b2]' : active === 5 ? 'bg-linear-to-tl from-[#4b4c7a] via-[#eb92fb] to-[#c855bc]' : 'bg-white'}`}>

         <Back to='/' />

         <motion.div
            {...fadeRight}
            className='flex flex-col gap-1 z-1'
         >
            <div className='text-3xl text-foreground'>{currentLevel} Vocabulary</div>
            <div className='text-md text-foreground'>Read and Practice the Words</div>
         </motion.div>

         <motion.div
            key={vocabs.length}
            variants={fadeUpParent}
            initial='hidden'
            animate='visible'
            className='w-full h-[85vh] overflow-y-auto scrollbar-none flex flex-col gap-3 bg-white/30 rounded-2xl p-3 pb-100 z-1'>
         {
            processedVocabs.map((item, index) => (

               <motion.div 
                  variants={fadeUpChild}              
                  key={index} 
                  className={`w-full flex justify-between items-center gap-2 rounded-2xl ${item.displayStatus === 'done' ? 'bg-green-100' : item.displayStatus === 'ready' ? 'bg-white' : 'bg-red-200'}`}
               >
                  <div className="flex flex-col gap-1 p-4">
                     {/* Conditionally render based on whether it's a lesson or a review */}
                     {item.type === 'review' ? (
                        <>
                           <div className="font-bold text-gray-400">Review {item.review}:</div>
                           <div className="text-lg text-black">Lessons {item.lessons}</div>
                        </>
                     ) : (
                        <>
                           <div className="font-bold text-gray-400">Lesson {item.lesson}:</div>
                           <div className="text-lg text-black">{item.category}</div>
                        </>
                     )}
                  </div>
                  
                  {
                     item.displayStatus === 'ready' ? (
                        <Link 
                           href={item.type === 'review' ? `/review/${item.review}` : `/words/${item.lesson}`} 
                           onClick={() => startLoading()} 
                           className='h-full'
                        >
                           <button className='w-30 h-full bg-black/5 rounded-2xl text-black active:bg-black active:text-white'>
                              START
                           </button>
                        </Link>
                     ) :
                     
                     item.displayStatus === 'done' ? (
                        <Link 
                           href={item.type === 'review' ? `/review/${item.review}` : `/words/${item.lesson}`} 
                           className='h-full'
                        >
                           <button className='w-30 h-full bg-black/5 rounded-2xl text-black active:bg-black active:text-white'>
                              REVIEW
                           </button>
                        </Link>
                     ) : (
                        <div className="text-red-500 p-5">LOCKED</div>
                     )
                  }
               </motion.div>
               
            ))
         }
         </motion.div>

         <Navigation />

      </div>
   );
}

export default Words;
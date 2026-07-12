'use client';
import { HiViewfinderCircle } from "react-icons/hi2";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { CiUnlock } from "react-icons/ci";
import { GoArrowRight } from "react-icons/go";
import { BsArrowRepeat } from "react-icons/bs";
import { useNavigation } from '@/app/context/NavigationProvider';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/components/backButton/back';
import { getLessonsByLevel, updateInteractionStatus } from '@/lib/db';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { fadeUpChild, fadeUpParent } from '@/lib/animations/entrance';
import Navigation from '@/components/Navigation/navigation';
import Image from 'next/image';





function Words() {
   const { active, practiceOnly, setPracticeOnly, setNextIsReview } = useNavigation();
   const [vocabs, setVocabs] = useState([]);
   const [currentLevel, setCurrentLevel] = useState('A1');
   const [preview, setPreview] = useState(false);
   const [loadAgain, setLoadAgain] = useState(false);
   const [previewContent, setPreviewContent] = useState([]);
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
   }, [currentLevel, loadAgain]);


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

   useEffect(() => {
      if (!scrollRef.current || readyIndex === -1) return;

      const timer = setTimeout(() => {
         const holder = scrollRef.current;
         const card = holder?.children[readyIndex];

         if (!holder || !card) return;

         holder.scrollTo({
            left: card.offsetLeft - ((holder.clientWidth - card.clientWidth) / 2),
            behavior: "smooth",
         });
      }, 800);

      return () => clearTimeout(timer);
   }, [readyIndex, processedVocabs.length]);

   const prepare = () => {
      practiceOnly && setPracticeOnly(false)
   }

   const showPreview = (item) => {
      setPreview(true)
      setPreviewContent(item)
   }

   const skipLesson = async (previewContent) => {

      const changeToKnown = previewContent.words.map((item) => ({
         ...item,
         status: 'known'
      }))

      await updateInteractionStatus({
         level: currentLevel,
         lesson: previewContent.lesson,
         words: changeToKnown
      })

      setLoadAgain(!loadAgain)
      setPreview(false)
      toast.info(`You skipped the lesson ${previewContent.lesson}`)
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
            className='w-full h-[80vh] flex flex-nowrap justify-start gap-3 overflow-auto snap-x snap-mandatory scrollbar-none p-3 z-1'>
         {
            processedVocabs.map((item, index) => (

               <motion.div 
                  variants={fadeUpChild}              
                  key={index} 
                  className={`w-[90vw] shrink-0 snap-always snap-center h-full flex flex-col justify-center items-center gap-2 rounded-[100px] [corner-shape:superellipse(2)] overflow-hidden drop-shadow-lg`}
               >
                  <div className="w-full h-full flex gap-1">
                     {
                     item.type === 'review' ? (
                        <div className="w-full">
                           <div className="relative w-full h-full">

                              <Image
                                 className='object-cover dark:hidden'
                                 src={`/images/a1/Covers/Review/reviewWhite.jpg`}
                                 alt='review image'
                                 fill
                              />
                              <Image
                                 className='object-cover hidden dark:block'
                                 src={`/images/a1/Covers/Review/reviewBlack.jpg`}
                                 alt='review image'
                                 fill
                              />
                           </div>

                           {
                              item.displayStatus === 'waiting' &&
                                 <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-5xl bg-background/20 flex-col gap-3 backdrop-blur-sm text-foreground z-1">
                                    <div className='flex justify-center'>
                                       <IoLockClosedOutline size={40} className="text-red-500" />
                                    </div>
                                    {item.type} {item.review}
                                 </div>
                                 
                           }

                           <div className='absolute left-0 bottom-0 w-full h-40 bg-linear-to-t from-background to-transparent'></div>
                           
                           <Link href={`/review/${item.review}`}>
                              <div
                                 // onClick={}
                                 className="absolute w-full p-5 bottom-0 left-0 flex justify-end items-center gap-3"
                              >
                                 <div className='px-4 py-2 flex gap-2 rounded-xl items-center active:bg-foreground/10'>
                                    Review lessons {item.lessons}
                                    <GoArrowRight size={25} />
                                 </div>
                              </div>
                           </Link>
                        </div>
                     ) :
                     
                     item.type === 'chest' ? (
                        <div className="w-full">
                           <div className="relative w-full h-full">
                              <Image
                                 className='object-cover'
                                 src={`/images/a1/Covers/Chests/${item.image}.jpg`}
                                 alt='review image'
                                 fill
                              />
                           </div>

                           {
                              item.displayStatus === 'waiting' ? 
                                 <div className="absolute w-full h-full p-5 top-0 left-0 flex justify-center items-center flex-col gap-5 bg-background/70">
                                    <div className="text-5xl">{item.content.title}</div>
                                    <button className='px-4 py-2 bg-foreground text-background rounded-lg drop-shadow-lg active:scale-95'>{item.content.msg}</button>
                                 </div>
                              :
                              item.displayStatus === 'done' ?
                                 <div className="absolute w-full h-full p-5 top-0 left-0 flex justify-center items-center flex-col gap-5 bg-background/0">
                                    <button className="px-5 py-3 bg-foreground text-background text-2xl rounded-2xl flex gap-1 items-start">
                                       <CiUnlock size={30} />
                                       OPEN
                                    </button>
                                 </div>
                              
                                 : 'ERROR IN STEPPING'
                           }
                        </div>
                     ) : (
                        <div className='relative w-full h-full'>
                           <div className="relative w-full h-full">
                              <Image
                                 className='object-cover'
                                 src={`/images/a1/Covers/Lessons/${item.category}.jpg`}
                                 alt='lesson image'
                                 fill
                              />
                           </div>
                           
                           {
                              item.displayStatus === 'waiting' &&
                                 <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-3xl scale-900 bg-background/20 backdrop-blur-sm text-foreground">
                                    {item.lesson}
                                 </div>
                           }

                           <div className='absolute left-0 bottom-0 w-full h-70 bg-linear-to-t from-background to-transparent'></div>
                           <div className='absolute left-0 bottom-0 w-full h-60 bg-linear-to-t from-background to-transparent'></div>
                           <div className='absolute left-0 bottom-0 w-full h-50 bg-linear-to-t from-background to-transparent'></div>
                           <div className='absolute left-0 bottom-0 w-full h-40 bg-linear-to-t from-background to-transparent'></div>
                           <div className='absolute left-0 bottom-0 w-full h-30 bg-linear-to-t from-background to-transparent'></div>

                           <div className="absolute w-full bottom-0 left-0 flex flex-col justify-center items-start p-5 gap-6">
                              <div className="w-full flex flex-col">
                                 <div className="w-full flex justify-between items-center">
                                    <div className="flex flex-col">
                                       <div className="text-4xl font-yanone">{item.category}</div>

                                       <div className="w-full flex gap-2">
                                          <div className="">{item.words.length}</div>
                                          words
                                       </div>
                                    </div>
                                    
                                    {
                                       item.displayStatus === 'ready' ?
                                          <div
                                             onClick={() => showPreview(item)}
                                             className="w-15 h-15 bg-foreground/10 rounded-full flex justify-center items-center border border-foreground/20 active:border-foreground"
                                          >
                                             <HiViewfinderCircle size={30}/>
                                          </div>

                                       :

                                       item.displayStatus === 'done' ?
                                          <Link href={`/words/${item.lesson}`}>
                                             <div
                                                onClick={() => prepare(item.lesson)}
                                                className="w-15 h-15 bg-foreground/10 rounded-full flex justify-center items-center border border-foreground/20 active:border-foreground"
                                             >
                                                <BsArrowRepeat size={30} />
                                             </div>
                                          </Link>
                                       : null
                                    }

                                 </div>


                              </div>


                              {
                                 item.displayStatus === 'ready' ? (
                                    <Link 
                                       href={item.type === 'review' ? `/review/${item.review}` : `/words/${item.lesson}`} 
                                       onClick={() => prepare(item.lesson)} 
                                       className='h-full w-full'
                                    >
                                       <button className='w-full h-15 bg-foreground text-background font-bold rounded-[50px] active:scale-95'
                                       >
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
                                             className='w-full h-15 border border-foreground font-bold rounded-[50px] active:bg-foreground active:text-background'
                                          >
                                          PRACTICE
                                       </button>
                                    </Link>
                                 ) :
                                 
                                 item.displayStatus === 'waiting' ? (
                                    <div className='w-full flex justify-center'>
                                       <IoLockClosedOutline size={40} className="text-red-500" />
                                    </div>
                                 )

                                 : 'ERROR IN displayStatus'
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

         {
            preview &&
               <div
                  onClick={() => setPreview(false)} 
                  className="absolute top-0 left-0 w-foreground/20 w-full h-dvh flex justify-center items-center backdrop-blur-sm z-1"
               >
                  <div
                     onClick={(e) => e.stopPropagation()}
                     className="w-[80vw] bg-background p-7 rounded-3xl flex flex-col justify-between gap-5"
                  >
                     <div className="w-full flex items-center justify-between">
                        <div className="text-md">Words in This Lesson</div>

                        <IoCloseOutline
                           size={30}
                           onClick={() => setPreview(false)}
                        />
                     </div>

                     <div className="w-full flex flex-wrap justify-evenly gap-2 border border-foreground/20 p-5 rounded-2xl">
                        {
                           previewContent?.words?.map((item, index) => (
                              <div
                                 key={index}
                                 className="text-foreground py-2 min-w-20 flex-1 flex justify-center items-center rounded-2xl"
                              >
                                 {item.word}
                              </div>
                           ))
                        }
                     </div>

                     <div className="w-full flex gap-3">                        

                        <button
                           onClick={() => skipLesson(previewContent)}
                           className="bg-foreground/10 rounded-2xl w-full py-3"
                        >
                           SKIP
                        </button>
                        
                        
                        <Link
                           className='w-full'
                           href={`/words/${previewContent.lesson}`}>
                           <button
                              onClick={() => prepare(previewContent.lesson)}
                              className="w-full bg-foreground text-background rounded-2xl py-3"
                           >
                              START
                           </button>
                        </Link>
                     </div>

                  </div>
               </div>
         }

      </div>
   );
}

export default Words;

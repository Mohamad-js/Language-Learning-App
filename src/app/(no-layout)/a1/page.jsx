'use client';
import styles from './a1.module.css';
import { TiTick } from "react-icons/ti";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Back from '@/components/backButton/back';
import { useTheme } from '@/components/context/ThemeContext';
import { toast, Slide } from 'react-toastify';
import { getAllWords } from '@/lib/db';
import { useLoading, startLoading } from '@/components/LoadingProvider';



function A1() {
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;
   const { stopLoading } = useLoading();
   const { startLoading } = useLoading();

   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;
   const [vocabs, setVocabs] = useState([])



   const router = useRouter()

   useEffect(() => {
      const handleDefaultBack = (event) => {
         event.preventDefault()
         router.push('/words')
      }

      window.addEventListener('popstate', handleDefaultBack)
      
      return () => {
         window.removeEventListener('popstate', handleDefaultBack)
      }
   }, [router])

   const handleImageLoad = () => {
      setLoadedImages((prev) => prev + 1);
   };

   useEffect(() => {
      if (loadedImages >= totalImages) {
         setIsLoading(false);
         stopLoading();
      }
   }, [loadedImages, totalImages, stopLoading]);

   useEffect(() => {
      const loadAllTheWords = async () => {
         try {
            const uniqueList = await getAllWords();
            setVocabs(uniqueList)            

         } catch (error) {
            console.error("Failed to load vocabs:", error);
         }
      };

      loadAllTheWords();

   }, []);

   

   return (
      <div className='absolute top-0 w-full min-h-dvh flex flex-col pt-20 p-5 gap-5'>
         {
            darkMode ?
            <Image
               className='object-cover -z-1'
               src="/images/back/A1Dark.jpg"
               alt=""
               fill
               onLoad={handleImageLoad}
            />
            :
            <Image
               className='object-cover -z-1'
               src="/images/back/A1Back.jpg"
               alt=""
               fill
               onLoad={handleImageLoad}
            />
         }

         <Back />

         <div className='flex flex-col gap-1'>
            <div className='text-3xl'>A1 Vocabulary</div>
            <div className='text-md'>Read and Practice the Words</div>
         </div>

         <div className='w-full h-[85vh] overflow-y-auto scrollbar-none flex flex-col gap-3 bg-white/30 rounded-2xl p-3 pb-100'>
         {
            vocabs.map((lesson, index) => {


               return (
                  <div key={index} className={`w-full flex justify-between items-center gap-2 rounded-2xl ${lesson.status === 'done' ? 'bg-green-100' : lesson.status === 'ready' ? 'bg-white' : lesson.status === 'waiting' ? 'bg-red-200' : ''}`}>
                     <div className="flex flex-col gap-1 p-4">
                        <div className="font-bold text-gray-400">Lesson {lesson.lesson}:</div>
                        <div className="text-lg">{lesson.category}</div>
                     </div>
                     {
                        lesson.status === 'ready' ?
                           <Link href={`/a1/${lesson.lesson}`} onClick={() => startLoading()} className='h-full'>
                              <button className='w-30 h-full bg-black/5 rounded-2xl text-black active:bg-black active:text-white'>
                                 START
                              </button>
                           </Link>
                        :

                        lesson.status === 'done' ?
                           <Link href={'/review'} className='h-full'>
                              <button className='w-30 h-full bg-black/5 rounded-2xl text-black active:bg-black active:text-white'>
                                 REVIEW
                              </button>
                           </Link>
                        :

                        lesson.status === 'waiting' ?
                           <div className="text-red-500 p-5">LOCKED</div>

                        : 
                        null
                     }
                  </div>
               )
            })
         }
         </div>

            {/* {
               nextLesson !== 1 &&
               <div className={styles.progressInfoHolder}
                  style={darkMode ? {backgroundColor: '#00000068'} : {}}
               >
                  <div className={styles.number}
                     style={darkMode ? {color: 'white'} : {}}
                  >{progress}% done</div>
                  <div className={styles.counter}
                     style={{width: progress + '%'}}
                  ></div>

                  <button className={styles.continue}>
                     <Link href={`/a1/${nextLesson}`}>Start New Lesson: {nextLesson}</Link>
                  </button>

                  <div className={`${styles.completed} ${completed && styles.show}`}>
                     COMPLETED :)
                  </div>
                  
               </div>
            } */}
         

      </div>
   );
}

export default A1;

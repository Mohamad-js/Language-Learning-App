'use client';
import styles from './b2.module.css';
import { TiTick } from "react-icons/ti";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/loading/loading';
import Back from '@/components/backButton/back';




function B2() {
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;
   const [switches, setSwitches] = useState(Array(80).fill(false));
   const [allowStart, setAllowStart] = useState(false)
   const [nextLesson, setNextLesson] = useState(0)
   const [progress, setProgress] = useState(0)
   const [completed, setCompleted] = useState(false)
   

   useEffect(() => {
      const current = JSON.parse(localStorage.getItem(`currentLesson-B2`)) || 0;
      current < 80 ? setNextLesson(Number(current) + 1) : null

      if(!isLoading) {
         const currentProgress = (Number(current) * 100) / 80
   
         progress == 100 && setTimeout(() => {
            setCompleted(true)
         }, 2000)
   
         setTimeout(() => {
            setProgress(Number(currentProgress.toFixed(1)))
         }, 1000)
      }
      

      const newSwitches = Array(80).fill(false);
      for (let i = 1; i <= 80; i++) {
         const knowns = JSON.parse(localStorage.getItem(`knownWords-${i}-B2`)) || [];
         const unknowns = JSON.parse(localStorage.getItem(`unknownWords-${i}-B2`)) || [];
         
         // const wordsB1Count = JSON.parse(localStorage.getItem('wordsCount-B1') || false);
         // setAllowStart(wordsB1Count)

         if (knowns.length > 0 || unknowns.length > 0) {
            newSwitches[i - 1] = true;
         }
      }
      setSwitches(newSwitches);
   }, [progress, isLoading]);


   const router = useRouter()
   useEffect(() => {
      const handleDefaultBack = (event) => {
         event.preventDefault()
         router.push('/words')
      }

      window.addEventListener('popstate', handleDefaultBack)
      
      return () => {
         window.addEventListener('popstate', handleDefaultBack)
      }
   }, [router])

   const handleImageLoad = () => {
      setLoadedImages((prev) => {
         const newCount = prev + 1;
         if (newCount >= totalImages) {
            setIsLoading(false);
         }
         return newCount;
      });
   };

   // Find the index of the first non-done lesson to mark it as "new"
   const firstNonDoneIndex = switches.findIndex((switchState) => !switchState);
   const newLessonIndex = firstNonDoneIndex === -1 ? null : firstNonDoneIndex;

   const switchPreview = () => {
      localStorage.setItem(`preview`, JSON.stringify(true));
   }

   const goReview = (lessonRequested) => {
      localStorage.setItem(`lessonRequested`, JSON.stringify(lessonRequested));
      localStorage.setItem(`levelRequested`, JSON.stringify('B2'));
      router.push('/review/words')
   }


   return (
      <div className={styles.container}>
         <Image
            className={styles.background}
            src="/images/back/B2Back.jpg"
            alt=""
            fill
            onLoad={handleImageLoad}
         />

         <Back />

         <div className={styles.top}>
            <div className={styles.mainTitle}>B2 Vocabulary</div>
            <div className={styles.subtitle}>Read and Practice the Words</div>
         </div>

         <div className={styles.bottom}>
            <div className={styles.lessonsTitle}>Lessons:</div>

            <div className={styles.learningHolder}>
            {switches.map((switchState, index) => {
               const lessonNumber = index + 1;
               const isDone = switchState;
               const isNew = index === newLessonIndex;
               const isSelectable = (index === 0 && !isDone) || (index > 0 && switches[index - 1] && !isDone);

               return isSelectable ? (
                  <div
                     className={styles.lessonsHolder}
                     key={lessonNumber}
                  >
                     <div className={styles.dataHolder}>
                        <div className={styles.lesson}>Lesson {lessonNumber}</div>
                        {isNew ? (
                           <div className={styles.newLesson}>New Lesson</div>
                        ) : (
                           <div className={styles.lessonWaiting}>Locked</div>
                        )}
                     </div>
                     <div className={styles.btns}>
                        
                        <button className={styles.lessonBtn}>
                           <Link href={`/b2/${lessonNumber}`} onClick={switchPreview}> PREVIEW </Link>
                        </button>

                        <button className={styles.lessonBtn}>
                           <Link href={`/b2/${lessonNumber}`}>START</Link>
                        </button>
                     </div>

                  </div>
               ) : (
                  <div className={`${styles.lessonsHolder} ${styles.disabled}`} key={lessonNumber}>
                  <div className={styles.lesson}>Lesson {lessonNumber}</div>
                  {isDone ? (
                     <div className={styles.lessonDone}>
                        <button className={styles.lessonBtn}>
                           <div onClick={() => goReview(lessonNumber)}>Review</div>
                        </button>
                        <TiTick className={styles.tick}/>
                     </div>
                  ) : isNew ? (
                     <div className={styles.newLesson}>New Lesson</div>
                  ) : (
                     <div className={styles.lessonWaiting}>Locked</div>
                  )}
                  </div>
               );
            })}
            </div>

            {
               nextLesson !== 1 &&
               <div className={styles.progressInfoHolder}>
                  <div className={styles.number}>{progress}% done</div>
                  <div className={styles.counter}
                     style={{width: progress + '%'}}
                  ></div>

                  <button className={styles.continue}>
                     <Link href={`/b2/${nextLesson}`}>Start New Lesson: {nextLesson}</Link>
                  </button>

                  <div className={`${styles.completed} ${completed && styles.show}`}>
                     COMPLETED :)
                  </div>
                  
               </div>
            }
         </div>

         {isLoading && (
            <Loader />
         )}

         {/* {
            allowStart < 1240 && 
            <WarningMessage
               message='Complete B1 vocabulary lessons to unlock this level.'
            />
         } */}
      </div>
   
   );
}

export default B2;


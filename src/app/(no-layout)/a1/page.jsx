'use client';
import styles from './a1.module.css';
import { TiTick } from "react-icons/ti";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/loading/loading';
import Back from '@/components/backButton/back';



function A1() {
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;
   const [switches, setSwitches] = useState(Array(117).fill(false));
   const [nextLesson, setNextLesson] = useState(0) // NEW
   const [progress, setProgress] = useState(0) // NEW
   const [completed, setCompleted] = useState(false) // NEW


   useEffect(() => {
      const current = JSON.parse(localStorage.getItem(`currentLesson-A1`)) || 0; // NEW
      current < 117 ? setNextLesson(Number(current) + 1) : null // NEW
      
      if(!isLoading) {
         const currentProgress = (Number(current) * 100) / 117 // NEW
         
         progress == 100 && setTimeout(() => { // NEW
            setCompleted(true)
         }, 2000)
   
         setTimeout(() => { // NEW
            setProgress(Number(currentProgress.toFixed(1)))
         }, 1000)
      }


      const newSwitches = Array(117).fill(false);
      for (let i = 1; i <= 117; i++) {
         const knowns = JSON.parse(localStorage.getItem(`knownWords-${i}-A1`)) || [];
         const unknowns = JSON.parse(localStorage.getItem(`unknownWords-${i}-A1`)) || [];

         if (knowns.length > 0 || unknowns.length > 0) {
            newSwitches[i - 1] = true;
         }
      }
      setSwitches(newSwitches);
   }, [progress, isLoading]); // NEW

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
      localStorage.setItem(`levelRequested`, JSON.stringify('A1'));
      router.push('/review/words')
   }

   return (
      <div className={styles.container}>
         <Image
            className={styles.background}
            src="/images/back/A1Back.jpg"
            alt=""
            fill
            onLoad={handleImageLoad}
         />

         <Back />

         <div className={styles.top}>
            <div className={styles.mainTitle}>A1 Vocabulary</div>
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
                           <Link href={`/a1/${lessonNumber}`} onClick={switchPreview}> PREVIEW </Link>
                        </button>

                        <button className={styles.lessonBtn}>
                           <Link href={`/a1/${lessonNumber}`}>START</Link>
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

            { // NEW
               nextLesson !== 1 && // NEW
               <div className={styles.progressInfoHolder}>
                  <div className={styles.number}>{progress}% done</div>
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
            }

         </div>
         
         { isLoading && <Loader /> }

      </div>
   );
}

export default A1;

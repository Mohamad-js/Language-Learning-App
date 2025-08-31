'use client';
import styles from './c1.module.css';
import { TiTick } from "react-icons/ti";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/loading/loading';
import Back from '@/components/backButton/back';




function C1() {
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;
   const [switches, setSwitches] = useState(Array(131).fill(false));
   

   useEffect(() => {
      const newSwitches = Array(131).fill(false);
      for (let i = 1; i <= 131; i++) {
         const knowns = JSON.parse(localStorage.getItem(`knownWords-${i}-C1`)) || [];
         const unknowns = JSON.parse(localStorage.getItem(`unknownWords-${i}-C1`)) || [];

         if (knowns.length > 0 || unknowns.length > 0) {
            newSwitches[i - 1] = true;
         }
      }
      setSwitches(newSwitches);
   }, []);


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

   const switchPreview = () => { // NEW
      localStorage.setItem(`preview`, JSON.stringify(true));
   }

   const goReview = (lessonRequested) => {
      localStorage.setItem(`lessonRequested`, JSON.stringify(lessonRequested));
      localStorage.setItem(`levelRequested`, JSON.stringify('C1'));
      router.push('/review/words')
   }


   return (
      <div className={styles.container}>
         <Image
            className={styles.background}
            src="/images/back/C1Back.jpg"
            alt=""
            fill
            onLoad={handleImageLoad}
         />

         <Back />

         <div className={styles.top}>
            <div className={styles.mainTitle}>C1 Vocabulary</div>
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
                           <Link href={`/c1/${lessonNumber}`} onClick={switchPreview}> PREVIEW </Link>
                        </button>

                        <button className={styles.lessonBtn}>
                           <Link href={`/c1/${lessonNumber}`}>START</Link>
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
         </div>

         {isLoading && (
            <div className={styles.bottomLayer}>
            <Loader />
            </div>
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

export default C1;


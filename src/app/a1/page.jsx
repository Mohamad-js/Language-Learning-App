'use client'
import styles from './a1.module.css'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from '@/components/loading/loading';


function A1(){
    const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;

   const handleImageLoad = () => {
      setLoadedImages((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
         setIsLoading(false);
      }
      return newCount;
      });
   };

   useEffect(() => {
      if (loadedImages >= totalImages) {
         setIsLoading(false);
      }
   }, [loadedImages]);


   return(
      <>
         <div className={styles.container}>
            <Image className={styles.background}
               src='../images/illustrations/act1.jpg'
               alt=''
               fill
               onLoad={handleImageLoad}
            />

            <Link href='/words' className={styles.backHolder}>
               <IoIosArrowBack className={styles.backSign}/>
               <div className={styles.backText}>Back</div>
            </Link>

            <div className={styles.top}>
               <div className={styles.mainTitle}>A1 Vocabulary</div>
               <div className={styles.subtitle}>Read and Practice the Words</div>
            </div>

            <div className={styles.bottom}>
               <div className={styles.lessonsTitle}>Lessons:</div>

               <div className={styles.learningHolder}>
                  <Link href='/a1/1' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 1: Sizes</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/2' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 2: Colors</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/3' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 3: Quality</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/4' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 4: Feelings</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/5' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 5: Appereance</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/6' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 6: Time</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/7' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 7: Difficulty</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/8' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 8: Weather</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/9' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 9: Tastes</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/10' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 10: Quantity</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

               </div>
            </div>

            {
               isLoading ?
               <div className={styles.bottomLayer}>
                  <Loader /> 
               </div>
               : ''
            }

         </div>
      </>
   )
}

export default A1;
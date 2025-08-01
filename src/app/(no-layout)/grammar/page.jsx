'use client'
import styles from './grammar.module.css'
import { IoIosArrowBack } from 'react-icons/io';
import { TiTick } from "react-icons/ti";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/loading/loading';



function Grammar(){
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;
   const [switches, setSwitches] = useState(Array(117).fill(false));


   const router = useRouter()
      useEffect(() => {
         const handleDefaultBack = (event) => {
            event.preventDefault()
            router.push('/')
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


   return(
      <div className={styles.container}>
         <Image
            className={styles.background}
            src="/images/illustrations/act2.jpg"
            alt=""
            fill
            onLoad={handleImageLoad}
         />

         <Link href="/" className={styles.backHolder}>
            <IoIosArrowBack className={styles.backSign} />
            <div className={styles.backText}>Back</div>
         </Link>

         <div className={styles.top}>
            <div className={styles.mainTitle}>Grammar</div>
            <div className={styles.subtitle}>Learn the Lessons and Practice</div>
         </div>

         <div className={styles.bottom}>
            <div className={styles.lessonsTitle}>Lessons:</div>

            <div className={styles.learningHolder}>
               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 1: Sentence Elements 1</div>
                  <div className={styles.newLesson}>Subject / Verb</div>
               </Link>

               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 2: Sentence Elements 2</div>
                  <div className={styles.newLesson}>Subject Pronouns</div>
               </Link>

               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 3:  Tenses 1</div>
                  <div className={styles.newLesson}>Present Simple</div>
               </Link>

               
               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 4: Sentence Elements 3</div>
                  <div className={styles.newLesson}>Possessive Pronouns</div>
               </Link>

               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 5: Sentence Elements 4</div>
                  <div className={styles.newLesson}>Object Pronouns</div>
               </Link>

               
               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 6: Tenses 2</div>
                  <div className={styles.newLesson}>Present Continuous</div>
               </Link>

               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 7: Sentence Elements 5</div>
                  <div className={styles.newLesson}>Adverbs of Time / Place</div>
               </Link>
               
               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 8: Sentence Elements 6</div>
                  <div className={styles.newLesson}>Adverbs of Manner</div>
               </Link>

               <Link
                  href='/grammar/'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 9: Articles</div>
                  <div className={styles.newLesson}>Definite and Indefinite</div>
               </Link>

               <Link
                  href='/grammar/Sentence Elements'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 10: Sentence Elements 7</div>
                  <div className={styles.newLesson}>Adverbs of Frequency</div>
               </Link>


               <Link
                  href='/grammar/'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 11: Verb Forms 1</div>
                  <div className={styles.newLesson}>Infinitives and -ing</div>
               </Link>

               <Link
                  href='/grammar/'
                  className={styles.lessonsHolder}
               >
                  <div className={styles.lesson}>Lesson 12: Helping Verbs</div>
                  <div className={styles.newLesson}>English Modals</div>
               </Link>

            </div>
         </div>

         {isLoading && (
            <div className={styles.bottomLayer}>
            <Loader />
            </div>
         )}
      </div>
   )
}

export default Grammar;
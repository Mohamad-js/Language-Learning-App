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
            src="/images/back/grammarBack.jpg"
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

               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Sentence Elements</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/noun'>
                        Noun
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/verb'>
                        Verb
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/adverb'>
                        Adverb
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/adjective'>
                        Adjective
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/subject'>
                        Subject
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/object'>
                        Object
                     </Link>
                  </button>

               </div>

               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>English Pronouns</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/subpro'>
                        Subject Pronoun
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/objpro'>
                        Object Pronoun
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pospro'>
                        Possessive Pro.
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/posadj'>
                        Possessive Adj.
                     </Link>
                  </button>

               </div>

               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Present Simple</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/presimstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/presimusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/presimque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/presimneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>

               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Present Continuous</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preconstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preconusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preconque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preconneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>

              <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Past Simple</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/passimstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/passimusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/passimque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/passimneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>

               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Past Continuous</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasconstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasconusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasconque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasconneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>

               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Future Simple</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futsimstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futsimusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futsimque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futsimneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>


               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Future Continuous</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futpasstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futpasusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futpasque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futpasneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>

               
               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Present Perfect</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preperstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preperusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preperque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preperneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>


               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Past Perfect</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasperstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasperusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasperque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasperneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>

               
               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Future Perfect</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futperstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futperusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futperque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futperneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>
               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Present Perfect Continuous</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preperconstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preperconusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preperconque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/preperconneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>


               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Past Perfect Continuous</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasperconstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasperconusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasperconque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/pasperconneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>

               
               <div className={styles.lessonsHolder}>
                  <div className={styles.lesson}>Future Perfect Continuous</div>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futperconstr'>
                        Structure
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futperconusa'>
                        Usages
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futperconque'>
                        Question Form
                     </Link>
                  </button>

                  <button className={styles.subLesson}>
                     <Link href='/grammar/futperconneg'>
                        Negative Form
                     </Link>
                  </button>

               </div>

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
'use client'
import styles from './review.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Back from '@/components/backButton/back';
import Image from 'next/image';
import Loader from '@/components/loading/loading';



function Review(){
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


   return(
      <div className={styles.container}>
         <Back />

         <Image
            className={styles.background}
            src="/images/back/review.jpg"
            alt="background"
            fill
            onLoad={handleImageLoad}
         />

         <div className={styles.sectionsHolder }>
            <div className={styles.activityHolder}>
            <div className={styles.title}>Review Menu</div>
               
               <Link href='/review/words'>
                  <div className={styles.activity}>
                     <div className={styles.actBtn}>Vocabulary</div>
                  </div>
               </Link>
               
               <Link href='/review/grammar'>
                  <div className={styles.activity}>
                     <div className={styles.actBtn}>Grammar</div>
                  </div>
               </Link>
            
               <Link href='/review/expressions'>
                  <div className={styles.activity}>
                     <div className={styles.actBtn}>Expressions</div>
                  </div>
               </Link>
               <Link href='/review/collocations'>
                  <div className={styles.activity}>
                     <div className={styles.actBtn}>Collocations</div>
                  </div>
               </Link>
            
               <Link href='/review/synonyms'>
                  <div className={styles.activity}>
                     <div className={styles.actBtn}>Synoynms</div>
                  </div>
               </Link>

               <Link href='/review/family'>
                  <div className={styles.activity}>
                     <div className={styles.actBtn}>Word Family</div>
                  </div>
               </Link>
            </div>
         </div>

         {isLoading && (
            <Loader />
         )}
      </div>
   )
}

export default Review;
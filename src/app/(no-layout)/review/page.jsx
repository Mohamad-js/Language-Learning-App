'use client'
import styles from './review.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';


function Review(){
   



   return(
      <>
         <div className={styles.container}>
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
         </div>
      </>
   )
}

export default Review;
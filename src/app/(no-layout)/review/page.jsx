'use client'
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import styles from './review.module.css'
import { useState, useEffect } from 'react';



function Review(){
   
   useEffect(() => {
      const unknown = localStorage.getItem('unknownWords')
      const partial = localStorage.getItem('partialWords')
      const learningWords = unknown && partial ? [...partial, ...unknown] : []
      localStorage.setItem('toReview', learningWords)

   }, [])



   return(
      <>
         <div className={styles.container}>
            <ProgressBar inputNumber={3}/>
         </div>
      </>
   )
}

export default Review;
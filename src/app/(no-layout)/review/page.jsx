'use client'
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
         <div className={styles.container}>This is review page</div>
      </>
   )
}

export default Review;
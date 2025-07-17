'use client'
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import styles from './review.module.css'
import { useState, useEffect } from 'react';
import { useData } from '@/components/context/MyContext';



function Review(){
   const {vocabData, setVocabData} = useData()
   
   useEffect(() => {
      const unknown = localStorage.getItem('unknownWords')
      const partial = localStorage.getItem('partialWords')
      const learningWords = unknown && partial ? [...partial, ...unknown] : []
      localStorage.setItem('toReview', learningWords)

   }, [])

   useEffect(() => {
      console.log("Updated vocabData:", vocabData); // Debug log

      // Only proceed if vocabData.lessons exists
      if (vocabData.lessons) {
         const lessonKey = `lesson${slug}`; // Replace with your slug logic
         const lesson = vocabData.lessons[lessonKey];
         
         if (lesson) {
         const unknown = lesson.unknownWords || [];
         const partial = lesson.partialWords || [];
         const learningWords = [...partial, ...unknown];
         localStorage.setItem('toReview', JSON.stringify(learningWords));
         }
      }
   }, [vocabData]); // Re-run when vocabData changes



   return(
      <>
         <div className={styles.container}>
            <ProgressBar inputNumber={3}/>
         </div>
      </>
   )
}

export default Review;
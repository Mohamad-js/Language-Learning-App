"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import Loader from "@/components/loading/loading";
import styles from './page.module.css'



const StudyPlan = () => {
   const [aveProgress,setAveProgress] = useState(77)
   const [readProgress,setReadProgress] = useState(42)
   const [writeProgress,setWriteProgress] = useState(18)
   const [listenProgress,setListenProgress] = useState(29)
   const [speakProgress,setSpeakProgress] = useState(57)
   const [isLoading, setIsLoading] = useState(true);
   // const [loadedImages, setLoadedImages] = useState(0);
   // const totalImages = 7;

   // const handleImageLoad = () => {
   //    setLoadedImages((prev) => {
   //    const newCount = prev + 1;
   //    if (newCount >= totalImages) {
   //       setIsLoading(false);
   //    }
   //       return newCount;
   //    });
   // };


   // useEffect(() => {
   //    if (loadedImages >= totalImages) {
   //       setIsLoading(false);
   //    }
   // }, [loadedImages]);

   return (
      <div className={styles.bigMom}>
         <div className={styles.pageHolder}>
            <div className={styles.activityTitle}>Start From Here</div>
            <div className={styles.aveProgress}>
               <ProgressBar inputNumber={aveProgress}/>
               <div className={styles.aveTitle}>TOTAL COMPLETION</div>
            </div>

            <div className={styles.activityHolder}>
               <div className={styles.pair}>
                  <Link href='/words'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Vocabulary</div>
                     </div>
                  </Link>
                  <Link href='/grammar'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Grammar</div>
                     </div>
                  </Link>
               </div>

               <div className={styles.pair}>
                  <Link href='/expressions'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Expressions</div>
                     </div>
                  </Link>
                  <Link href='/collocations'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Collocations</div>
                     </div>
                  </Link>
               </div>

               <div className={styles.pair}>
                  <Link href='synoynms'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Synoynms</div>
                     </div>
                  </Link>
                  <Link href='antonyms'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Antonyms</div>
                     </div>
                  </Link>
               </div>

            </div>
         </div>
   
         
         {/* {
            isLoading ?
            <div className={styles.bottomLayer}>
               <Loader /> 
            </div>
            : ''
         } */}
      </div>
   );
};

export default StudyPlan;

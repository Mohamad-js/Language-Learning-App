"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import Loader from "@/components/loading/loading";
import styles from './page.module.css'





const Home = () => {

   // const [isLoading, setIsLoading] = useState(true);
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
            <div className={styles.activityTitle}>Home Page</div>

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
                  <Link href='synonyms'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Synoynms</div>
                     </div>
                  </Link>
                  <Link href='family'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Word Family</div>
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

export default Home;

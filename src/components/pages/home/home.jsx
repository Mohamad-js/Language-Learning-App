"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import Loader from "@/components/loading/loading";
import styles from './home.module.css'





const Home = () => {
      


   
   return (
      <div className={styles.bigMom}>
         <div className={styles.pageHolder}>
            <div className={styles.activityTitle}>Home Page</div>
            <div className={styles.aveProgress}>
               <ProgressBar
                  inputNumber={wordsA1Count}
                  endNumber={1170}
                  title='A1 Words Learnt'
               />
               <div className={styles.aveTitle}>Start Learning</div>
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
   
         
         { isLoading && <Loader /> }
      </div>
   );
};

export default Home;

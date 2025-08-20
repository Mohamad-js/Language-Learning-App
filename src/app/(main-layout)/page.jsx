"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import Loader from "@/components/loading/loading";
import styles from './page.module.css'
import Iridescence from "@/components/Iridescence/iridescence";





const Home = () => {




   return (
      <div className={styles.bigMom}>

         <Iridescence
            color={[1, 1, 1]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
         />

         <div className={styles.pageHolder}>
            <div className={styles.pageTitle}>Home Page</div>

            <div className={styles.topSection}>
               <div className={styles.motivtitle}>Today&apos;s Expression</div>
               <div className={styles.motivText}>
                  Oh, excuse my French! I did not know that you are the new professor.
               </div>
            </div>

            <div className={styles.activityHolder}>
               <div className={styles.activityTitle}>Lessons to Learn</div>
               <div className={styles.pair}>
                  <Link href='/words'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Vocabulary</div>
                        <div className={styles.info}>
                           <div className={styles.infoText}>6 CEFR Levels</div>
                           <div className={styles.infoText}>5000 Words</div>
                        </div>
                     </div>
                  </Link>
                  <Link href='/grammar'>
                     <div className={styles.activity}>
                        <div className={styles.actBtn}>Grammar</div>
                        <div className={styles.info}>
                           <div className={styles.infoText}>38 Topics</div>
                           <div className={styles.infoText}>164 Lessons</div>
                        </div>
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

      </div>
   );
};

export default Home;

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import Loader from "@/components/loading/loading";
import styles from './page.module.css'



const StudyPlan = () => {
   const [info, setInfo] = useState([]);
   const [pages, setPages] = useState('home')
   const [aveProgress,setAveProgress] = useState(38)
   const [readProgress,setReadProgress] = useState(42)
   const [writeProgress,setWriteProgress] = useState(18)
   const [listenProgress,setListenProgress] = useState(29)
   const [speakProgress,setSpeakProgress] = useState(57)
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 7;

   const handleImageLoad = () => {
      setLoadedImages((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
         setIsLoading(false);
      }
         return newCount;
      });
   };


   useEffect(() => {
      if (loadedImages >= totalImages) {
         setIsLoading(false);
      }
   }, [loadedImages]);

   return (
      <div className={styles.bigMom}>

         <Image className={styles.back}
            src='/images/back/mainBack.jpg'
            fill
            alt="background"
            onLoad={handleImageLoad}
         />
         
      
         <div className={styles.pageHolder}>
            <div className={styles.progress}>
               <div className={styles.mainTitle}>Your Progress</div>
               <div className={styles.illHolder}>
                  <Image className={styles.progPic}
                     src='/images/illustrations/progress.png'
                     alt="progress"
                     fill
                     onLoad={handleImageLoad}
                  />
               </div>
               <div className={styles.aveProgress}>
                  <ProgressBar inputNumber={aveProgress}/>
                  <div className={styles.aveTitle}>Completed</div>
               </div>
               <div className={styles.progBarHolder}>
                  <div className={styles.progBar}>
                     <div className={styles.progHolder}>
                        <div className={styles.progNumber}>{speakProgress}%</div>
                        <div className={styles.progTitle}>SPEAKING</div>
                     </div>
                     <div className={styles.progHolder}>
                        <div className={styles.progNumber}>{writeProgress}%</div>
                        <div className={styles.progTitle}>WRITING</div>
                     </div>
                     <div className={styles.progHolder}>
                        <div className={styles.progNumber}>{listenProgress}%</div>
                        <div className={styles.progTitle}>LISTENING</div>
                     </div>
                     <div className={styles.progHolder}>
                        <div className={styles.progNumber}>{readProgress}%</div>
                        <div className={styles.progTitle}>READING</div>
                     </div>
                  </div>
               </div>
            </div>


            <div className={styles.activityHolder}>
               <div className={styles.activityTitle}>Start From Here</div>
               <div className={styles.pair}>
                  <Link href='/words' className={styles.activity}>
                     <Image className={styles.actPic}
                        src='/images/illustrations/act1.jpg'
                        alt="progress"
                        fill
                        onLoad={handleImageLoad}
                     />
                     <button className={styles.actBtn}>Vocabulary</button>
                  </Link>
                  <div className={styles.activity}>
                     <Image className={styles.actPic}
                        src='/images/illustrations/act2.jpg'
                        alt="progress"
                        fill
                        onLoad={handleImageLoad}
                     />
                     <button className={styles.actBtn}>Grammar</button>
                  </div>
               </div>
               <div className={styles.pair}>
                  <div className={styles.activity}>
                     <Image className={styles.actPic}
                        src='/images/illustrations/act3.jpg'
                        alt="progress"
                        fill
                        onLoad={handleImageLoad}
                     />
                     <button className={`${styles.actBtn} ${styles.light}`}>Expressions</button>
                  </div>
                  <div className={styles.activity}>
                     <Image className={styles.actPic}
                        src='/images/illustrations/act4.jpg'
                        alt="progress"
                        fill
                        onLoad={handleImageLoad}
                     />
                     <button className={`${styles.actBtn} ${styles.light}`}>Synonyms</button>
                  </div>
               </div>
               <div className={styles.pair}>
                  <div className={styles.activity}>
                     <Image className={styles.actPic}
                        src='/images/illustrations/act5.jpg'
                        alt="progress"
                        fill
                        onLoad={handleImageLoad}
                     />
                     <button className={styles.actBtn}>Tests</button>
                  </div>
                  <Link href='/review' className={styles.activity}>
                     <Image className={styles.actPic}
                        src='/images/illustrations/act6.jpg'
                        alt="progress"
                        fill
                        onLoad={handleImageLoad}
                     />
                     <button className={`${styles.actBtn} ${styles.light}`}>Review</button>
                  </Link>
               </div>
            </div>
         </div>
   
         
         {
            isLoading ?
            <div className={styles.bottomLayer}>
               <Loader /> 
            </div>
            : ''
         }
      </div>
   );
};

export default StudyPlan;

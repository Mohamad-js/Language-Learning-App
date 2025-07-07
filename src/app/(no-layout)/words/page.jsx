'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import styles from './words.module.css'
import Image from 'next/image';
import Loader from '@/components/loading/loading';


function Words(){
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

   useEffect(() => {
      if (loadedImages >= totalImages) {
         setIsLoading(false);
      }
   }, [loadedImages]);



   return(
      <>
         <div className={styles.container}>
            <Image className={styles.image}
               src='../images/back/background.jpg'
               fill
               alt='background'
               onLoad={handleImageLoad}
            />

            <Link href='/' className={styles.backHolder}>
               <IoIosArrowBack className={styles.backSign}/>
               <div className={styles.backText}>Back</div>
            </Link>

            <div className={styles.mother}>
               <div className={styles.title}>Choose Your Level</div>
               <div href='/a1' className={styles.level}>A1</div>
               <div href='/a2' className={styles.level}>A2</div>
               <div href='/b1' className={styles.level}>B1</div>
               <div href='/b2' className={styles.level}>B2</div>
               <div href='/c1' className={styles.level}>C1</div>
               <div href='/c2' className={styles.level}>C2</div>
            </div>

            {
               isLoading ?
               <div className={styles.bottomLayer}>
                  <Loader /> 
               </div>
               : ''
            }
         </div>
      </>
   )
}

export default Words;
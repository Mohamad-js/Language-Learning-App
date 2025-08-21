'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './words.module.css'
import Image from 'next/image';
import Loader from '@/components/loading/loading';
import Back from '@/components/backButton/back';


function Words(){
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;

   const router = useRouter()
   useEffect(() => {
      const handleDefaultBack = (event) => {
         event.preventDefault()
         router.push('/')
      }

      window.addEventListener('popstate', handleDefaultBack)
      
      return () => {
         window.removeEventListener('popstate', handleDefaultBack)
      }
   }, [router])

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
               src='/images/back/background.jpg'
               fill
               alt='background'
               onLoad={handleImageLoad}
            />

            <Back goTo ={'/'} />

            <div className={styles.mother}>
               <div className={styles.title}>Choose Your Level</div>

               <div className={styles.level}>
                  <Link href='/a1'>A1</Link>
               </div>

               <div className={styles.level}>
                  <Link href='/a2'>A2</Link>
               </div>

               <div className={styles.level}>
                  <Link href='/b1'>B1</Link>
               </div>

               <div className={styles.level}>
                  <Link href='/b2'>B2</Link>
               </div>

               <div className={styles.level}>
                  <Link href='/c1'>C1</Link>
               </div>

               <div className={styles.level}>
                  <Link href='/c2'>C2</Link>
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
      </>
   )
}

export default Words;
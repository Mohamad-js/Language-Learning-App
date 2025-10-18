'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './words.module.css'
import Image from 'next/image';
import Loader from '@/components/loading/loading';
import Back from '@/components/backButton/back';
import { useTheme } from '@/components/context/ThemeContext';


function Words(){
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;

   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1

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
            {
               darkMode ?
               <Image className={styles.image}
                  src='/images/back/wordsDark.jpg'
                  fill
                  alt='background'
                  onLoad={handleImageLoad}
               />
               :
               <Image className={styles.image}
                  src='/images/back/background.jpg'
                  fill
                  alt='background'
                  onLoad={handleImageLoad}
               />
            }

            <Back goTo ={'/'} />

            <div className={styles.mother}>
               <div className={styles.title}
                  style={darkMode ? {color: 'white'} : {}}
               >Choose Your CEFR Level</div>

               <div className={`${styles.level} ${darkMode && styles.levelDark}`}>
                  <Link href='/a1'>A1</Link>
               </div>

               <div className={`${styles.level} ${darkMode && styles.levelDark}`}>
                  <Link href='/a2'>A2</Link>
               </div>

               <div className={`${styles.level} ${darkMode && styles.levelDark}`}>
                  <Link href='/b1'>B1</Link>
               </div>

               <div className={`${styles.level} ${darkMode && styles.levelDark}`}>
                  <Link href='/b2'>B2</Link>
               </div>

               <div className={`${styles.level} ${darkMode && styles.levelDark}`}>
                  <Link href='/c1'>C1</Link>
               </div>

               <div className={`${styles.level} ${darkMode && styles.levelDark}`}>
                  <Link href='/c2'>C2</Link>
               </div>

            </div>

            { isLoading && <Loader /> }
         </div>
      </>
   )
}

export default Words;
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
         <div className='absolute top-0 left-0 w-full min-h-dvh pt-15'>
            {
               darkMode ?
               <Image className='-z-1'
                  src='/images/back/wordsDark.jpg'
                  fill
                  alt='background'
                  onLoad={handleImageLoad}
               />
               :
               <Image className='-z-1'
                  src='/images/back/background.jpg'
                  fill
                  alt='background'
                  onLoad={handleImageLoad}
               />
            }

            <Back goTo ={'/'} />

            <div className='w-full h-full flex flex-wrap gap-5 p-5'>
               <div className='w-full text-center'
               >Choose Your CEFR Level</div>

               <div className='min-w-30 h-30 flex-1 border border-white rounded-2xl flex items-center justify-center text-2xl bg-white/30 active:bg-white'>
                  <Link href='/a1'>A1</Link>
               </div>

               <div className='min-w-30 h-30 flex-1 border border-white rounded-2xl flex items-center justify-center text-2xl bg-white/30 active:bg-white'>
                  <Link href='/a2'>A2</Link>
               </div>

               <div className='min-w-30 h-30 flex-1 border border-white rounded-2xl flex items-center justify-center text-2xl bg-white/30 active:bg-white'>
                  <Link href='/b1'>B1</Link>
               </div>

               <div className='min-w-30 h-30 flex-1 border border-white rounded-2xl flex items-center justify-center text-2xl bg-white/30 active:bg-white'>
                  <Link href='/b2'>B2</Link>
               </div>

               <div className='min-w-30 h-30 flex-1 border border-white rounded-2xl flex items-center justify-center text-2xl bg-white/30 active:bg-white'>
                  <Link href='/c1'>C1</Link>
               </div>

               <div className='min-w-30 h-30 flex-1 border border-white rounded-2xl flex items-center justify-center text-2xl bg-white/30 active:bg-white'>
                  <Link href='/c2'>C2</Link>
               </div>

            </div>

            { isLoading && <Loader /> }
         </div>
      </>
   )
}

export default Words;
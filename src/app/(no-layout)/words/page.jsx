'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './words.module.css'
import Image from 'next/image';
import Back from '@/components/backButton/back';
import { useTheme } from '@/components/context/ThemeContext';
import { useLoading  } from '@/components/LoadingProvider';


function Words(){
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;

   const { stopLoading } = useLoading();

   const handleImageLoad = () => {
      stopLoading();
   };


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





   return(
      <>
         <div className='absolute top-0 left-0 w-full min-h-dvh flex flex-col pt-15'>

         <Image className='-z-1'
            src={darkMode
               ? '/images/back/wordsDark.jpg'
               : '/images/back/background.jpg'}
            fill
            alt="background"
            onLoad={handleImageLoad}
         />

            <Back to={'/'} />

            <div className='w-full flex-1 flex flex-col gap-5 p-5'>
               <div className='w-full text-center'>Choose Your CEFR Level</div>

               <Link href='/a1' className='flex-1 flex flex-col'>
                  <div className='flex-1 border border-white rounded-2xl flex items-center justify-center text-4xl font-bold text-black/40 bg-white/30 active:bg-white'>
                     A1
                  </div>
               </Link>
               
               <Link href='/a2' className='flex-1 flex flex-col'>
                  <div className='flex-1 border border-white rounded-2xl flex items-center justify-center text-4xl font-bold text-black/40 bg-white/30 active:bg-white'>
                     A2
                  </div>
               </Link>
               <Link href='/b1' className='flex-1 flex flex-col'>
                  <div className='flex-1 border border-white rounded-2xl flex items-center justify-center text-4xl font-bold text-black/40 bg-white/30 active:bg-white'>
                     B1
                  </div>
               </Link>
               <Link href='/b2' className='flex-1 flex flex-col'>
                  <div className='flex-1 border border-white rounded-2xl flex items-center justify-center text-4xl font-bold text-black/40 bg-white/30 active:bg-white'>
                     B2
                  </div>
               </Link>
               <Link href='/c1' className='flex-1 flex flex-col'>
                  <div className='flex-1 border border-white rounded-2xl flex items-center justify-center text-4xl font-bold text-black/40 bg-white/30 active:bg-white'>
                     C1
                  </div>
               </Link>
               <Link href='/c2' className='flex-1 flex flex-col'>
                  <div className='flex-1 border border-white rounded-2xl flex items-center justify-center text-4xl font-bold text-black/40 bg-white/30 active:bg-white'>
                     C2
                  </div>
               </Link>

            </div>

         </div>
      </>
   )
}

export default Words;
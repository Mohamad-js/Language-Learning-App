'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './words.module.css'
import Image from 'next/image';
import Back from '@/components/backButton/back';
import { useLoading  } from '@/components/LoadingProvider';
import { motion } from 'framer-motion';
import { fadeLeftChild, fadeLeftParent } from '@/lib/animations/entrance';




function Words(){


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
         <motion.div 
            variants={fadeLeftParent}
            initial='hidden'
            animate='visible'

            className='absolute top-0 left-0 w-full min-h-dvh flex flex-col pt-15 bg-background'
         >

            <Back to={'/'} />

            <div className='w-full flex-1 flex flex-col gap-5 p-5'>
               <div className='w-full text-center'>Choose Your CEFR Level</div>

               <Link href='/a1' className='flex-1 flex flex-col'>
                  <motion.div
                     variants={fadeLeftChild}
                     className='flex-1 rounded-2xl drop-shadow-md flex items-center justify-center text-4xl font-bold bg-linear-to-tr from-[#5d50c6] via-[#f85e9f] to-[#f18fac]'
                  >
                     A1
                  </motion.div>
               </Link>
               
               <Link href='/a2' className='flex-1 flex flex-col'>
                  <motion.div 
                     variants={fadeLeftChild}
                     className='flex-1 rounded-2xl flex items-center drop-shadow-md justify-center text-4xl font-bold text-white bg-linear-to-r from-[#fef08a] via-[#84cc16] to-[#16a34a]'
                  >
                     A2
                  </motion.div>
               </Link>

               <Link href='/b1' className='flex-1 flex flex-col'>
                  <motion.div 
                     variants={fadeLeftChild}
                     className='flex-1 rounded-2xl flex items-center drop-shadow-md justify-center text-4xl font-bold text-white bg-linear-to-r from-[#db2777] via-[#ef4444] to-[#f97316]'
                  >
                     B1
                  </motion.div>
               </Link>

               <Link href='/b2' className='flex-1 flex flex-col'>
                  <motion.div
                     variants={fadeLeftChild}
                     className='flex-1 rounded-2xl flex items-center drop-shadow-md justify-center text-4xl font-bold text-white bg-linear-to-tl from-[#831843] via-[#a21caf] to-[#e879f9]'
                  >
                     B2
                  </motion.div>
               </Link>

               <Link href='/c1' className='flex-1 flex flex-col'>
                     <motion.div 
                     variants={fadeLeftChild}
                     className='flex-1 rounded-2xl flex items-center drop-shadow-md justify-center text-4xl font-bold text-white bg-linear-to-r from-[#4ade80] via-[#14b8a6] to-[#0891b2]'
                  >
                     C1
                  </motion.div>
               </Link>

               <Link href='/c2' className='flex-1 flex flex-col'>
                  <motion.div
                     variants={fadeLeftChild}
                     className='flex-1 rounded-2xl flex items-center drop-shadow-md justify-center text-4xl font-bold text-white bg-linear-to-tl from-[#4b4c7a] via-[#eb92fb] to-[#c855bc]'
                  >
                     C2
                  </motion.div>
               </Link>

            </div>

         </motion.div>
      </>
   )
}

export default Words;
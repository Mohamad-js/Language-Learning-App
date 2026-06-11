'use client'
import styles from './back.module.css'
import { IoIosArrowBack } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '../LoadingProvider';



function Back(){

   const router = useRouter()
   const { startLoading } = useLoading()

   const handleBack = () => {
      startLoading()
      router.back()
   }

   return(
      <div className='rounded-xl fixed top-0 left-0 p-4 active:bg-black/10' onClick={handleBack}>
         <IoIosArrowBack style={40} />
      </div>
   )
}

export default Back;
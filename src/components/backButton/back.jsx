'use client'
import { IoIosArrowBack } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '../LoadingProvider';



function Back({to = '/'}){

   const router = useRouter()
   const { startLoading } = useLoading()

   const handleBack = () => {
      startLoading()
      router.replace(to)
   }

   return(
      <div className='absolute top-0 p-4 mt-2 rounded-xl left-0 active:bg-background/10 z-2' 
      onClick={handleBack}>
         <IoIosArrowBack size={23} className='' />
      </div>
   )
}

export default Back;
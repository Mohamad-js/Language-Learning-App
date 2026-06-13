'use client'
import { IoIosArrowBack } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '../LoadingProvider';



function Back({to}){

   const router = useRouter()
   const { startLoading } = useLoading()

   const handleBack = () => {
      startLoading()
      router.replace(to)
   }

   return(
      <div className='rounded-xl fixed top-0 left-0 p-4 active:bg-black/10' onClick={handleBack}>
         <IoIosArrowBack style={40} />
      </div>
   )
}

export default Back;
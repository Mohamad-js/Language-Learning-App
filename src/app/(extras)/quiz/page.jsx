'use client'
import {useState} from "react";
import Image from 'next/image';
import Back from '@/components/backButton/back'


export default function Quiz() {

    return (
        <div className='fixed w-full min-h-dvh bg-background flex flex-col'>
            
            <div className='fixed w-full min-h-dvh'>
                <Image
                    className='object-cover object-right dark:hidden'
                    src='/images/quiz/quiz-light.jpg'
                    alt='background image'
                    fill
                />
                <Image
                    className='object-cover object-right hidden dark:block'
                    src='/images/quiz/quiz-dark.jpg'
                    alt='background image'
                    fill
                />
            </div>

            <Back />

            <div className='w-full h-15'>s</div>

            <div className='w-full p-5 flex-1 relative'>
                <div className='w-full h-10 text-xl font-bold text-foreground'>Quiz Time</div>
                <div className='w-full h-10 bg-green-500'></div>
            </div>
            
        </div>
    )
}


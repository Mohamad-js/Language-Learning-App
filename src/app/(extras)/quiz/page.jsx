'use client'
import {useState, useEffect} from "react";
import Image from 'next/image';
import Back from '@/components/backButton/back'
import { getAllQuizzes } from "@/lib/db";
import {GoArrowRight} from "react-icons/go";


export default function Quiz() {
    const [quiz, setQuiz] = useState(null)

    useEffect(()=>{
        const request = async() => {
            try {
                const response = await getAllQuizzes()

                setQuiz(response)

            } catch(error) {
                console.error(error)
            }
        }

        void request()
    }, [])

    console.log('quiz', quiz)

    return (
        <div className='fixed w-full h-dvh bg-background flex flex-col'>

            <div className='absolute top-0 w-full min-h-dvh'>
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

            <div className='w-full h-15'></div>

            <div className='w-full min-h-0 overflow-auto p-5 flex-1 relative flex flex-col gap-3'>
                <div className='w-full h-10 text-xl font-bold text-foreground'>Quiz Time</div>

                <div className='w-full min-h-0 overflow-auto flex flex-col gap-5'>
                    {
                        quiz?.map((item, index) => (
                            <div key={index} className='w-full p-5 bg-background/60 border rounded-2xl backdrop-blur-xs flex flex-col gap-5'>
                                <div className='w-full flex justify-between'>
                                    <div className='text-xs text-gray-500'>Quiz {item.quizNumber}</div>
                                    
                                    <div className='text-xs text-gray-500'>{item.quizLevel}</div>
                                </div>
                                
                                <div className=''>
                                    <div className='text-xl'>{item.quizTitle}</div>
                                    <div className='text-sm'>{item.featuring}</div>
                                </div>

                                <div className="flex items-center justify-end gap-3">
                                    <div className='text-sm font-semibold'>Start</div>
                                    <GoArrowRight />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}


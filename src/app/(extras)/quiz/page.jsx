'use client'
import {useState, useEffect} from "react";
import Image from 'next/image';
import Back from '@/components/backButton/back'
import { getAllQuizzes } from "@/lib/db";
import {GoArrowRight} from "react-icons/go";
import { motion } from "framer-motion";
import {slideUp, fadeIn, expandParent, expandChild} from "@/lib/animations/entrance";
import {IoCloseOutline} from "react-icons/io5";




export default function Quiz() {
    const [quiz, setQuiz] = useState(null)
    const [toggleContent, setToggleContent] = useState(false)
    const [targetQuiz, setTargetQuiz] = useState(null)
    const [answers, setAnswers] = useState({})

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

    console.log('answers', answers)
    
    const showQuiz = (item) => {
        setToggleContent(true)
        setTargetQuiz(item)
    }
    
    const closeQuiz = () => {
        setToggleContent(false)
    }

    const handleAnswer = (questionIndex, option) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: option
        }))
    }

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

            <div className='w-full min-h-0 overflow-auto p-5 pt-15 flex-1 relative flex flex-col gap-3'>
                <div className='w-full h-10 text-xl font-bold text-foreground'>Quiz Time</div>

                <motion.div
                    variants={expandParent}
                    initial='hidden'
                    animate='visible'

                    className='w-full min-h-0 overflow-auto flex flex-col gap-5'
                >
                    {
                        quiz?.map((item, index) => (
                            <motion.div
                                variants={expandChild} key={index}
                                className='w-full p-5 bg-background/60 border rounded-2xl backdrop-blur-xs flex flex-col gap-5'
                                 onClick={()=> showQuiz(item)}
                            >
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
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>

            {
                toggleContent &&
                    <motion.div {...fadeIn}
                        className='absolute inset-0 top-0 w-full h-dvh bg-background/10 flex flex-col backdrop-blur-xs p-5 pt-15'
                         onClick={closeQuiz}
                    >

                        <motion.div {...slideUp}
                            onClick={(e) => e.stopPropagation()}
                            className='w-full h-full min-h-0 flex flex-col gap-5 p-5 bg-background rounded-xl border shadow-lg'
                        >
                            <div className='w-full flex justify-between'>
                                Quiz {targetQuiz?.quizNumber}
                                <IoCloseOutline size={25}
                                    onClick={closeQuiz}
                                />
                            </div>
                            
                            <div className='relative w-full flex-1 min-h-0 overflow-hidden flex flex-col gap-3 items-center'>
                                <div className='text-xl font-bold text-grey-500'>{targetQuiz.quizTitle}</div>
                                
                                <div className='w-full min-h-0 overflow-y-auto flex flex-col gap-5'>
                                    {
                                        targetQuiz.quizData.multi.map((quiz, index) => {

                                            const questionNumber = index + 1
                                            
                                            return (
                                                <div key={questionNumber}
                                                    className='w-full'>
                                                    <div className=''>
                                                        {quiz.question}
                                                    </div>

                                                    <div className=''>
                                                        {quiz.options.map((option, optionIndex) => (
                                                            <label
                                                                key={optionIndex}
                                                                className="flex items-center gap-3"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`question-${questionNumber}`}
                                                                    value={option}
                                                                    checked={answers[questionNumber] === option}
                                                                    onChange={() => handleAnswer(questionNumber, option)}
                                                                />

                                                                <span>{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
            }

        </div>
    )
}


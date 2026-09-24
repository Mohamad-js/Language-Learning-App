'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';
import Back from '@/components/backButton/back'
import { getAllQuizzes, saveQuizResult } from "@/lib/db";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import {  slideUp, fadeIn, expandParent, expandChild } from "@/lib/animations/entrance";
import { TbFaceIdError } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'sonner';




export default function Quiz() {
    const [quiz, setQuiz] = useState(null)
    const [toggleContent, setToggleContent] = useState(false)
    const [targetQuiz, setTargetQuiz] = useState(null)
    const [answers, setAnswers] = useState({})
    const [errorModal, setErrorModal] = useState(false)
    const [unansweredItems, setUnansweredItems] = useState(null)
    const [finalWindow, setFinalWindow] = useState(false)
    const [finalResults, setFinalResults] = useState(null)
    const [grade, setGrade] = useState(null)
    const [toggleMistake, setToggleMistake] = useState(false)
    const [recToggle, setRecToggle] = useState(false)
    const [recData, setRecData] = useState(null)


    useEffect(()=>{
        const request = async() => {
            try {
                const response = await getAllQuizzes()

                setQuiz(response)
                console.log('response', response) 

            } catch(error) {
                console.error(error)
            }
        }

        void request()
    }, [])

    const showQuiz = (item) => {
        if (item.quizData.multi) {
            if (!item.userAnswers) {
                setToggleContent(true)
                setTargetQuiz(item)
            } else {
                openRec(item)
            }
        } else {
            toast.info('Coming Soon')
        }
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


    const submitQuiz = async () => {
        if (!targetQuiz) return

        const questions = targetQuiz.quizData.multi

        const allAnswered = questions.every(
            (question) => answers[question.number] !== undefined
        )

        if (!allAnswered) {
            const unansweredQuestions = targetQuiz?.quizData?.multi
                ?.filter((question) => answers[question.number] === undefined)
                .map((question) => question.number) || []

            setErrorModal(true)

            setUnansweredItems(unansweredQuestions)

            return
        }


        const quizKeys = targetQuiz.quizKeys

        let correct = 0
        let wrong = 0

        const failedQuestions = []

        questions.forEach((question) => {
            const questionNumber = question.number
            const correctAnswer = quizKeys[questionNumber]
            const givenAnswer = answers[questionNumber] ?? null

            if (givenAnswer === correctAnswer) {
                correct++
            } else {
                wrong++

                failedQuestions.push({
                    number: question.number,
                    question: question.question,
                    options: question.options,
                    correct: correctAnswer,
                    given: givenAnswer
                })
            }
        })

        const total = questions.length

        const score = total > 0
            ? Math.round(((correct * 20) / total) * 100) / 100
            : 0;

        let grade;

        if (score <= 10) {
            grade = "F";
        } else if (score <= 13) {
            grade = "E";
        } else if (score <= 15) {
            grade = "D";
        } else if (score <= 17) {
            grade = "C";
        } else if (score < 19.5) {
            grade = "B";
        } else if (score < 20) {
            grade = "A";
        } else {
            grade = "A+";
        }

        setGrade(grade)

        const now = new Date()

        const localDate = new Date(
            now.getTime() - now.getTimezoneOffset() * 60000
        )
            .toISOString()
            .slice(0, 19)

        const userAnswers = {
            date: localDate,
            topic: targetQuiz.featuring,
            quizLabel: targetQuiz.quizLabel,
            quizLevel: targetQuiz.quizLevel,
            total: total,
            correct: correct,
            wrong: wrong,
            score: score,
            grade: grade,
            failedQuestions: failedQuestions
        }

        console.log('failedQuestions', userAnswers.failedQuestions)

        try {
            await saveQuizResult(targetQuiz.quizNumber, userAnswers)

            // Updating the quiz list immediately
            setQuiz(prevQuiz =>
                prevQuiz.map(item =>
                    item.quizNumber === targetQuiz.quizNumber
                        ? {
                            ...item,
                            userAnswers: userAnswers
                        }
                        : item
                )
            )

            // Also update targetQuiz
            setTargetQuiz(prev =>
                prev
                    ? {
                        ...prev,
                        userAnswers: userAnswers
                    }
                    : prev
            )

            toast.success('Progress Saved')
            setFinalWindow(true)
            setFinalResults(userAnswers)

        } catch (error) {
            toast.error('Error in Saving the Answers')
            console.error("Failed to save quiz result:", error)
        }
    }
    
    const closeWarning = () => {
        setErrorModal(false)
    }

    const closeFinalWindow = () => {
        setFinalWindow(false)
        setToggleContent(false)
    }

    const openMistake = () => {
        setFinalWindow(false)
        setToggleMistake(true)
        setRecToggle(false)
    }

    const closeEverything = () => {
        setFinalWindow(false)
        setToggleMistake(false)
        setToggleContent(false)
    }

    const openRec = (item) => {
        setTargetQuiz(item)
        setRecToggle(true)
        setRecData(item.userAnswers)
    }

    const closeRec = () => {
        setRecToggle(false)
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

            { !toggleContent && <Back /> }

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

                                {
                                    item.userAnswers &&
                                    <div className='absolute inset-0 w-full min-h-full bg-background/70 backdrop-blur-xs rounded-2xl flex justify-center items-center font-bold text-xl'>
                                        <div className='w-20 h-20 flex justify-center items-center border rounded-4xl text-4xl font-bold'>
                                            {item.userAnswers.grade}
                                        </div>
                                    </div>

                                }
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>

            {
                toggleContent &&
                    <motion.div {...fadeIn}
                        className='absolute inset-0 top-0 w-full h-dvh bg-background/10 flex flex-col backdrop-blur-xs p-5 pt-15'
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
                                
                                <div className='w-full min-h-0 overflow-y-auto flex flex-col gap-10'>
                                    {
                                        targetQuiz.quizData.multi.map((quiz) => {

                                            const questionNumber = quiz.number
                                            
                                            return (
                                                <div key={questionNumber}
                                                    className='w-full border-0 border-b pb-5'
                                                >
                                                    <div className='relative flex gap-3'>
                                                        <div className='text-foreground/20'>{quiz.number}</div>
                                                        <div className=''>{quiz.question}</div>
                                                    </div>

                                                    <div className=''>
                                                        {quiz.options.map((option, optionIndex) => (
                                                            <label
                                                                key={optionIndex}
                                                                className={`flex items-center gap-3 p-3
                                                                ${answers[questionNumber] === option && "p-2 rounded-xl border border-gray-500"}`}
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
                                    
                                    <div className='primary-btn'
                                         onClick={submitQuiz}
                                    >
                                        Done
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
            }

            {
                errorModal &&
                    <div
                        onClick={closeWarning}
                        className='absolute top-0 left-0 w-full min-h-dvh bg-background/10 backdrop-blur-xs flex justify-center items-center p-10 rounded-2xl shadow-lg'
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='w-full bg-background p-10 text-center border rounded-2xl flex flex-col justify-center items-center gap-5'
                        >
                            <div className='text-gray-500'>
                                <TbFaceIdError size={50} />
                            </div>

                            <div className='text-lg'>Answer all the questions before you continue!</div>

                            <div className='text-sm flex flex-col gap-3'>
                                Unanswered questions:
                                
                                <div className='w-full flex flex-wrap gap-3'>
                                    {
                                        unansweredItems?.map((item, index) => (
                                            <div key={index} className='text-gray-500'>{item}</div>
                                        ))
                                    }
                                </div>

                            </div>

                            <div className='w-full secondary-btn'
                                onClick={closeWarning}
                            >
                                OK
                            </div>
                        </div>
                    </div>
            }

            {
                finalWindow &&
                    <div
                        onClick={closeFinalWindow}
                        className='absolute top-0 left-0 w-full min-h-dvh bg-background/10 backdrop-blur-xs flex justify-center items-center p-10'
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='w-full bg-background flex flex-col justify-center items-center border rounded-2xl gap-5 shadow-lg p-7'
                        >
                            
                            <div className='w-full text-4xl flex items-center justify-center'>RESULT</div>

                            <div className='w-full p-5 bg-foreground/5 border rounded-2xl'>
                                <div className='w-full flex justify-between items-end'>
                                    <div className='text-sm text-gray-500'>
                                        Grade
                                    </div>

                                    <div className='text-2xl'>
                                        {grade}
                                    </div>
                                </div>

                                <div className='w-full flex justify-between items-end'>
                                    <div className='text-sm text-gray-500'>
                                        Correct Answers
                                    </div>

                                    <div className='text-2xl text-green-500'>
                                        {finalResults.correct}
                                    </div>
                                </div>

                                <div className='w-full flex justify-between items-end'>
                                    <div className='text-sm text-gray-500'>
                                        Wrong Answers
                                    </div>

                                    <div className='text-2xl text-red-500'>
                                        {finalResults.wrong}
                                    </div>
                                </div>

                            </div>
                            <div className='w-full flex justify-between gap-5'>
                                <div className='secondary-btn' onClick={closeFinalWindow}>Ok</div>
                                <div className='primary-btn' onClick={openMistake}>Check My Mistakes</div>
                            </div>
                        </div>
                    </div>
            }

            {
                toggleMistake &&
                <motion.div {...fadeIn}
                    className='absolute inset-0 top-0 w-full h-dvh bg-background/10 flex flex-col backdrop-blur-xs p-5 pt-15'
                >

                    <motion.div {...slideUp}
                        onClick={(e) => e.stopPropagation()}
                        className='w-full h-full min-h-0 flex flex-col gap-10 p-5 bg-background rounded-xl border shadow-lg'
                    >
                        <div className='w-full flex justify-between'>
                            <div className='w-full'>
                                <div className='text-xl font-bold text-grey-500'>Your Mistakes</div>

                                <div className='w-full flex gap-1'>
                                    <div className='text-grey-500 text-xs'>Quiz {targetQuiz?.quizNumber}:</div>
                                    <div className='text-black text-bold text-xs'>{targetQuiz.featuring}</div>
                                </div>
                            </div>

                            <IoCloseOutline size={25} onClick={closeEverything} />
                        </div>

                        <div className='relative w-full flex-1 min-h-0 overflow-hidden flex flex-col gap-3 items-center'>


                            <div className='w-full min-h-0 overflow-y-auto flex flex-col gap-10'>
                                {
                                    recData?.failedQuestions.map((item, index) => (
                                        <div key={index} className='w-full'>
                                            <div className='relative flex gap-3'>
                                                <div className='text-foreground/20'>{item.number}</div>
                                                <div className=''>{item.question}</div>
                                            </div>

                                            <div className='w-full flex gap-5'>
                                                <div className='text-gray-500 text-sm'>Your answer:</div>
                                                <div className='text-red-500'>{item.given}</div>
                                            </div>

                                            <div className='w-full flex gap-5'>
                                                <div className='text-gray-500 text-sm'>Correct answer:</div>
                                                <div className='text-green-500'>{item.correct}</div>
                                            </div>
                                        </div>
                                    ))
                                }

                                <div className='primary-btn'
                                     onClick={closeEverything}
                                >
                                    Ok
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            }

            {
                recToggle &&
                <motion.div {...fadeIn}
                    onClick={closeRec}
                    className='absolute top-0 left-0 w-full min-h-dvh bg-background/10 backdrop-blur-xs flex justify-center items-center p-10'
                >
                    <motion.div {...slideUp}
                        onClick={(e) => e.stopPropagation()}
                        className='w-full bg-background flex flex-col justify-center items-center border rounded-2xl gap-5 shadow-lg p-7'
                    >

                        <div className='w-full text-4xl flex items-center justify-center'>RESULT</div>

                        <div className='w-full p-5 bg-foreground/5 border rounded-2xl'>
                            <div className='w-full flex justify-between items-end'>
                                <div className='text-sm text-gray-500'>
                                    Grade
                                </div>

                                <div className='text-2xl'>
                                    {recData.grade}
                                </div>
                            </div>

                            <div className='w-full flex justify-between items-end'>
                                <div className='text-sm text-gray-500'>
                                    Correct Answers
                                </div>

                                <div className='text-2xl text-green-500'>
                                    {recData.correct}
                                </div>
                            </div>

                            <div className='w-full flex justify-between items-end'>
                                <div className='text-sm text-gray-500'>
                                    Wrong Answers
                                </div>

                                <div className='text-2xl text-red-500'>
                                    {recData.wrong}
                                </div>
                            </div>

                        </div>
                        <div className='w-full flex justify-between gap-5'>
                            <div className='secondary-btn w-full' onClick={closeRec}>Ok</div>
                            <div className='primary-btn w-full' onClick={openMistake}>My Errors</div>
                        </div>
                    </motion.div>
                </motion.div>
            }
        </div>
    )
}


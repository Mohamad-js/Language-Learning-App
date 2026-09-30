'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';
import Back from '@/components/backButton/back'
import { getAllQuizzes, saveQuizResult, resetQuizProgress  } from "@/lib/db";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import {  slideUp, fadeIn, expandParent, expandChild } from "@/lib/animations/entrance";
import { TbFaceIdError } from "react-icons/tb";
import { IoIosArrowBack } from 'react-icons/io';
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


    const retryQuiz = async (quizNumber) => {
        try {
            await resetQuizProgress(quizNumber)

            setQuiz(prevQuiz =>
                prevQuiz.map(item =>
                    item.quizNumber === quizNumber
                        ? { ...item, userAnswers: undefined }
                        : item
                )
            )

            toast.success('The Quiz Restarted.')
        } catch (error) {
            toast.error('Could not reset progress')
            console.error(error)
        }
    }


    const showQuiz = (item) => {
        if (item.quizData.multi.questions.length > 0) {
            if (!item.userAnswers) {
                setTargetQuiz(item)
                setToggleContent(true)
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

        const questions = targetQuiz.quizData.multi.questions

        const allAnswered = questions.every(
            (question) => answers[question.number] !== undefined
        )

        if (!allAnswered) {
            const unansweredQuestions = targetQuiz?.quizData?.multi?.questions
                ?.filter((question) => answers[question.number] === undefined)
                .map((question) => question.number) || []

            setErrorModal(true)

            setUnansweredItems(unansweredQuestions)

            return
        }


        const quizKeys = targetQuiz.quizData.multi.keys

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

    const openMistake = (item) => {
        setFinalWindow(false)
        setToggleMistake(true)
        setTargetQuiz(item)
        setFinalResults(item.userAnswers)
    }

    const closeEverything = () => {
        setFinalWindow(false)
        setToggleMistake(false)
        setToggleContent(false)
    }


    return (
        <div className='fixed w-full h-dvh bg-background flex flex-col'>

            {/*<div className='absolute top-0 w-full min-h-dvh'>*/}
            {/*    <Image*/}
            {/*        className='object-cover object-right dark:hidden'*/}
            {/*        src='/images/quiz/light.jpg'*/}
            {/*        alt='background image'*/}
            {/*        fill*/}
            {/*    />*/}
            {/*    <Image*/}
            {/*        className='object-cover object-right hidden dark:block'*/}
            {/*        src='/images/quiz/quiz-dark.jpg'*/}
            {/*        alt='background image'*/}
            {/*        fill*/}
            {/*    />*/}
            {/*</div>*/}

            { !toggleContent && !toggleMistake && <Back /> }

            <div className='w-full min-h-0 overflow-auto px-5 pt-15 pb-0 flex-1 relative flex flex-col gap-5'>
                <div className='w-full h-10 text-xl font-bold text-foreground'>Quiz Time</div>

                <motion.div
                    variants={expandParent}
                    initial='hidden'
                    animate='visible'

                    className='w-full min-h-0 overflow-auto flex flex-col gap-10 border rounded-t-4xl'
                >
                    {
                        quiz?.map((item, index) => (
                            <motion.div
                                variants={expandChild} key={index}
                                className={`relative w-full p-5 border rounded-4xl flex flex-col gap-5
                                
                                ${
                                    item.theme === 1 ? 'bg-[#F29191] dark:bg-[#800020]' 
                                    : 
                                    item.theme === 2 ? 'bg-[#B1E5E6] dark:bg-[#010736]' 
                                    : 
                                    item.theme === 3 ? 'bg-[#EEEAD7] dark:bg-[#123F36]' 
                                    :
                                    item.theme === 4 ? 'bg-[#F4EB6C] dark:bg-[#F2842F]'
                                    :
                                    item.theme === 5 ? 'bg-[#91AC67] dark:bg-[#597928]'
                                    :
                                    item.theme === 6 ? 'bg-[#AEB0C7] dark:bg-[#8E1EA2]'
                                    : 'bg-background'}
                                `}
                                 onClick={()=> showQuiz(item)}
                            >
                                <div className='w-full flex justify-between '>
                                    <div className='text-xs text-gray-700 dark:text-gray-300'>Quiz {item.quizNumber}</div>
                                    
                                    <div className='text-xs text-gray-700 dark:text-gray-300'>{item.quizLevel}</div>
                                </div>
                                
                                <div className=''>
                                    <div className='text-xl'>{item.quizTitle}</div>
                                    <div className='text-sm'>{item.featuring}</div>
                                </div>

                                {
                                    item.userAnswers ?

                                    <div className="flex items-center justify-end gap-3">
                                        <div
                                            onClick={() => retryQuiz(item.quizNumber)}
                                            className='text-sm font-semibold secondary-btn'
                                        >
                                            Restart
                                        </div>

                                        <div
                                            onClick={() => openMistake(item)}
                                            className='text-sm font-semibold primary-btn'
                                        >
                                            Report
                                        </div>
                                    </div>

                                    :

                                    <div className=" flex items-center justify-end gap-3">
                                        <div className='text-sm font-semibold'>Start</div>
                                        <GoArrowRight />
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
                        className='absolute inset-0 top-0 w-full h-dvh bg-background/10 flex flex-col backdrop-blur-xs pt-5 gap-2'
                    >
                        <div className='w-full flex justify-start items-center gap-2 pl-5'>
                            <div className='bg-background p-1 flex justify-center items-center rounded-full border shadow-lg'>
                                <IoIosArrowBack size={20} onClick={closeQuiz} />
                            </div>

                            <div className='flex gap-2 items-baseline'>
                                <div>Q {targetQuiz?.quizNumber}:</div>
                                <div>{targetQuiz.featuring}</div>
                            </div>
                        </div>

                        <motion.div {...slideUp}
                            onClick={(e) => e.stopPropagation()}
                            className='w-full h-full min-h-0 flex flex-col gap-5 p-5 bg-background rounded-2xl border shadow-lg'
                        >

                            <div className='relative w-full flex-1 min-h-0 overflow-hidden flex flex-col gap-3 items-center'>

                                <div className='relative w-full min-h-0 overflow-y-auto flex flex-col gap-10'>
                                    {
                                        targetQuiz?.quizData?.multi.questions?.map((quiz) => {

                                            const questionNumber = quiz.number
                                            
                                            return (
                                                <div key={questionNumber}
                                                    className='w-full pb-5 flex flex-col gap-3'
                                                >
                                                    <div className='relative flex gap-3'>
                                                        <div className='text-foreground/20'>{quiz.number}</div>
                                                        <div className=''>{quiz.question}</div>
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        {quiz.options.map((option, optionIndex) => (
                                                            <label
                                                                key={optionIndex}
                                                                className={`flex items-center gap-3 p-3 v border rounded-xl
                                                                ${answers[questionNumber] === option && "p-2 bg-purple-200"}`}
                                                            >
                                                                <input
                                                                    className="grid size-5 appearance-none place-content-center rounded-full border border-gray-400 bg-transparent before:size-2.5 before:scale-0 before:rounded-full before:bg-purple-500 before:transition-transform checked:border-purple-500 checked:before:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                                                                    type="radio"
                                                                    name={`question-${questionNumber}`}
                                                                    value={option}
                                                                    checked={answers[questionNumber] === option}
                                                                    onChange={() => handleAnswer(questionNumber, option)}
                                                                />

                                                                <span className='text-sm'>{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }



                                </div>
                            </div>

                            <div className='w-full bg-background pt-3'
                                 onClick={submitQuiz}
                            >
                                <button className='secondary-btn w-full'>DONE</button>
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
                            className='w-full bg-background p-5 text-center border rounded-2xl flex flex-col justify-center items-center gap-5'
                        >
                            <div className='text-gray-500'>
                                <TbFaceIdError size={50} />
                            </div>

                            <div className='text-lg'>Answer All Questions!</div>

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
                                <div className='secondary-btn w-full' onClick={closeFinalWindow}>Ok</div>
                                {
                                    finalResults.wrong > 0  &&
                                        <div className='primary-btn w-full' onClick={() => openMistake(targetQuiz)}>Report</div>
                                }
                            </div>
                        </div>
                    </div>
            }

            {
                toggleMistake &&
                <motion.div {...fadeIn}
                    onClick={closeEverything}
                    className='absolute inset-0 top-0 w-full h-dvh bg-background/10 flex flex-col gap-3 items-center justify-center backdrop-blur-xs p-5'
                >
                    <div className='w-full justify-start text-lg font-semibold text-grey-500'>Quiz {targetQuiz?.quizNumber} Report</div>

                    <motion.div {...slideUp}
                        onClick={(e) => e.stopPropagation()}
                        className='relative w-full min-h-0 flex items-center flex-col gap-3 p-5 bg-background rounded-xl border shadow-lg'
                    >
                        <div className='w-full flex-col pb-5'>
                            <div className='relative w-full flex justify-between'>
                                <div className='text-sm'>{finalResults.topic}</div>
                                
                                <IoCloseOutline size={25} onClick={closeEverything} />
                            </div>

                        </div>

                        <div className='relative w-full min-h-0 overflow-hidden flex flex-col gap-3 items-center'>

                            <div className='w-full flex justify-between'>
                                <div className='text-grey-500 text-xs'>Date</div>

                                <div className='text-bold text-xs'>
                                    {new Date(finalResults.date).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }).replace(/(\d+) (\w+) (\d+)/, '$1 of $2, $3')}
                                </div>
                            </div>
                            <div className='w-full flex justify-between'>
                                <div className='text-grey-500 text-xs'>Level</div>

                                <div className='text-bold text-xs'>
                                    {finalResults.quizLevel}
                                </div>
                            </div>

                            <div className='w-full flex justify-between'>
                                <div className='text-grey-500 text-xs'>Wrong</div>

                                <div className='text-bold text-xs'>
                                    {finalResults.wrong}
                                </div>
                            </div>

                            <div className='w-full flex justify-between'>
                                <div className='text-grey-500 text-xs'>Correct</div>

                                <div className='text-bold text-xs'>
                                    {finalResults.correct}
                                </div>
                            </div>

                            <div className='w-full flex justify-between'>
                                <div className='text-grey-500 text-xs'>Score</div>

                                <div className='text-bold text-xs'>
                                    {finalResults.score}
                                </div>
                            </div>

                        </div>


                        {
                            finalResults.failedQuestions.length > 0 &&
                            <div className='relative w-full flex-1 min-h-0 overflow-hidden  flex flex-col gap-3 items-center'>

                                <div className='text-gray-500 text-sm font-bold'>Report</div>

                                <div className='w-full min-h-0 overflow-y-auto flex flex-col gap-10 pb-20'>
                                    {
                                        finalResults?.failedQuestions?.map((item, index) => (
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
                                </div>
                            </div>
                        }

                    </motion.div>

                </motion.div>
            }

        </div>
    )
}


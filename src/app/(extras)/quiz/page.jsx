'use client'
import { useState, useEffect } from "react";
import Back from '@/components/backButton/back'
import { getAllQuizzes, saveQuizResult, resetQuizProgress, saveQuizProgress  } from "@/lib/db";
import { GoArrowRight } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { FaTimes, FaArrowCircleRight } from "react-icons/fa";
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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isChecked, setIsChecked] = useState(false)


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

    // Current Displaying Question's Data
    const questions = targetQuiz?.quizData?.multi?.questions ?? []
    const currentQuestion = questions[currentQuestionIndex]
    const currentQuestionNumber = currentQuestion?.number
    const selectedAnswer = answers[currentQuestionNumber]
    const correctAnswer = targetQuiz?.quizData?.multi?.keys?.[currentQuestionNumber]
    const isLastQuestion = currentQuestionIndex === questions.length - 1
    const isCorrect = selectedAnswer === correctAnswer


    const retryQuiz = async (quizNumber) => {
        try {
            await resetQuizProgress(quizNumber)

            setQuiz(prevQuiz =>
                prevQuiz.map(item =>
                    item.quizNumber === quizNumber
                        ? { ...item, userAnswers: undefined, draftAnswers: undefined }
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
                // See the first unanswered question after coming back
                const draftAnswers = item.draftAnswers || {}
                const firstUnansweredIndex = item.quizData.multi.questions.findIndex(
                    (question) => draftAnswers[question.number] === undefined
                )

                setAnswers(draftAnswers)
                setCurrentQuestionIndex(
                    firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex
                )
                setIsChecked(false)
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

    const handleAnswer = (questionNumber, option) => {
        if (isChecked) return

        const updated = { ...answers, [questionNumber]: option }
        setAnswers(updated)

        if (!targetQuiz) return

        saveQuizProgress(targetQuiz.quizNumber, updated)
            .then(() => {
                setQuiz(prevQuiz =>
                    prevQuiz.map(item =>
                        item.quizNumber === targetQuiz.quizNumber
                            ? { ...item, draftAnswers: updated }
                            : item
                    )
                )
            })
            .catch(error => console.error('Failed to save progress:', error))
    }

    const handleCheckOrNext = async () => {
        if (!currentQuestion || !targetQuiz) return

        if (!isChecked) {
            if (selectedAnswer === undefined) {
                toast.error('Choose an answer first.')
                return
            }

            setIsChecked(true)
            return
        }

        if (isLastQuestion) {
            await submitQuiz()
            return
        }

        setCurrentQuestionIndex((index) => index + 1)
        setIsChecked(false)
    }


    const submitQuiz = async () => {
        if (!targetQuiz) return

        const questions = targetQuiz.quizData.multi.questions

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
                        ? { ...item, userAnswers: userAnswers, draftAnswers: undefined }
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
                                className={`relative w-full min-h-50 p-5 border rounded-4xl flex flex-col gap-5 justify-between
                                
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
                                    item.userAnswers ? (
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
                                    ) : (
                                        <div className='w-full flex flex-col gap-2'>
                                            {
                                                (() => {
                                                    const total = item?.quizData?.multi?.questions?.length
                                                    const answered = Object.keys(item.draftAnswers || {}).length

                                                    return total > 0 && answered > 0 ? (
                                                        <div className='w-full flex flex-col gap-1'>
                                                            <div className='w-full h-0.5 bg-foreground/10 rounded-full overflow-hidden'>
                                                                <div
                                                                    className='h-full bg-foreground rounded-full transition-all'
                                                                    style={{ width: `${(answered / total) * 100}%` }}
                                                                />
                                                            </div>
                                                            <div className='text-xs text-gray-700 dark:text-gray-300'>
                                                                {answered} /{total} answered
                                                            </div>
                                                        </div>
                                                    ) : null
                                                })()
                                            }

                                            <div className="flex items-center justify-end gap-3">
                                                <div className='text-sm font-semibold'>{item.draftAnswers ? 'Continue' : 'Start'}</div>
                                                <GoArrowRight />
                                            </div>
                                        </div>
                                    )
                                }

                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>

            {
                toggleContent &&
                    <motion.div {...fadeIn}
                        className='absolute inset-0 top-0 w-full h-dvh bg-background flex flex-col p-5 gap-5'
                    >
                        <div className='w-full flex justify-start items-center gap-2'>
                            <div className='bg-background p-1 flex justify-center items-center rounded-full border shadow-lg'>
                                <IoIosArrowBack size={20} onClick={closeQuiz} />
                            </div>

                            <div>Quiz {targetQuiz?.quizNumber}</div>

                        </div>

                        <motion.div
                            {...slideUp}
                            onClick={(e) => e.stopPropagation()}
                            className='w-full h-full min-h-0 flex flex-col gap-10 p-5 rounded-2xl border shadow-sm'
                        >
                            {
                                (() => {
                                    const total = targetQuiz?.quizData?.multi?.questions?.length ?? 0
                                    const answered = Object.keys(answers).length
                                    const currentPosition = currentQuestionIndex + 1

                                    return total > 0 ? (
                                        <div className='w-full flex flex-col gap-5'>
                                            <div className='w-full flex justify-between items-center'>
                                                <div className='text-gray-500'>{targetQuiz.featuring}</div>
                                                <div className='text-xs'>{currentPosition} of {total}</div>
                                            </div>

                                            <div className='w-full h-5 bg-foreground/10 rounded-full overflow-hidden'>
                                                <motion.div
                                                    className='h-full bg-foreground rounded-full transition-all'
                                                    initial={false}
                                                    animate={{ width: `${(answered / total) * 100}%` }}
                                                    transition={{ duration: 0.45, ease: 'easeOut' }}
                                                />
                                            </div>
                                        </div>
                                    ) : null
                                })()
                            }

                            <div className='relative w-full h-full flex flex-col gap-3'>
                                {currentQuestion && (
                                    <div className='relative h-full'>
                                        <div className='relative flex gap-3 mb-5'>
                                            <div className='text-foreground/20 text-lg font-semibold'>
                                                {currentQuestion.number}
                                            </div>

                                            <div className='text-lg font-semibold'>{currentQuestion.question}</div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            {currentQuestion.options.map((option, optionIndex) => {
                                                const isSelected = selectedAnswer === option
                                                const isThisCorrectAnswer = correctAnswer === option

                                                const feedbackClass = isChecked
                                                    ? isThisCorrectAnswer
                                                        ? 'border-green-500 bg-green-100 text-green-900'
                                                        : isSelected
                                                            ? 'border-red-500 bg-red-100 text-red-900'
                                                            : ''
                                                    : isSelected
                                                        ? 'border-gray-100 bg-gray-100'
                                                        : ''

                                                return (
                                                    <label
                                                        key={optionIndex}
                                                        className={`flex items-center gap-3 p-3 border rounded-xl ${feedbackClass}`}
                                                    >
                                                        <input
                                                            className="grid size-5 appearance-none place-content-center rounded-full border border-gray-400 bg-transparent before:size-2.5 before:scale-0 before:rounded-full before:bg-gray-500 before:transition-transform checked:border-gray-500 checked:before:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                                                            type="radio"
                                                            name={`question-${currentQuestion.number}`}
                                                            value={option}
                                                            checked={isSelected}
                                                            disabled={isChecked}
                                                            onChange={() =>
                                                                handleAnswer(currentQuestion.number, option)
                                                            }
                                                        />

                                                        <span className='text-md'>{option}</span>
                                                    </label>
                                                )
                                            })}
                                        </div>

                                        {
                                            isChecked &&
                                            <div
                                                className={`absolute bottom-0 w-full rounded-xl p-3 text-sm ${
                                                    isCorrect
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-red-500 text-white'
                                                }`}
                                            >
                                                {
                                                    isCorrect ?
                                                    <div className='w-full flex gap-2 items-center'>
                                                        <TiTick size={35} />
                                                        <div className='text-2xl font-bold'>CORRECT</div>
                                                    </div>
                                                    :
                                                    <div className=''>
                                                        <div className='w-full flex gap-3 items-start flex-col'>
                                                            <div className='flex gap-3'>
                                                                <FaTimes size={25} />
                                                                <div className='text-xl font-bold'>WRONG</div>
                                                            </div>
                                                            <div className='text-lg flex gap-3 items-center'>
                                                                <FaArrowCircleRight size={20} />
                                                                {currentQuestion.hint}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        <button
                            className='primary-btn w-full'
                            onClick={handleCheckOrNext}
                        >
                            {!isChecked
                                ? 'CHECK'
                                : isLastQuestion
                                    ? 'FINISH'
                                    : 'NEXT'}
                        </button>
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


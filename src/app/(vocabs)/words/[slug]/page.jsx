'use client';
import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './slug.module.css';
import { PiDotsThreeVertical } from "react-icons/pi";
import { BsArrowRepeat } from "react-icons/bs";
import Confetti from "@/components/confetti/confetti";
import { RxSpeakerLoud } from "react-icons/rx";
import Wait from '@/components/wait/wait';
import Audio from '@/components/audio/audio';
import { toast } from 'sonner';
import { getLessonByNumber, updateInteractionStatus} from '@/lib/db';
import { useLoading } from '@/components/LoadingProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, lessonCompleteAnimation, expand } from '@/lib/animations/entrance';
import { useNavigation } from '@/app/context/NavigationProvider';
import { useAnimate } from 'framer-motion';
import { useClickSound } from '@/components/sound';
import SemanticOrbit from '@/components/SemanticOrbit';
import DictationExercise from '@/components/DictationExercise';
import AnimatedAuroraBackground from '@/components/Iridescence/iridescence';
import { useSettings } from '@/app/context/SettingsProvider';




export default function Lessons({ params }) {
   const { settings } = useSettings()
   const { active } = useNavigation()
   const { audioRef, play } = useClickSound()
   const { startLoading } = useLoading();
   const [scope, animate] = useAnimate()

   
   const [specificLessonWords, setSpecificLessonWords] = useState(null)
   const [isLoading2, setIsLoading2] = useState(true);

   const [currentWordIndex, setCurrentWordIndex] = useState(0)
   const [learningWordIndex, setLearningWordIndex] = useState(0)
   const [stage, setStage] = useState('assessment')
   const [knownWords, setKnownWords] = useState([]);
   const [unknownWords, setUnknownWords] = useState([]);
   const [finalWindow, setFinalWindow] = useState(false)
   const [lessonNumber, setLessonNumber] = useState(null)
   const [close, setClose] = useState(false)
   const [appear, setAppear] = useState(false)
   const [fade, setFade] = useState(false)
   const [show, setShow] = useState(false)
   const [excellent, setExcellent] = useState(false)
   const [totalWordsCount, setTotalWordsCount] = useState(null)
   const [showConfetti, setShowConfetti] = useState(false)
   const [showCongrats, setShowCongrats] = useState(false)
   const [btnPressed, setBtnPressed] = useState(null)
   const [category, setCategory] = useState(null)
   const [practice, setPractice] = useState(null)
   const [practice2, setPractice2] = useState(null)
   const [skipPractice, setSkipPractice] = useState(false)
   
   const [currentCardIndex, setCurrentCardIndex] = useState(0);
   const [counter, setCounter] = useState(0);
   const [isSwiping, setIsSwiping] = useState(false);
   const [isSwiped, setIsSwiped] = useState(false);
   const [startX, setStartX] = useState(0);
   const [translateX, setTranslateX] = useState(0);
   const [swipeDirection, setSwipeDirection] = useState(null);
   const cardRef = useRef(null);

   const audioRefAmE = useRef(null);
   const audioRefBrE = useRef(null);
   const [isPlayingBrE, setIsPlayingBrE] = useState(false);
   const [isPlayingAmE, setIsPlayingAmE] = useState(false);
   const [hasPlayedFinishSound, setHasPlayedFinishSound] = useState(false);
   
   
   const { slug } = use(params)

   const [debugInfo,setDebugInfo] = useState(null)


   useEffect(() => {
      if (finalWindow && !hasPlayedFinishSound) {
         play();
         setHasPlayedFinishSound(true); // Lock the latch so it can't play again
      } else if (!finalWindow) {
         // Reset the latch automatically if they restart or close the window
         setHasPlayedFinishSound(false);
      }
   }, [finalWindow, play, hasPlayedFinishSound]);
      
   
   useEffect(() => {
      if (!slug) return
      setLessonNumber(Number(slug))

      const requestedLevel = 
      active === 0 ? 'A1' : 
      active === 1 ? 'A2' :
      active === 2 ? 'B1' :
      active === 3 ? 'B2' :
      active === 4 ? 'C1' :
      active === 5 ? 'C2' : ''
      
      const loadLesson = async () => {
         try {
            setDebugInfo(`Fetching: Level=${requestedLevel}, Slug=${slug}`);
            const data = await getLessonByNumber(requestedLevel, slug);
            setSpecificLessonWords(data.words);
            setCategory(data.category);
            setPractice(data.practice);
            setPractice2(data.dictation);
            setDebugInfo("Data successfully loaded into state!");

            if (!data) {
               setDebugInfo(`DB returned nothing for Level=${requestedLevel}, Slug=${slug}`);
               return;
            }


         } catch (error) {
            setDebugInfo(`DB Error: ${error.message}`);
            console.error("Failed to fetch words:", error);
         }
      };

      loadLesson();
   }, [slug]);
   
   
   const router = useRouter()

   const done = () => {
      try {
         save()

         // if(totalWordsCount % 100 === 0){
         //    animation()
         //    setBtnPressed('done')
         // } else {
         //    router.push('/a1')
         // }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const nextLesson = () => {
      try {
         save()

         if(totalWordsCount % 100 === 0){
            animation()
            setBtnPressed('nextLesson')
         } else {
            router.push(`/a1/${lessonNumber + 1}`)
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const nextLevel = () => {
      try {
         save()

         if(totalWordsCount % 100 === 0){
            animation()
            setBtnPressed('nextLevel')
         } else {
            router.push('/a2')
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   // const closeCongrats = () => {
   //    setShowCongrats(false)
   //    setAnime(false)
   //    save()

   //    btnPressed === 'done' ? router.push('/a1') :
   //    btnPressed === 'nextLesson' ? router.push(`/a1/${lessonNumber + 1}`) :
   //    btnPressed === 'nextLevel' ? router.push('/a2') : console.log('PROBLEM')
   // }


   const saveProgress = async (msg) => {

      const requestedLevel = 
         active === 0 ? 'A1' : 
         active === 1 ? 'A2' :
         active === 2 ? 'B1' :
         active === 3 ? 'B2' :
         active === 4 ? 'C1' :
         active === 5 ? 'C2' : ''

      try {
         await toast.promise(
            updateInteractionStatus({
               level: requestedLevel,
               lesson: lessonNumber,
               knownWords,
               unknownWords
            }),
            {
               loading: 'Saving progress...',

               success: () => {
                  return 'Progress saved!';
               },

               error: (error) => error.message
            }
         )


         startLoading()


         if (msg === 'save'){
            router.push('/words')
            
         } else if(msg === 'nextLesson'){
            router.push(`/words/${lessonNumber + 1}`)
            
         } else {
            router.push('/words')
         }

      } catch (error){
         console.error('Error in updating the bd status:', error)
      }
   }

   const animation = () => {
      setShowCongrats(true)
      setTimeout(() => setShowConfetti(true), 500)
      setTimeout(() => setAnime(true), 500)
      setTimeout(() => setShowConfetti(false), 3000)
   }

   useEffect(() => {
      setIsLoading2(true);
   }, [learningWordIndex]);


   
   const learningWords = [...unknownWords];


   const handleNextLearningWord = () => {
      if (learningWordIndex + 1 < learningWords.length && (!isPlayingBrE && !isPlayingAmE)) {
         setLearningWordIndex(learningWordIndex + 1);
      } else if(learningWordIndex + 1 == learningWords.length && (!isPlayingBrE && !isPlayingAmE)) {
         setFinalWindow(true)
      } 
   };
   
   const handleBackLearningWord = () => {
      if (learningWordIndex - 1 >= 0 && (!isPlayingBrE && !isPlayingAmE)) {
         setLearningWordIndex(learningWordIndex - 1);
         setFinalWindow(false)

      } else if(!isPlayingBrE && !isPlayingAmE) {
         alert('This is the first word');
      }
   };

   const restartLearning = () => {
      setLearningWordIndex(0)
      setFinalWindow(false)
      setStage('learning')
      setSkipPractice(true)
   }


   const wholeLessons = 45

   const handleTouchStart = (e) => {
      if (isSwiped) return; // Prevent interaction during swipe animation
      setStartX(e.touches[0].clientX);
      setIsSwiping(true);
   };

   const handleTouchMove = (e) => {
      if (!isSwiping || isSwiped) return;
      const currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      setTranslateX(diffX);
      setSwipeDirection(diffX > 0 ? 'right' : 'left');
   };

   const handleTouchEnd = () => {
      if (!isSwiping || isSwiped) return;
      setIsSwiping(false);

      const threshold = 30; // pixels
      if (translateX > threshold || translateX < -threshold) {
         setIsSwiped(true);
         const direction = translateX > threshold ? 'right' : 'left';
         handleSwipe(direction);

      } else {
         setTranslateX(0);
         setSwipeDirection(null);
      }
   };

   const handleSwipe = (direction) => {
      
      if(direction === 'right'){
         setTranslateX(1000)
         handleAnswer('known')
      } else {
         setTranslateX(-1000)
         handleAnswer('unknown')
      }

      setTimeout(() => {
         setTranslateX(0);
         setSwipeDirection(null);
         setIsSwiped(false);
         setCurrentCardIndex((prev) => (prev + 1 < specificLessonWords.length ? prev + 1 : 0));
      }, 400); // Match CSS transition duration
   };

   const handleAnswer = (status) => {
      const currentWord = specificLessonWords[currentWordIndex];

      if (status === 'known') {
         setKnownWords([...knownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'A1' }]);

      } else if (status === 'unknown') {
         setUnknownWords([...unknownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'A1' }]);
      }

      if (currentWordIndex + 1 < specificLessonWords.length) {
         const progressPercentage = 100 / specificLessonWords.length
         setCounter(prev => prev + Number(progressPercentage.toFixed(0)))

         setCurrentWordIndex(currentWordIndex + 1);
      } else {
         setCounter(100)

         const willHaveUnknownWords = status === 'unknown' ? true : unknownWords.length > 0;

         if (willHaveUnknownWords) {
            setClose(true);
               
            setTimeout(() => {
               setStage('shiftMsg');
            }, 500);
               
            setTimeout(() => {
               setAppear(true);
            }, 600);

            setTimeout(() => {
               setAppear(false);
            }, 4000);

            setTimeout(() => {
               setStage('learning');
            }, 4500);

            setTimeout(() => {
               setFade(true);
            }, 5000);

         } else {
            setTimeout(() => {
               setExcellent(true)
            }, 500);

            setTimeout(() => {
               setShow(true);
            }, 600);
         }
      }
   };
   

   if (!specificLessonWords || specificLessonWords.length === 0) {
      return <div className='w-screen min-h-dvh flex items-center justify-center'>No flashcards available</div>;
   }

   const visibleCards = [];
   for (let i = 0; i < Math.min(3, specificLessonWords.length - currentCardIndex); i++) {
      visibleCards.push(specificLessonWords[(currentCardIndex + i) % specificLessonWords.length]);
   }


   const handleImageLoad2 = () => {
      setIsLoading2(false);
   };

   const startOver = () => {
      setCurrentWordIndex(0);
      setCurrentCardIndex(0);
      setCounter(0);

      setKnownWords([]);
      setUnknownWords([]);
   }

   const copyDef = (def) => {
      navigator.clipboard.writeText(def)

      toast(
         <div className={styles.toastHolder}>
            The Definition Copied to Clipboard
         </div>
         ,
         {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
            closeButton: false,
         }
      )
   }


   const playAudioBrE = () => {
      const audio = audioRefBrE.current
      if (audio) {
         const promise = audio.play();
         audio.currentTime = 0

         if (promise !== undefined) {
            promise
               .then(() => setIsPlayingBrE(true))
               .catch((error) => {
                  console.error('Audio play failed:', error);
               });
         }
      }
   };

   const playAudioAmE = () => {
      const audio = audioRefAmE.current
      if (audio) {
         const promise = audio.play();
         audio.currentTime = 0

         if (promise !== undefined) {
            promise
               .then(() => setIsPlayingAmE(true))
               .catch((error) => {
                  console.error('Audio play failed:', error);
               });
         }
      }
   };

   const pauseAudioBrE = () => {
      if (audioRefBrE.current) {
         audioRefBrE.current.pause();
         setIsPlayingBrE(false);
      }
   };

   const pauseAudioAmE = () => {
      if (audioRefAmE.current) {
         audioRefAmE.current.pause();
         setIsPlayingAmE(false);
      }
   };

   // Skip Assessment (Learn All)
   const skipAssessment = () => {
      const allWords = specificLessonWords.map(word => ({
         word,
         type: 'unknown',
         lesson: lessonNumber,
         level: 'A1'
      }));

      setUnknownWords(allWords);
      setCounter(100);

      setTimeout(() => {
         setStage('learning');
         setFade(true);
      }, 200);
   };

   return (
      <div className='min-w-screen min-h-dvh bg-background'>

         <audio
            ref={audioRef}
            src="/sounds/Done.mp3"
            preload="auto"
         />

         <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-lg z-2 bg-background text-xs border">
            <div className='text-gray-400 font-semibold'>Lesson {lessonNumber}: </div>
            <div className="">{category}</div>
         </div>

         {stage === 'assessment' && (

         <div className={`${close && 'opacity-0 transition-all transition-0.5'} w-full h-dvh p-10 flex flex-col items-center justify-around touch-pan-y bg-linear-to-tr from-[#4BC0C8] via-[#C779D0] to-[#FEAC5E] z-1`}>

            <div className='dark:block hidden fixed top-0 left-0 bg-black/40 w-full min-h-dvh z-1'></div>

            <div className='w-full z-1 text-foreground'>
               <h2 className='text-center font-bold'>Knowledge Check</h2>
               <p className='text-center'>Swipe right if you know the word.</p>
               <p className='text-center'>Swipe left if you need to learn the word.</p>
            </div>

           <div className='relative w-dvw h-80 flex items-center justify-center overflow-hidden'>
               {
               visibleCards.map((card, index) => (
                  <div
                     key={`${card.word}-${(currentCardIndex + index) % specificLessonWords.length}`}

                     ref={index === 0 ? cardRef : null}

                     className={`absolute rounded-4xl w-[80vw] h-full bg-gray-300 flex items-center justify-center p-10 ${
                     index === 0 && isSwiping ? 'transition-none' : 'transition-all'
                     } 
                     
                     ${index == 0 ? 'z-3' : index == 1 ? 'z-2 translate-y-2.5 scale-95' : index == 2 ? 'z-1 translate-y-5 scale-90' : ''}`}

                     style={
                     index === 0
                        ? {
                           transform: `translateX(${translateX}px)`,
                           backgroundColor:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'green'
                                 : swipeDirection === 'left'
                                 ? 'red'
                                 : '' : ''
                           }
                        : {}
                     }

                     onTouchStart={index === 0 ? handleTouchStart : undefined}
                     onTouchMove={index === 0 ? handleTouchMove : undefined}
                     onTouchEnd={index === 0 ? handleTouchEnd : undefined}
                  >
                     <div className='text-center h-full flex items-center justify-evenly flex-col text-black'>
                        <h2 className='text-4xl'
                        style={
                        index === 0
                        ? {
                           color:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'white'
                                 : swipeDirection === 'left'
                                 ? 'white'
                                 : ''
                                 : '',
                           }
                        : {}}
                        >{card.word}</h2>

                        <h3 className='text-black'
                        style={
                        index === 0
                        ? {
                           color:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'white'
                                 : swipeDirection === 'left'
                                 ? 'white'
                                 : ''
                                 : '',
                           }
                        : {}}
                        >{card.role}</h3>

                        <p className='text-black'
                        style={
                        index === 0
                        ? {
                           color:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'white'
                                 : swipeDirection === 'left'
                                 ? 'white'
                                 : ''
                                 : '',
                           }
                        : {}}
                        >{card.definition}</p>

                     </div>
                  </div>
               ))}

            </div>
            <div className='h-10 w-full z-1'>
               <div className='text-foreground/60'>{counter} %</div>
               <div className='h-5 bg-foreground/10 rounded-2xl'>
                  <div className='bg-foreground/50 h-full rounded-2xl transition-all'
                     style={{width: counter + '%'}}
                  ></div>
               </div>
            </div>

            <div className="w-full flex items-center justify-end gap-2">
               <button className='w-15 h-15 text-foreground bg-foreground/20 border border-foreground/40 rounded-[50%] active:bg-foreground active:text-background z-1 flex items-center justify-center' onClick={startOver}>
                  <BsArrowRepeat size={30} />
               </button>

               <button
                  className='w-15 h-15 bg-foreground/20 border border-foreground/40 text-foreground rounded-[50%] active:bg-foreground active:text-background z-1'
                  onClick={skipAssessment}
               >
                  Skip
               </button>
            </div>


            {
               excellent && (
                  <div className='absolute w-full h-dvh p-25 top-0 bg-background/10 backdrop-blur-lg flex items-center justify-center flex-col z-3 gap-3'>
                     <div className={`relative text-xl transition-all duration-400 text-black ${show ? 'top-0 opacity-100' : 'top-10 opacity-0'}`}>All done. Brilliant :)</div>
                     <div className='w-full flex flex-col gap-3'>
                        <button className='flex-1 py-2 bg-background/60 rounded-2xl active:bg-background' onClick={() => saveProgress('save')}>Save</button>
                        {
                           lessonNumber < wholeLessons &&
                           <button className='flex-1 py-2 bg-background/60 rounded-2xl active:bg-background' onClick={() => saveProgress('nextLesson')}>Next Lesson</button>
                        }
                     </div>
                  </div>
               )
            }
         </div>
            
         )}

         {
            stage === 'shiftMsg' && (
               <div className='absolute w-full h-dvh top-0 flex items-center justify-center'>
                  <div className={`relative opacity-0 transition-all duration-500 ease-out text-foreground text-xl ${appear ? 'top-0 opacity-100' : 'top-10 opacity-0'}`}>Time to Learn the New Words</div>
               </div>
            )
         }

   
         {stage === 'learning' && (
         <div className={`absolute w-full h-full top-0 p-5 pt-15 overflow-hidden flex items-center justify-start flex-col`}
         >
            <AnimatedAuroraBackground />

            {(() => {
               const learningWords = [...unknownWords];
               const ws = learningWords[learningWordIndex];
               

               return (
               <>
                  <div className='w-full h-dvh flex flex-col justify-start items-start gap-3 overflow-auto'>

                     <div className='relative w-full min-h-75 compact:min-h-65 super-compact:min-h-50 overflow-hidden rounded-2xl'>

                        <Image className='object-cover'
                           src={`/images/a1/${ws.word.word}.png`}
                           fill
                           alt='Word Pic'
                           onLoad={handleImageLoad2}
                        />

                        {
                           isLoading2 &&
                              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                 <Wait />
                              </div>
                        }

                        
                        <div className="absolute bottom-0 w-full flex items-center justify-between p-4">
                           <div className='absolute left-0 bottom-0 w-full h-20 z-0 bg-linear-to-t from-black to-transparent'></div>

                           <div className="flex items-end gap-3">
                              <p className='text-white leading-5 text-4xl z-1'>
                                 {ws.word.word}
                              </p>

                              <div className='text-white text-center leading-2 z-1'>
                                 {ws.word.role}
                              </div>
                           </div>

                           <div className='absolute right-0 bottom-3 text-white z-1'>
                              <PiDotsThreeVertical size={35} />
                           </div>
                        </div>

                     </div>

                     <div className="relative w-full h-full">
                        <AnimatePresence mode='wait'>
                           <motion.div
                              className='relative w-full h-full flex flex-col gap-3 compact:gap-1 super-compact:gap-1'
                              key={learningWordIndex}
                              initial={{
                                 opacity: 0,
                                 scale: 0.95
                              }}
                              animate={{
                                 opacity: 1,
                                 scale: 1
                              }}
                              exit={{
                                 opacity: 0,
                                 scale: 0.95
                              }}
                              transition={{
                                 type: "spring",
                                 stiffness: 500,
                                 damping: 50,
                              }}
                           >
                              <div className='w-full flex flex-col items-start z-1'>
                                 <div className='w-full gap-5 flex items-center justify-center'>
                                    <div className={`w-full p-4 super-compact:p-2 rounded-2xl flex justify-between items-center bg-background/50 active:bg-background ${isPlayingAmE ? 'bg-background' : ''}`}
                                       onClick={isPlayingAmE ? pauseAudioAmE : playAudioAmE}
                                    >
                                       <audio
                                          ref={audioRefAmE}
                                          src={`/sounds/A1/${ws.word.word}-AmE.mp3`}
                                          onEnded={() => setIsPlayingAmE(false)}
                                       />

                                       {ws.word.AmE}

                                       {
                                          isPlayingAmE ?
                                          <Audio />
                                          :
                                          <RxSpeakerLoud style={{color: '#b8b8b8', fontSize: '20px'}}/>
                                       }
                                    
                                    </div>

                                    <div className={`w-full p-4 super-compact:p-2 rounded-2xl flex justify-between items-center bg-background/50 active:bg-background ${isPlayingBrE ? 'bg-background' : {}}`}
                                       onClick={isPlayingBrE ? pauseAudioBrE : playAudioBrE}
                                    >
                                       <audio
                                          ref={audioRefBrE}
                                          src={`/sounds/A1/${ws.word.word}-BrE.mp3`}
                                          onEnded={() => setIsPlayingBrE(false)}
                                       />

                                       {ws.word.BrE}

                                       {
                                          isPlayingBrE ?
                                          <Audio />
                                          :
                                          <RxSpeakerLoud style={{color: '#b8b8b8', fontSize: '20px'}}/>
                                       }
                                    </div>
                                 </div>
                              </div>

                              <div className='w-full flex items-center bg-background/50 p-4 super-compact:p-2 z-1 rounded-2xl'
                                 onClick={() => copyDef(ws.word.definition)}   
                              >{ws.word.definition}</div>

                              <div className='w-full bg-background/50 rounded-2xl p-4 super-compact:p-2 z-1'
                              >
                                 <ul className='w-full flex flex-col gap-5'>
                                    {
                                       ws.word.examples.map((example, i) => (
                                          <div key={i} className="flex flex-col">
                                             <li className='font-bold'>{example.collocation}</li>
                                             <h3>{example.example}</h3>
                                          </div>
                                    ))}
                                 </ul>
                              </div>

                           </motion.div>
                        </AnimatePresence>
                     </div>



                     <div className='w-full h-15 flex items-center justify-center gap-3 left-0 z-1'>
                        <button
                           className='p-2 flex-1 bg-background rounded-xl active:scale-95 shadow-xl active:shadow-none'
                           onClick = {handleBackLearningWord}
                        >
                           Back
                        </button>

                        {
                           learningWordIndex + 1 == learningWords.length ?

                              settings.activatePractice ?

                                 <button
                                    onClick={() => setStage('practice')}
                                    className="p-2 flex-1 bg-background rounded-xl active:scale-95 shadow-xl active:shadow-none"
                                 >
                                    Practice
                                 </button>
                              :
                                 <button
                                    onClick={() => setFinalWindow(true)}
                                    className="p-2 flex-1 bg-background rounded-xl active:scale-95 shadow-xl active:shadow-none"
                                 >
                                    Done
                                 </button>


                           :
                              <button
                                 className='p-2 flex-1 bg-background rounded-xl active:scale-95 shadow-xl active:shadow-none'
                                 onClick={handleNextLearningWord}
                              >
                                 Next
                              </button>
                        }
                     </div>                     
                  </div>
               </>
               );
               
            })()}
         </div>
         )}

      {
         finalWindow &&
            <motion.div 
               {...fadeIn}
               onAnimationComplete={() => {
                  lessonCompleteAnimation(animate);
               }}
               className='absolute top-0 w-full h-dvh bg-background/40 backdrop-blur-lg flex flex-col items-center justify-center left-0 p-5 gap-1 z-3'
            >
               <div
                  ref={scope}
                  className="text-bold text-2xl mb-5 flex gap-3"
               >
                  <div className="text-2xl sentence left opacity-0">LESSON</div>
                  <div
                     className="text-2xl sentence number opacity-0"
                  >{lessonNumber}</div>

                  <div className="text-2xl sentence right opacity-0">FINISHED</div>
               </div>

               <div className="w-full flex gap-2 justify-center">

                  <motion.button
                     {...expand({delay: 1.5})}
                     className='py-2 w-25 bg-background rounded-xl active:scale-95'
                     onClick={restartLearning}
                  >
                     Review
                  </motion.button>

                  {
                     lessonNumber < wholeLessons &&
                        <motion.button
                           {...expand({delay: 1.6})}
                           className='py-2 w-25 bg-background rounded-xl active:scale-95'
                           onClick={() => saveProgress('nextLesson')}
                        >Lesson {lessonNumber + 1}</motion.button>
                  }

                  <motion.button
                     {...expand({delay: 1.7})}
                     className='py-2 w-25 bg-background rounded-xl active:scale-95'
                     onClick={() => saveProgress('save')}
                  >Save</motion.button>

               </div>

                     

            </motion.div>

      }

      {
         stage === 'practice' && (() => {
            return (
               <div className="fixed top-0 left-0 z-1 w-full min-h-dvh bg-background flex flex-col items-center justify-center p-5 text-center">
                  {practice ? (
                     <SemanticOrbit
                        lessonData={practice}
                        onStepOneFinished={setStage}
                        skipPractice={skipPractice}
                        saveProgress={saveProgress}
                     />
                  ) : (
                     <div className="text-foreground text-sm">
                        <p className="font-bold text-red-500 mb-2">PRACTICE NOT LOADED</p>
                        <p className="bg-foreground/10 p-3 rounded-lg border border-foreground/20">{debugInfo}</p>
                     </div>
                  )}
               </div>
            );
         })()
      }

      {
         stage === 'practice2' && (() => {

            return (
               <div className="fixed top-0 left-0 z-1 w-full min-h-dvh bg-background flex items-center justify-center">
                  {
                     practice2 ?
                        <DictationExercise
                           dictationData = {practice2}
                           onStepTwoFinished = {setFinalWindow}
                           skipPractice={skipPractice}
                           saveProgress={saveProgress}
                        />
                     :
                     'NOT LOADED'
                  }
               </div>
            );
         })()
      }

      {
         showCongrats &&
         <>
            showConfetti ? <Confetti /> : null
            <div className={styles.congratsHolder}>

               <div className={`${styles.msgHolder} ${anime && styles.showCongrats}`}>
                  <Image
                     className={styles.background}
                     src="/images/back/congrats.jpg"
                     alt=""
                     fill
                  />
               
                  <div className={styles.congrats}>Congrats!</div>

                  <div className={styles.textHolder}>
                     <div className={styles.text}>You have learned</div>
                     <div className={styles.count}>{totalWordsCount}</div>
                     <div className={styles.text}>words successfully.</div>
                  </div>

                  <div className={styles.continue} onClick={closeCongrats}>Continue</div>
               </div>
            </div>
         </> 
      }




      </div>
   );
}

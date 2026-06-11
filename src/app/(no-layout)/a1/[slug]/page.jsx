'use client';
import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './slug.module.css';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6"
import { BsArrowRepeat } from "react-icons/bs";
import Confetti from "@/components/confetti/confetti";
import { useTheme } from "@/components/context/ThemeContext";
import { RxSpeakerLoud } from "react-icons/rx";
import Wait from '@/components/wait/wait';
import Audio from '@/components/audio/audio';
import { toast, Slide } from 'react-toastify';
import { getWordsByLesson, updateInteractionStatus} from '@/lib/db';
import { useLoading } from '@/components/LoadingProvider';


export default function Lessons({ params }) {
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;
   const { stopLoading, startLoading } = useLoading();

   const [specificLessonWords, setSpecificLessonWords] = useState(null)
   const [isLoading, setIsLoading] = useState(true);
   const [isLoading2, setIsLoading2] = useState(true);
   const [loadedImages2, setLoadedImages2] = useState(0);
   const totalImages2 = 1;

   const [currentWordIndex, setCurrentWordIndex] = useState(0)
   const [learningWordIndex, setLearningWordIndex] = useState(0)
   const [stage, setStage] = useState('assessment')
   const [knownWords, setKnownWords] = useState([]);
   const [unknownWords, setUnknownWords] = useState([]);
   const [finalWindow, setFinalWindow] = useState(false)
   const [lessonNumber, setLessonNumber] = useState(null)
   const [savedA1Vocabs, setSavedA1Vocabs] = useState([])
   const [showPrompt, setShowPrompt] = useState(false)
   const [confirm, setConfirm] = useState(null)
   const [close, setClose] = useState(false)
   const [appear, setAppear] = useState(false)
   const [fade, setFade] = useState(false)
   const [show, setShow] = useState(false)
   const [excellent, setExcellent] = useState(false)
   const [totalA1Progress, setTotalA1Progress] = useState(null)
   const [lessonsA1, setLessonsA1] = useState(null)
   const [totalWordsCount, setTotalWordsCount] = useState(null)
   const [a1WordsCount, setA1WordsCount] = useState(null)
   const [showConfetti, setShowConfetti] = useState(false)
   const [showCongrats, setShowCongrats] = useState(false)
   const [anime, setAnime] = useState(false)
   const [btnPressed, setBtnPressed] = useState(null)
   const [preview, setPreview] = useState(false)
   
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


   const { slug } = use(params)
   

   useEffect(() => {
      if (!slug) return
      setLessonNumber(Number(slug))

      const loadLesson = async () => {
         try {
            const data = await getWordsByLesson(slug);
            setSpecificLessonWords(data);

         } catch (error) {
            console.error("Failed to fetch words:", error);
         }
      };

      loadLesson();
   }, [slug]);

   console.log('SpecificLessonWords:', specificLessonWords)
   
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

      try {
         await updateInteractionStatus(knownWords, unknownWords);

         startLoading()

         toast.success(
            <div className={styles.toastHolder}>
               <div className={styles.toastTitle}>
                  Progress Saved
               </div>
               <div className={styles.info}>
                  The words you studied are saved successfully
               </div>
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

         if (msg === 'save'){
            router.push('/a1')
         } else if(msg === 'nextLesson'){
            router.push(`/a1/${lessonNumber + 1}`)
         } else if(msg === 'nextLevel'){
            router.push('/a2')
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
      setLoadedImages2(0);
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
   }

   const saveHandle = (ws) => {
      const savedVocab = ws.word.word
      const savedVocabRole = ws.word.role

      const foundWord = specificLessonWords?.filter((item, index) => {
         if(item.word === savedVocab && item.role === savedVocabRole) {
            specificLessonWords[index].saved = !specificLessonWords[index].saved
            return item
         }
      })
      
      if(savedA1Vocabs.some(item => item.word == ws.word.word) && savedA1Vocabs.some(item => item.role == ws.word.role)){
         setSavedA1Vocabs(savedA1Vocabs.filter((item) => {
            return !(item.word === ws.word.word && item.role === ws.word.role)
         }))

         toast.error(
            <div className={styles.toastHolder}>
               <div className={styles.toastTitle2}>
                  The Word Deleted
               </div>
               <div className={styles.info}>
                  The word you had saved is now removed
               </div>
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

      } else {
         setSavedA1Vocabs((prev) => [
            ...prev,
            foundWord[0]
         ])

         toast.success(
            <div className={styles.toastHolder}>
               <div className={styles.toastTitle}>
                  Saved Successfully
               </div>
               <div className={styles.info}>
                  The word was added to the Saved page
               </div>
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
   }

   const wholeLessons = 45

   const startLearning = () => {

   }

   // logics for the assesment card
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

   const handleMainPageLoad = () => {
      stopLoading();
   };

   const handleLessonImageLoad = () => {
      setIsLoading(false)
   };

   return (
      <div className='min-w-screen min-h-dvh'>

         {
            darkMode ?
            <Image className='z-0'
               src= '/images/back/A1SlugDark.jpg'
               alt= 'background image'
               fill
               onLoad={handleMainPageLoad}
            />
            :
            <Image className='z-0'
               src= '/images/back/A1Slug.jpg'
               alt= 'background image'
               fill
               onLoad={handleMainPageLoad}
            />

         }

         <div className="absolute w-full flex items-center h-15 z-1">
            <div className='w-full pl-3'
            >Lesson {lessonNumber}</div>

            <div className='w-full'
               style={darkMode ? {color: 'white'} : {}}
            >A1</div>
         </div>

         {stage === 'assessment' && (

         <div className={`${close && 'opacity-0 transition-all transition-0.5'} w-full h-dvh p-10  flex flex-col items-center justify-around touch-pan-y`}>
            <div className='w-full z-1 text-white'>
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

                     className={`absolute rounded-4xl w-[80vw] h-full bg-white flex items-center justify-center p-10 ${
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
                                 : 'white'
                                 : 'white',
                           }
                        : {}
                     }

                     onTouchStart={index === 0 ? handleTouchStart : undefined}
                     onTouchMove={index === 0 ? handleTouchMove : undefined}
                     onTouchEnd={index === 0 ? handleTouchEnd : undefined}
                  >
                     <div className='text-center h-full flex items-center justify-evenly flex-col'>
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
                                 : 'black'
                                 : 'black',
                           }
                        : {}}
                        >{card.word}</h2>

                        <h3
                        style={
                        index === 0
                        ? {
                           color:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'white'
                                 : swipeDirection === 'left'
                                 ? 'white'
                                 : 'black'
                                 : 'black',
                           }
                        : {}}
                        >{card.role}</h3>

                        <p
                        style={
                        index === 0
                        ? {
                           color:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'white'
                                 : swipeDirection === 'left'
                                 ? 'white'
                                 : 'rgb(156, 156, 156)'
                                 : 'rgb(156, 156, 156)',
                           }
                        : {}}
                        >{card.definition}</p>

                     </div>
                  </div>
               ))}

            </div>
            <div className='h-10 w-full z-1'>
               <div className='text-white'>{counter} %</div>
               <div className='h-5 bg-white/10 rounded-2xl'>
                  <div className='bg-white h-full rounded-2xl transition-all'
                     style={{width: counter + '%'}}
                  ></div>
               </div>
            </div>

            <div className="w-full flex items-center justify-end gap-2">
               <button className='w-15 h-15 text-white bg-black/10 border border-white/40 rounded-[50%] active:bg-white/30 z-1 flex items-center justify-center' onClick={startOver}>
                  <BsArrowRepeat size={30} />
               </button>

               <button
                  className='w-15 h-15 bg-black/10 border border-white/40 text-white rounded-[50%] active:bg-white/30 z-1'
                  onClick={skipAssessment}
               >
                  Skip
               </button>
            </div>


            {
               excellent && (
                  <div className='absolute w-full h-dvh p-25 top-0 bg-black/10 backdrop-blur-lg flex items-center justify-center flex-col z-3 gap-3'>
                     <div className={`relative text-xl transition-all duration-400 text-black ${show ? 'top-0 opacity-100' : 'top-10 opacity-0'}`}>All done. Brilliant :)</div>
                     <div className='w-full flex flex-col gap-3'>
                        <button className='flex-1 py-2 bg-white/60 rounded-2xl active:bg-white' onClick={() => saveProgress('save')}>Save</button>
                        {
                           lessonNumber < wholeLessons ?
                           <button className='flex-1 py-2 bg-white/60 rounded-2xl active:bg-white' onClick={() => saveProgress('nextLesson')}>Next Lesson</button>
                           :
                           <button className='flex-1 py-2 bg-white/60 rounded-2xl active:bg-white' onClick={() => saveProgress('nextLevel')}>Start A2</button>
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
                  <div className={`relative opacity-0 transition-all duration-500 ease-out text-white text-xl ${appear ? 'top-0 opacity-100' : 'top-10 opacity-0'}`}>Time to Learn the New Words</div>
               </div>
            )
         }

   
         {stage === 'learning' && (
         <div className={`absolute w-full h-full top-0 p-5 pt-12 overflow-hidden flex items-center justify-start flex-col ${fade && styles.fadeIn}`}
            style={darkMode ? {color: 'white'} : {}}
         >
            {
               darkMode ?
               <Image className='object-cover z-0'
                  src='/images/back/DarkLearningA1.jpg'
                  fill
                  alt='background'
                  onLoad={handleLessonImageLoad}
               />
               :
               <Image className='object-cover z-0'
                  src='/images/back/A1LearnSection.jpg'
                  fill
                  alt='background'
                  onLoad={handleLessonImageLoad}   
               />
            }

            {
               isLoading && 
                  <div className="fixed z-2 top-0 left-0 w-full min-h-dvh flex justify-center items-center bg-white">
                     <Wait />
                  </div>
            }


            {(() => {
               const learningWords = [...unknownWords];
               const ws = learningWords[learningWordIndex];
               console.log('ws:', ws)
               return (
               <>
                  <div className='w-full h-dvh flex flex-col justify-start items-start gap-3'>
                     <div className='relative w-full h-80 overflow-hidden rounded-2xl'>

                        <Image className='object-cover'
                           src={`/images/a1/${ws.word.word}.png`}
                           fill
                           alt='Word Pic'
                           onLoad={handleImageLoad2}
                        />

                        {
                           isLoading2 &&
                              <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center">
                                 <Wait />
                              </div>
                        }
                        
                        <div className='absolute w-full bottom-0 h-20 bg-linear-to-t from-black to-transparent'></div>
                        <p className='absolute left-3 bottom-2 text-white text-4xl'>{ws.word.word}</p>

                        <div className='absolute right-3 bottom-4 text-white text-2xl flex justify-center items-center' onClick={() => saveHandle(ws)}>
                           {  
                              (savedA1Vocabs.some(item => item.word == ws.word.word) && savedA1Vocabs.some(item => item.role == ws.word.role)) ? <FaBookmark /> : <FaRegBookmark />  
                           }
                        </div>
                     </div>
                     <div className='w-full flex flex-col items-start z-1'>
                        <div className='w-full gap-5 flex items-center justify-center'>
                           <div className={`w-full p-4 rounded-2xl flex justify-between items-center bg-white/50 active:bg-white ${isPlayingAmE ? 'bg-white' : ''}`}
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

                           <div className={`w-full p-4 rounded-2xl flex justify-between items-center bg-white/50 active:bg-white ${isPlayingBrE ? 'bg-white' : {}}`}
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

                     <div className='w-full bg-white/50 p-2 z-1 text-center rounded-2xl'
                     >{ws.word.role}</div>

                     <div className='w-full flex items-center bg-white/50 p-4 z-1 rounded-2xl'
                        onClick={() => copyDef(ws.word.definition)}   
                     >{ws.word.definition}</div>

                     <div className='w-full bg-white/50 rounded-2xl p-4 z-1'
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
                     {
                        finalWindow &&
                           <div className='absolute top-0 w-full h-dvh bg-black/40 backdrop-blur-lg flex flex-col items-center justify-center left-0 p-5 gap-1 z-2'>

                              <div className="text-white text-bold text-4xl">Great!</div>
                              <div className="text-white text-bold text-lg mb-5">You finished lesson {lessonNumber}</div>

                              <div className="w-full flex gap-2 justify-center">

                                 <button
                                    className='py-2 w-25 bg-white rounded-xl active:scale-95'
                                    onClick={restartLearning}
                                 >
                                    Review
                                 </button>

                                 {
                                    lessonNumber < wholeLessons ?
                                       <button className='py-2 w-25 bg-white rounded-xl active:scale-95'
                                          onClick={() => saveProgress('nextLesson')}
                                       >Lesson {lessonNumber + 1}</button>
                                       :
                                       <button className='py-2 w-25 bg-white rounded-xl active:scale-95'
                                          onClick={() => saveProgress('nextLevel')}
                                       >Start A2</button>  
                                 }

                                 <button className='py-2 w-25 bg-white rounded-xl active:scale-95'
                                    onClick={() => saveProgress('save')}
                                 >Save</button>
                              </div>

                           </div>

                        }

                        <div className='absolute bottom-0 w-full flex items-center justify-center gap-3 left-0 p-5'>
                           <button
                              className='p-2 flex-1 bg-white rounded-xl active:scale-95'
                              onClick={handleBackLearningWord}
                           >
                              Back
                           </button>
                           {
                              learningWordIndex + 1 == learningWords.length ? 

                                 <button
                                    className='p-2 flex-1 bg-white rounded-xl active:scale-95'
                                    onClick={handleNextLearningWord}
                                 >
                                    Done
                                 </button>
                              :
                                 <button
                                    className='p-2 flex-1 bg-white rounded-xl active:scale-95'
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














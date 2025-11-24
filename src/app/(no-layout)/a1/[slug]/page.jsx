'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './slug.module.css';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6"
import Confetti from "@/components/confetti/confetti";
import Back from '@/components/backButton/back';
import Loader from '@/components/loading/loading';
import { a1WordList } from '@/data/a1WordList';
import { useTheme } from "@/components/context/ThemeContext";
import BriefPrompt from '@/components/briefPrompt/briefPrompt';
import { RxSpeakerLoud } from "react-icons/rx";
import Wait from '@/components/wait/wait';
import Audio from '@/components/audio/audio';
import { toast, Slide } from 'react-toastify';


export default function Lessons({ params }) {
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;

   const [wordList, setwordList] = useState(null)
   const [isLoading, setIsLoading] = useState(true);
   const [isLoading2, setIsLoading2] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const [loadedImages2, setLoadedImages2] = useState(0);
   const totalImages = 1;
   const totalImages2 = 1;

   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [learningWordIndex, setLearningWordIndex] = useState(0);
   const [stage, setStage] = useState('assessment');
   const [knownWords, setKnownWords] = useState([]);
   const [unknownWords, setUnknownWords] = useState([]);
   const [btn, setBtn] = useState(false)
   const [lessonNumber, setLessonNumber] = useState(null)
   const [savedA1Vocabs, setSavedA1Vocabs] = useState([])
   const [showPrompt, setShowPrompt] = useState(false)
   const [confirm, setConfirm] = useState(null)
   const [close, setClose] = useState(false)
   const [appear, setAppear] = useState(false)
   const [fade, setFade] = useState(false)
   const [show, setShow] = useState(false)
   const [totalA1Progress, setTotalA1Progress] = useState(null)
   const [lessonsA1, setLessonsA1] = useState(null)
   const [totalWordsCount, setTotalWordsCount] = useState(null)
   const [a1WordsCount, setA1WordsCount] = useState(null)
   const [showConfetti, setShowConfetti] = useState(false)
   const [showCongrats, setShowCongrats] = useState(false)
   const [anime, setAnime] = useState(false)
   const [btnPressed, setBtnPressed] = useState(null)
   const [preview, setPreview] = useState(false)
   const [showCopyMessage, setShowCopyMessage] = useState(false)
   
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


   const { slug } = params;
   
   useEffect(() => {
      setLessonNumber(Number(slug))
   }, [slug])
   
   const router = useRouter()
   useEffect(() => {
      const handleDefaultBack = (event) => {
         event.preventDefault()
         router.push('/a1')
         localStorage.setItem(`preview`, JSON.stringify(false))
         setPreview(false) 
      }

      window.addEventListener('popstate', handleDefaultBack)
      
      return () => {
         window.addEventListener('popstate', handleDefaultBack)
      }
   }, [router])


// Retrieve data from localStorage on mount
   useEffect(() => {
      try {
         setwordList(a1WordList)
         const savedKnowns = JSON.parse(localStorage.getItem(`knownWords-${slug}-A1`) || '[]');
         const savedUnknowns = JSON.parse(localStorage.getItem(`unknownWords-${slug}-A1`) || '[]');
         const a2WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-A2`) || 0);
         const b1WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-B1`) || 0);
         const b2WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-B2`) || 0);
         const c1WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-C1`) || 0);
         const c2WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-C2`) || 0);
         const previewState = JSON.parse(localStorage.getItem('preview') || false);
         const lessonsLearnt = slug
         const totalWordsLearnt = slug * 10 + Number(a2WordsLearnt) + Number(b1WordsLearnt) + Number(b2WordsLearnt) + Number(c1WordsLearnt) + Number(c2WordsLearnt)
         const wordsLearnt = slug * 10
         
         setPreview(previewState)
         setA1WordsCount(wordsLearnt)
         setTotalWordsCount(totalWordsLearnt)
         setLessonsA1(lessonsLearnt)
         setKnownWords(savedKnowns);
         setUnknownWords(savedUnknowns);
      } catch (e) {
         console.error('Error parsing localStorage data:', e);
      }
   }, [slug]); // Depend on slug to reload when lesson changes

   const done = () => {
      try {
         save()

         if(totalWordsCount % 100 === 0){
            animation()
            setBtnPressed('done')
         } else {
            router.push('/a1')
         }

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

   const closeCongrats = () => {
      setShowCongrats(false)
      setAnime(false)
      save()

      btnPressed === 'done' ? router.push('/a1') :
      btnPressed === 'nextLesson' ? router.push(`/a1/${lessonNumber + 1}`) :
      btnPressed === 'nextLevel' ? router.push('/a2') : console.log('PROBLEM')
   }

   const save = () => {
      localStorage.setItem(`knownWords-${slug}-A1`, JSON.stringify(knownWords));
      localStorage.setItem(`unknownWords-${slug}-A1`, JSON.stringify(unknownWords));
      localStorage.setItem(`totalProgress-A1`, JSON.stringify(totalA1Progress));
      localStorage.setItem(`wordsCount-A1`, JSON.stringify(a1WordsCount));
      localStorage.setItem(`totalWordsCount`, JSON.stringify(totalWordsCount));
      localStorage.setItem(`currentLesson-A1`, JSON.stringify(slug));
      
   }

   const animation = () => {
      setShowCongrats(true)
      setTimeout(() => setShowConfetti(true), 500)
      setTimeout(() => setAnime(true), 500)
      setTimeout(() => setShowConfetti(false), 3000)
   }

   // Save data to localStorage when state changes
   useEffect(() => {
      try {
         localStorage.setItem(`savedA1Vocabs-${slug}-A1`, JSON.stringify(savedA1Vocabs));

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }, [savedA1Vocabs, slug]);

   const handleNextLearningWord = () => {
      const learningWords = [...unknownWords];
      if (learningWordIndex + 1 < learningWords.length && (!isPlayingBrE && !isPlayingAmE)) {
         setLearningWordIndex(learningWordIndex + 1);
      } else if(learningWordIndex + 1 == learningWords.length && (!isPlayingBrE && !isPlayingAmE)) {
         setBtn(true)
      } 
   };
   
   const handleBackLearningWord = () => {
      if (learningWordIndex - 1 >= 0 && (!isPlayingBrE && !isPlayingAmE)) {
         setLearningWordIndex(learningWordIndex - 1);
         setBtn(false)
      } else if(!isPlayingBrE && !isPlayingAmE) {
         alert('This is the first word');
      }
   };

   const restartLearning = () => {
      setLearningWordIndex(0)
      setBtn(false)
   }

   const saveHandle = (ws) => {
      const savedVocab = ws.word.word
      const savedVocabRole = ws.word.role

      const foundWord = wordList?.filter((item, index) => {
         if(item.word === savedVocab && item.role === savedVocabRole) {
            wordList[index].saved = !wordList[index].saved
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
                  Deleted Successfully
               </div>
               <div className={styles.info}>
                  The word you had saved is removed now.
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
                  You can see the word in the Saved section.
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
   
   const specificLessonWords = wordList?.filter((item) => {
      return item.id == slug
   })

   const wholeLessons = wordList?.[wordList.length - 1].id

   const startLearning = () => {
      setAppear(false);

      setTimeout(() => {
         setStage('learning');
      }, 1000);

      setTimeout(() => {
         setFade(true);
      }, 1500);
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
      setCounter(prev => prev + 10)

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

      // Update known or unknown words based on status
      if (status === 'known') {
         setKnownWords([...knownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'A1' }]);
      } else if (status === 'unknown') {
         setUnknownWords([...unknownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'A1' }]);
      }

      // Check if there are more words to process
      if (currentWordIndex + 1 < specificLessonWords.length) {
         setCurrentWordIndex(currentWordIndex + 1);
      } else {
         // Use the current status to determine the next stage
         const willHaveUnknownWords = status === 'unknown' ? true : unknownWords.length > 0;

         setClose(true);
         if (willHaveUnknownWords) {
               setTimeout(() => {
               setStage('shiftMsg');
            }, 1000);

            setTimeout(() => {
               setAppear(true);
            }, 1500);

         } else {
            setTimeout(() => {
               setStage('excellent');
            }, 1000);

            setTimeout(() => {
               setShow(true);
            }, 2000);
         }
      }
   };

   if (!specificLessonWords || specificLessonWords.length === 0) {
      return <div className={styles.noCards}>No flashcards available</div>;
   }

   const visibleCards = [];
   for (let i = 0; i < Math.min(3, specificLessonWords.length - currentCardIndex); i++) {
      visibleCards.push(specificLessonWords[(currentCardIndex + i) % specificLessonWords.length]);
   }

   const handleImageLoad = () => {
      setLoadedImages((prev) => {
         const newCount = prev + 1;
         if (newCount >= totalImages) {
            setIsLoading(false);
         }
         return newCount;
      });
   };

   const handleImageLoad2 = () => {
      setLoadedImages2((prev) => {
         const newCount = prev + 1;
         if (newCount >= totalImages2) {
            setIsLoading2(false);
         }
         return newCount;
      });
   };

   const startOver = () => {
      location.reload()
   }

   if(preview){
      const cancelPreview = () => {
         localStorage.setItem(`preview`, JSON.stringify(false));
         setPreview(false)
      }

      const handleImageLoad = () => {
         setLoadedImages((prev) => {
            const newCount = prev + 1;
            if (newCount >= totalImages) {
               setIsLoading(false);
            }
            return newCount;
         });
      };

      return (
         <div className={styles.previewContainer}>

            <Image className={styles.imgPreview}
               src= '/images/back/previewA1.jpg'
               alt= 'background image'
               fill
               onLoad={handleImageLoad}
            />

            <Back preview = {true}/>

            <h2 className={styles.preTitle}> The Words in This Lesson</h2>

            <div className={styles.vocabCards}>
            {
               specificLessonWords?.map((item, index) => (
                  <div className={styles.eachCard} key={index}>
                     <div className={styles.vocab}>{item.word}</div>
                  </div>
               ))
            }
            </div>

            <div className={styles.actionsHolder}>
               <button className={styles.actions} onClick={cancelPreview}>Start this Lesson</button>
            </div>

            {isLoading && (
               <Loader />
            )}
         
         </div>
      )
   }

   const copyDef = (def) => {
      navigator.clipboard.writeText(def)
      showCopyMsg()
   }

   const showCopyMsg = () => {
      if(!showCopyMessage){
         setShowCopyMessage(true)

         setTimeout(() => {
            setShowCopyMessage(false)
         }, 3500)
      }
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

   return (
      <div className={styles.container}>

         {
            darkMode ?
            <Image className={styles.img}
               src= '/images/back/A1SlugDark.jpg'
               alt= 'background image'
               fill
               onLoad={handleImageLoad}
            />
            :
            <Image className={styles.img}
               src= '/images/back/A1Slug.jpg'
               alt= 'background image'
               fill
               onLoad={handleImageLoad}
            />

         }


         <div className={styles.lessonTitle}
            style={darkMode ? {color: 'white'} : {}}
         >Lesson {lessonNumber}</div>

         <div className={styles.lessonLevel}
            style={darkMode ? {color: 'white'} : {}}
         >A1</div>

         {stage === 'assessment' && (

         <div className={`${styles.assessCard} ${close && styles.shiftMsg}`}>
            <div className={styles.titleHolder}
               style={darkMode ? {color: 'white'} : {}}
            >
               <h2 className={styles.check}>Knowledge Check</h2>
               <p className={styles.prompt}>Swipe right if you know the word.</p>
               <p className={styles.prompt}>Swipe left if you need to learn the word.</p>
            </div>
           <div className={styles.cardStack}>
               {visibleCards.map((card, index) => (
                  <div
                     key={`${card.word}-${(currentCardIndex + index) % specificLessonWords.length}`}
                     ref={index === 0 ? cardRef : null}
                     className={`${styles.card} ${
                     index === 0 && isSwiping ? styles.swiping : ''
                     } ${index === 0 && swipeDirection && isSwiped ? styles[swipeDirection] : ''} ${
                     styles[`card${index}`]
                     }`}
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
                     <div className={styles.cardContent}>
                        <h2
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
            <div className={styles.counterHolder}>
               <div className={styles.number}>{counter} %</div>
               <div className={styles.counterCourse}>
                  <div className={styles.counter}
                     style={{width: counter + '%'}}
                  ></div>
               </div>
            </div>

            <button className={styles.restart} onClick={startOver}>Start Again</button>

         </div>
            
         )}

         {
            stage === 'shiftMsg' && (
               <div className={`${styles.shiftCard} ${appear && styles.appear}`}>
                  <div style={darkMode ? {color: 'white'} : {}}>Time to Learn the New Words</div>
                  <button className={styles.start}
                     onClick={startLearning}
                  >START</button>
               </div>
            )
         }

         {
            stage === 'excellent' && ( // NEW
               <div className={`${styles.done} ${show && styles.show}`}>
                  <div className={styles.doneTitle}>All done. Brilliant :)</div>
                  <div className={styles.btnHolder}>
                     <button className={styles.back} onClick={done}>Save</button>
                     {
                        lessonNumber < wholeLessons ?
                        <button className={styles.back} onClick={nextLesson}>Next Lesson</button>
                        :
                        <button className={styles.back} onClick={nextLevel}>Start A2</button>
                     }
                  </div>
               </div>
            )
         }
   
         {stage === 'learning' && (
         <div className={`${styles.learnCard} ${fade && styles.fadeIn}`}
            style={darkMode ? {color: 'white'} : {}}
         >
            {
               darkMode ? 
               <Image className={styles.image}
                  src='/images/back/DarkLearnA1.jpg'
                  fill
                  alt='background'
                  onLoad={handleImageLoad}
               />
               :
               <Image className={styles.image}
                  src='/images/back/A1LearnSection.jpg'
                  fill
                  alt='background'
                  onLoad={handleImageLoad}
               />
            }


            {(() => {
               const learningWords = [...unknownWords];
               const ws = learningWords[learningWordIndex];
               return (
               <>
                  <div className={styles.wordBlock}>
                     <div className={styles.wordImage}>
                        
                        <Image className={styles.image}
                           src={`/images/a1/${ws.word.word}.png`}
                           fill
                           alt='Word Pic'
                           onLoad={handleImageLoad2}
                        />
                        <div className={styles.overlay}></div>
                        <p className={styles.wordTitle}>{ws.word.word}</p>

                        <div className={styles.actions} onClick={() => saveHandle(ws)}>
                           {  
                              (savedA1Vocabs.some(item => item.word == ws.word.word) && savedA1Vocabs.some(item => item.role == ws.word.role)) ? <FaBookmark className={styles.save}/> : <FaRegBookmark className={styles.save}/>  
                           }
                        </div>
                     </div>
                     <div className={styles.wordHolder}>
                        <div className={styles.infoHolder}>
                           <div className={`${styles.phonetics} ${isPlayingAmE ? styles.isPlaying : {}}`}
                              onClick={isPlayingAmE ? pauseAudioAmE : playAudioAmE}
                           >
                              <audio
                                 ref={audioRefAmE}
                                 src={`/sounds/A1/${ws.word.word}-AmE.m4a`}
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

                           <div className={`${styles.phonetics} ${isPlayingBrE ? styles.isPlaying : {}}`}
                              onClick={isPlayingBrE ? pauseAudioBrE : playAudioBrE}
                           >
                              <audio
                                 ref={audioRefBrE}
                                 src={`/sounds/A1/${ws.word.word}-BrE.m4a`}
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

                     <div className={styles.role}>{ws.word.role}</div>

                     <div className={styles.definition} onClick={() => copyDef(ws.word.definition)}>{ws.word.definition}</div>

                     <div className={styles.examplesHolder}>
                        <ul className={styles.examplesList}>
                           {ws.word.examples.map((example, i) => (
                           <li key={i}>{example}</li>
                           ))}
                        </ul>
                     </div>
                     {
                        btn ? // NEW
                           <div className={styles.btnHolder}>
                              <button
                                 className={styles.button}
                                 onClick={restartLearning}
                              >
                                 Review
                              </button>

                              {
                              lessonNumber < wholeLessons ?
                                 <button className={styles.button} onClick={nextLesson}>Lesson {lessonNumber + 1}</button>
                                 :
                                 <button className={styles.button} onClick={nextLevel}>Start A2</button>  
                              }

                              <button className={styles.button} onClick={done}>Save</button>
                           </div>

                           : 

                           <div className={styles.btnHolder}>
                              <button
                                 className={styles.button}
                                 onClick={handleBackLearningWord}
                              >
                                 Back
                              </button>
                              <button
                                 className={styles.button}
                                 onClick={handleNextLearningWord}
                              >
                                 Next
                              </button>
                           </div>
                     }
                  </div>
                  
                  <div className={`${styles.confirmDefault} ${showPrompt && styles.confirmShow}`}>
                     <div className={styles.mainHolder}>
                        <div className={styles.confirmMsg}>
                           {
                              confirm ? 'Removed Successfully' : 'Saved Successfully'
                           }
                        </div>   
                     </div>
                     <div className={styles.cancelBtn} onClick={() => saveHandle(ws)}>Undo</div>
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

         {isLoading && (
            <Loader />
         )}

         {isLoading2 && stage ==='learning' && (
            <Wait />         
         )}

         {
            showCopyMessage && 
            <BriefPrompt
               text={'Definition copied to clipboard'}
            />
         }

      </div>
   );
}














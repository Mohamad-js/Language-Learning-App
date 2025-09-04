'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './slug.module.css';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import Confetti from "@/components/confetti/confetti";
import Back from '@/components/backButton/back';
import Loader from '@/components/loading/loading';
import { b1WordList } from '@/data/b1WordList';



export default function Lessons({ params }) {
   const [wordList, setWordList] = useState(null)
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;

   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [learningWordIndex, setLearningWordIndex] = useState(0);
   const [stage, setStage] = useState('assessment');
   const [knownWords, setKnownWords] = useState([]);
   const [unknownWords, setUnknownWords] = useState([]);
   const [btn, setBtn] = useState(false)
   const [lessonNumber, setLessonNumber] = useState(null)
   const [savedB1Vocabs, setSavedB1Vocabs] = useState([])
   const [confirmBox, setConfirmBox] = useState(false)
   const [cancelBox, setCancelBox] = useState(false)
   const [close, setClose] = useState(false)
   const [appear, setAppear] = useState(false)
   const [fade, setFade] = useState(false)
   const [show, setShow] = useState(false)
   const [totalB1Progress, setTotalB1Progress] = useState(null)
   const [b1WordsCount, setB1WordsCount] = useState(null)
   const [lessonsB1, setLessonsB1] = useState(null)
   const [totalWordsCount, setTotalWordsCount] = useState(null)
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


   const { slug } = params;
   
   useEffect(() => {
      setLessonNumber(Number(slug))
   }, [slug])
   
   const router = useRouter()
   useEffect(() => {
      const handleDefaultBack = (event) => {
         event.preventDefault()
         router.push('/b1')
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
         setWordList(b1WordList)

         const savedKnowns = JSON.parse(localStorage.getItem(`knownWords-${slug}-B1`) || '[]');
         const savedUnknowns = JSON.parse(localStorage.getItem(`unknownWords-${slug}-B1`) || '[]');
         const previewState = JSON.parse(localStorage.getItem('preview') || false);
         const a1WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-A1`) || 0);
         const a2WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-A2`) || 0);
         const b2WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-B2`) || 0);
         const c1WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-C1`) || 0);
         const c2WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-C2`) || 0);
         const lessonsProgress = slug
         const totalWordsLearnt = (slug * 10) + Number(a1WordsLearnt) + Number(a2WordsLearnt) + Number(b2WordsLearnt) + Number(c1WordsLearnt) + Number(c2WordsLearnt)
         const b1WordsLearnt = slug * 10
         
         setB1WordsCount(b1WordsLearnt)
         setPreview(previewState)
         setTotalWordsCount(totalWordsLearnt)
         setLessonsB1(lessonsProgress)
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
            router.push('/b1')
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
            router.push(`/b1/${lessonNumber + 1}`)
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
            router.push('/b2')
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const closeCongrats = () => {
      setShowCongrats(false)
      setAnime(false)
      save()

      btnPressed === 'done' ? router.push('/b1') :
      btnPressed === 'nextLesson' ? router.push(`/b1/${lessonNumber + 1}`) :
      btnPressed === 'nextLevel' ? router.push('/b2') : console.log('PROBLEM')
   }

   const save = () => {
      localStorage.setItem(`knownWords-${slug}-B1`, JSON.stringify(knownWords));
      localStorage.setItem(`unknownWords-${slug}-B1`, JSON.stringify(unknownWords));
      localStorage.setItem(`totalProgress-B1`, JSON.stringify(totalB1Progress));
      localStorage.setItem(`wordsCount-B1`, JSON.stringify(b1WordsCount));
      localStorage.setItem(`totalWordsCount`, JSON.stringify(totalWordsCount));
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
         localStorage.setItem(`savedB1Vocabs-${slug}-B1`, JSON.stringify(savedB1Vocabs));

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }, [savedB1Vocabs, slug]);

   const handleNextLearningWord = () => {
      const learningWords = [...unknownWords];
      if (learningWordIndex + 1 < learningWords.length) {
         setLearningWordIndex(learningWordIndex + 1);
      } else if(learningWordIndex + 1 == learningWords.length) {
         setBtn(true)
      } 
   };
   
   const handleBackLearningWord = () => {
      if (learningWordIndex - 1 >= 0) {
         setLearningWordIndex(learningWordIndex - 1);
         setBtn(false)
      } else {
         alert('This is the first word');
      }
   };

   const saveHandle = (ws) => {
      const savedVocab = ws.word.word
      const savedVocabRole = ws.word.role

      const foundWord = wordList?.filter((item, index) => {
         if(item.word === savedVocab && item.role === savedVocabRole) {
            wordList[index].saved = !wordList[index].saved
            return item
         }
      })
      
      if(savedB1Vocabs.some(item => item.word == ws.word.word) && savedB1Vocabs.some(item => item.role == ws.word.role)){
         setSavedB1Vocabs(savedB1Vocabs.filter((item) => {
            return !(item.word === ws.word.word && item.role === ws.word.role)
         }))

         setCancelBox(true)

         setTimeout(() => {
            setCancelBox(false);
         }, 3000);

      } else {
         setSavedB1Vocabs((prev) => [
            ...prev,
            foundWord[0]
         ])

         setConfirmBox(true)

         setTimeout(() => {
            setConfirmBox(false);
         }, 3000);
      }
   }

   const handleAnswer = (status) => {
      const currentWord = specificLessonWords[currentWordIndex];

      // Update known or unknown words based on status
      if (status === 'known') {
         setKnownWords([...knownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'B1' }]);
      } else if (status === 'unknown') {
         setUnknownWords([...unknownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'B1' }]);
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
         console.log(`Initiating swipe ${direction} for card: ${specificLessonWords[currentCardIndex].word}`);
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
               src= '/images/back/previewB1.jpg'
               alt= 'background image'
               fill
               onLoad={handleImageLoad}
            />

            <Back preview = {true} />

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
               <div className={styles.bottomLayer}>
                  <Loader />
               </div>
            )}
         
         </div>
      )
   }

   return (
      <div className={styles.container}>

         <Image className={styles.img}
            src= '/images/back/B1Slug.jpg'
            alt= 'background image'
            fill
            onLoad={handleImageLoad}
         />

         <div className={styles.lessonTitle}>Lesson {lessonNumber}</div>
         <div className={styles.lessonLevel}>B1</div>

         {stage === 'assessment' && (
         <div className={`${styles.assessCard} ${close && styles.shiftMsg}`}>
            <div className={styles.titleHolder}>
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
                  <div>Time to Learn the New Words</div>
                  <button className={styles.start}
                     onClick={startLearning}
                  >START</button>
               </div>
            )
         }

         {
            stage === 'excellent' && (
               <div className={`${styles.done} ${show && styles.show}`}>
                  <div className={styles.doneTitle}>All done. Brilliant :)</div>
                  <div className={styles.btnHolder}>
                     <button className={styles.back} onClick={done}>Save</button>
                     {
                        lessonNumber < wholeLessons ?
                        <button className={styles.back} onClick={nextLesson}>Next Lesson</button>
                        :
                        <button className={styles.back} onClick={nextLevel}>Start B2</button>
                     }
                  </div>
               </div>
            )
         }
   
         {stage === 'learning' && (
         <div className={`${styles.learnCard} ${fade && styles.fadeIn}`}>
            {(() => {
               const learningWords = [...unknownWords]; // ...partialWords WAS DELETED
               const ws = learningWords[learningWordIndex];
               return (
               <>
                  <div className={styles.actionsHolder}>
                     <p className={styles.title}>The words you need to learn</p>
                     <p className={styles.actions} onClick={() => saveHandle(ws)}>
                        {  
                           (savedB1Vocabs.some(item => item.word == ws.word.word) && savedB1Vocabs.some(item => item.role == ws.word.role)) ? <FaBookmark className={styles.save}/> : <FaRegBookmark className={styles.save}/>  
                        }
                     </p>
                  </div>
                  <div className={styles.wordBlock}>
                     <div className={styles.wordHolder}>
                        <p className={styles.wordTitle}>{ws.word.word}</p>
                        <div className={styles.infoHolder}>
                           <p className={styles.phonetics}>American: {ws.word.AmE}</p>
                           <p className={styles.phonetics}>British: {ws.word.BrE}</p>
                        </div>
                        <div className={styles.role}>{ws.word.role}</div>
                     </div>
                     <div className={styles.definition}>{ws.word.definition}</div>
                     <div className={styles.examplesHolder}>
                        <p><strong>Examples:</strong></p>
                        <ul className={styles.examplesList}>
                           {ws.word.examples.map((example, i) => (
                           <li key={i}>{example}</li>
                           ))}
                        </ul>
                     </div>
                     {
                        btn ? 
                           <div className={styles.btnHolder}>
                              <button
                                 className={styles.button}
                                 onClick={() => setStage('revision')}
                              >
                                 Review
                              </button>
                              {
                              lessonNumber < wholeLessons ?
                                 <button className={styles.button} onClick={nextLesson}>Lesson {lessonNumber + 1}</button>
                                 :
                                 <button className={styles.button} onClick={nextLevel}>Start B2</button>  
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
               </>
               );
            })()}
         </div>
         )}
   
         {stage === 'revision' && (
         <div className={styles.revisionCard}>
            <p className={styles.title}>What you learnt in this lesson:</p>
            {(() => {
               const revisionWords = [...unknownWords];
               return revisionWords.map((ws, index) => (
               <div key={index} className={styles.wordBlock}>
                  <div className={styles.wordHolder}>
                     <p className={styles.wordTitle}>{ws.word.word}</p>
                     <div className={styles.infoHolder}>
                        <p className={styles.phonetics}>{ws.word.AmE}</p>
                        <p className={styles.phonetics}>{ws.word.BrE}</p>
                        <div className={styles.role}>{ws.word.role}</div>
                     </div>
                  </div>
                  <div className={styles.definition}>{ws.word.definition}</div>
                  <div className={styles.examplesHolder}>
                     <p><strong>Examples:</strong></p>
                     <ul className={styles.examplesList}>
                        {ws.word.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                        ))}
                     </ul>
                  </div>
               </div>
               ));
            })()}
            <div className={styles.btnHolder}>
               {
                  lessonNumber < wholeLessons ?
                  <button className={styles.button} onClick={nextLesson}>Next Lesson</button>
                  :
                  <button className={styles.button} onClick={nextLevel}>Start B2</button>
               }

               <button className={styles.button} onClick={done}>Save</button>
            </div>
         </div>
      )}

      {
         confirmBox ? <div className={styles.confirm}>Saved Successfully</div>
         :
         cancelBox ? <div  className={styles.cancel}>Removed Successfully</div> : null
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

      {isLoading && (
         <div className={styles.bottomLayer}>
            <Loader />
         </div>
      )}
      </div>
   );
}














'use client'
import styles from './wordsReview.module.css'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FlipCard from '@/components/flashcard/FlipCard';
import Back from '@/components/backButton/back';
import BriefPrompt from '@/components/briefPrompt/briefPrompt';
import { getAllWordsReview } from '@/lib/db';


const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const wordTypes = ['known', 'unknown'];
const maxLessons = 240; // Maximum number of lessons for any level



function WordsReview() {
   const [wordData, setWordData] = useState([]);
   const [selectedType, setSelectedType] = useState('all');
   const [selectedLesson, setSelectedLesson] = useState('1');
   const [selectedLevel, setSelectedLevel] = useState('A1');
   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [showCopyMessage, setShowCopyMessage] = useState(false)

   useEffect(() => {
      const loadWords = async () => {
         const words = await getAllWordsReview();

         setWordData(words);
         console.log('WORDS:', words)

         const lessonRequested =
            JSON.parse(localStorage.getItem('lessonRequested')) || '1';

         const levelRequested =
            JSON.parse(localStorage.getItem('levelRequested')) || 'A1';

         setSelectedLesson(lessonRequested);
         setSelectedLevel(levelRequested);

         setTimeout(() => {
            localStorage.removeItem('lessonRequested');
            localStorage.removeItem('levelRequested');
         }, 1000);
      };

      loadWords();
   }, []);

   // Get unique lessons for the selected level
   const availableLessons = [
      ...new Set(
         wordData
            .filter(
               word =>
                  selectedLevel === 'all' ||
                  word.level === selectedLevel
            )
            .map(word => word.lesson)
      )
   ].sort((a, b) => a - b);

   // Filter words based on selections
   const filteredWords = wordData.filter(word =>
      (selectedType === 'all' ||
         word.status === selectedType) &&

      (selectedLevel === 'all' ||
         word.level === selectedLevel) &&

      (selectedLesson === 'all' ||
         word.lesson === Number(selectedLesson))
   );

   const handleTypeChange = (e) => {
      setSelectedType(e.target.value);
      setCurrentWordIndex(0);
   };

   const handleLevelChange = (e) => {
      setSelectedLevel(e.target.value);
      setSelectedLesson('1');
      setCurrentWordIndex(0);
   };

   const handleLessonChange = (e) => {
      setSelectedLesson(e.target.value);
      setCurrentWordIndex(0);
   };

   const copyWordsToClipboard = (words) => {
      if (words.length === 0) return


      // Extract just the word strings (adjust if your word field is nested differently)
      const wordList = words.map(item => item.word).filter(Boolean); // filter out null/undefined

      const textToCopy = wordList.join('\n'); // or ', ' for comma-separated

      navigator.clipboard.writeText(textToCopy)
      .then(() => {
         // Optional: show a success message
         showCopyMsg()
      })
      .catch(err => {
         console.error('Failed to copy words: ', err);
         // Optional: fallback or user feedback
      });
   };

   const showCopyMsg = () => {
      if(!showCopyMessage){
         setShowCopyMessage(true)

         setTimeout(() => {
            setShowCopyMessage(false)
         }, 3500)
      }
   }


   return (
      <div className={styles.container}>
         <Image className={styles.img}
            src='/images/back/reviewBack.jpg'
            alt='background image'
            fill
         />

         <Back />

         <div className={styles.filterHolder}>
            <div className={styles.typeHolder}>
               <label htmlFor="level-select" className={styles.type}>Level</label>
               <select
                  id="level-select"
                  className={styles.select}
                  value={selectedLevel}
                  onChange={handleLevelChange}
               >
               <option value="all">All</option>
               {levels.filter(level => 
                  wordData.some(item => item.level === level)
               ).map(level => (
                  <option key={level} value={level}>{level}</option>
               ))}
               </select>
            </div>
            <div className={styles.typeHolder}>
               <label htmlFor="lesson-select" className={styles.type}>Lesson</label>
               <select
                  id="lesson-select"
                  className={styles.select}
                  value={selectedLesson}
                  onChange={handleLessonChange}
               >
               <option value="all">All</option>
               {availableLessons.map(lesson => (
                  <option key={lesson} value={lesson}>{lesson}</option>
               ))}
               </select>
            </div>
            <div className={styles.typeHolder}>
               <label htmlFor="type-select" className={styles.type}>Type</label>
               <select
                  id="type-select"
                  className={styles.select}
                  value={selectedType}
                  onChange={handleTypeChange}
               >
                  <option value="all">All</option>
                  <option value="known">Known</option>
                  <option value="unknown">Unknown</option>
               </select>
            </div>
         </div>

         <div className={styles.flashcardContainer}>
            <div className={styles.scroller}></div>

            {
               filteredWords.length > 0 ?
               filteredWords.map((item, index) => (
                  <FlipCard
                     key={index}
                     word={item.word}
                     role={item.role}
                     british={item.BrE}
                     american={item.AmE}
                     definition={item.definition}
                     examples={item.examples}
                     lesson={item.lesson}
                     level={item.level}
                  />
               ))
               :
               <div className={styles.noCard}>
                  <div className={styles.alarm}>No Words to Show</div>
               </div>
            }
         </div>
         
         <div className={styles.copyButtonHolder}>

            <button className={styles.copyButton}
               onClick={() => copyWordsToClipboard(filteredWords)}
               disabled={filteredWords.length === 0}
               >
               Copy
            </button>
         </div>
         
         {
            showCopyMessage && 
            <BriefPrompt
               text={`${filteredWords.length} Words Copied`}
            />
         }

      </div>
   );
}

export default WordsReview;
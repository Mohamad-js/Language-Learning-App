'use client'
import styles from './wordsReview.module.css'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FlipCard from '@/components/flashcard/FlipCard';
import Back from '@/components/backButton/back';


const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const wordTypes = ['knownWords', 'unknownWords'];
const maxLessons = 240; // Maximum number of lessons for any level

// Function to aggregate all words from localStorage into a single state
function aggregateWordsFromLocalStorage() {
  const aggregatedData = [];

  // Iterate through each word type, level, and possible lesson
  wordTypes.forEach(type => {
    levels.forEach(level => {
      for (let lesson = 1; lesson <= maxLessons; lesson++) {
        const key = `${type}-${lesson}-${level}`;
        const data = localStorage.getItem(key);
        
        // Only include data if it exists in localStorage
        if (data) {
          try {
            const words = JSON.parse(data); // Assuming data is stored as JSON
            aggregatedData.push({
              type: type,
              level: level,
              lesson: lesson,
              words: words
            });
          } catch (error) {
            console.error(`Error parsing ${key}:`, error);
          }
        }
      }
    });
  });

  return aggregatedData;
}



function WordsReview() {
   const [wordData, setWordData] = useState([]);
   const [selectedType, setSelectedType] = useState('all');
   const [selectedLesson, setSelectedLesson] = useState('1');
   const [selectedLevel, setSelectedLevel] = useState('A1');
   const [currentWordIndex, setCurrentWordIndex] = useState(0);

   // Load data on component mount
   useEffect(() => {
      const data = aggregateWordsFromLocalStorage();
      setWordData(data);
      
      const lessonRequested = JSON.parse(localStorage.getItem('lessonRequested')) || '1';
      setSelectedLesson(lessonRequested)
      
      const levelRequested = JSON.parse(localStorage.getItem('levelRequested')) || 'A1';
      setSelectedLevel(levelRequested)

      setTimeout(() => {
         localStorage.removeItem('lessonRequested');
         localStorage.removeItem('levelRequested');
      }, 1000)
   }, []);

   // Get unique lessons for the selected level
   const availableLessons = [...new Set(
      wordData
      .filter(item => selectedLevel === 'all' || item.level === selectedLevel)
      .map(item => item.lesson)
   )].sort((a, b) => a - b);

   // Filter words based on selections
   const filteredWords = wordData.filter(item => 
      (selectedType === 'all' || item.type === selectedType) &&
      (selectedLevel === 'all' || item.level === selectedLevel) &&
      (selectedLesson === 'all' || item.lesson === Number(selectedLesson))
   ).flatMap(item => 
      item.words.map(wordObj => ({
         ...wordObj.word, // Spread the word object to include all its properties
         level: item.level, // Add level from the parent item
         lesson: item.lesson // Add lesson from the parent item
      }))
   ).filter(word => word && typeof word === 'object');

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
               <option value="knownWords">Known</option>
               <option value="unknownWords">Unknown</option>
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

      </div>
   );
}

export default WordsReview;
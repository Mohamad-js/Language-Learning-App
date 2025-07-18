'use client'
import styles from './wordsReview.module.css'
import { useState, useEffect } from 'react';
import Image from 'next/image';


const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const wordTypes = ['knownWords', 'partialWords', 'unknownWords'];
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
   const [selectedLesson, setSelectedLesson] = useState('all');
   const [selectedLevel, setSelectedLevel] = useState('all');
   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [isFlipped, setIsFlipped] = useState(false);

   // Load data on component mount
   useEffect(() => {
      const data = aggregateWordsFromLocalStorage();
      setWordData(data);
      console.log('Loaded wordData:', JSON.stringify(data, null, 2));
   }, []);

   // Get unique lessons for the selected level
   const availableLessons = [...new Set(
      wordData
      .filter(item => selectedLevel === 'all' || item.level === selectedLevel)
      .map(item => item.lesson)
   )].sort((a, b) => a - b);

   // Filter words based on selections
   const filteredWords = wordData
      .filter(item => 
      (selectedType === 'all' || item.type === selectedType) &&
      (selectedLevel === 'all' || item.level === selectedLevel) &&
      (selectedLesson === 'all' || item.lesson === Number(selectedLesson))
      )
      .flatMap(item => item.words.map(wordObj => wordObj.word)) // Extract the nested 'word' object
      .filter(word => word && typeof word === 'object'); // Ensure valid word objects

   // Debug: Log filtered words and current word
   useEffect(() => {
      console.log('Filtered words:', JSON.stringify(filteredWords, null, 2));
      console.log('Current word:', JSON.stringify(filteredWords[currentWordIndex], null, 2));
   }, [filteredWords, currentWordIndex]);

   const handleFlip = () => {
      setIsFlipped(!isFlipped);
   };

   const handleNext = () => {
      setCurrentWordIndex((prev) => 
      prev + 1 < filteredWords.length ? prev + 1 : 0
      );
      setIsFlipped(false);
   };

   const handlePrevious = () => {
      setCurrentWordIndex((prev) => 
      prev - 1 >= 0 ? prev - 1 : filteredWords.length - 1
      );
      setIsFlipped(false);
   };

   const handleTypeChange = (e) => {
      setSelectedType(e.target.value);
      setCurrentWordIndex(0);
      setIsFlipped(false);
   };

   const handleLevelChange = (e) => {
      setSelectedLevel(e.target.value);
      setSelectedLesson('all');
      setCurrentWordIndex(0);
      setIsFlipped(false);
   };

   const handleLessonChange = (e) => {
      setSelectedLesson(e.target.value);
      setCurrentWordIndex(0);
      setIsFlipped(false);
   };

   const currentWord = filteredWords[currentWordIndex];

   return (
      <div className={styles.container}>
         <Image className={styles.img}
            src='/images/back/reviewBack.jpg'
            alt='background image'
            fill
         />         

         <div className={styles.filterHolder}>
            <div className={styles.typeHolder}>
               <label htmlFor="level-select" className={styles.type}>Level</label>
               <select
               id="level-select"
               className={styles.select}
               value={selectedLevel}
               onChange={handleLevelChange}
               >
               <option value="all">All Levels</option>
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
               <option value="all">All Lessons</option>
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
               <option value="all">All Types</option>
               <option value="knownWords">Known</option>
               <option value="partialWords">Partial</option>
               <option value="unknownWords">Unknown</option>
               </select>
            </div>
         </div>

         {filteredWords.length > 0 && currentWord ? (
            <div className={styles.flashcardContainer}>
               <div className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
               onClick={handleFlip}
               >
                  <p className={styles.word}>{typeof currentWord.word === 'string' ? currentWord.word : 'No word'}</p>
                  <div className={styles.phonetics}>
                     <p>{currentWord.BrE}</p>
                     <p>{currentWord.AmE}</p>
                  </div>
                  <h3>{typeof currentWord.definition === 'string' ? currentWord.definition : 'No definition'}</h3>
                  {typeof currentWord.role === 'string' && currentWord.role && <p>Part of Speech: {currentWord.role}</p>}
                  {Array.isArray(currentWord.examples) && currentWord.examples.length > 0 ? (
                     <div>
                     <p><strong>Examples:</strong></p>
                     <ul>
                        {currentWord.examples.map((example, index) => (
                           <li key={index}>{typeof example === 'string' ? example : 'Invalid example'}</li>
                        ))}
                     </ul>
                     </div>
                  ) : (
                     <p>No examples available</p>
                  )}
               
            
               </div>
               <div className={styles.navigation}>
                  <button 
                     onClick={handlePrevious} 
                     disabled={filteredWords.length <= 1}
                     className={styles.navButton}
                  >
                     Previous
                  </button>
                  <span>{`${currentWordIndex + 1} / ${filteredWords.length}`}</span>
                  <button 
                     onClick={handleNext} 
                     disabled={filteredWords.length <= 1}
                     className={styles.navButton}
                  >
                     Next
                  </button>
               </div>
            </div>
         ) : (
            <p>No words available for the selected filters or invalid data.</p>
         )}
      </div>
   );
}

export default WordsReview;
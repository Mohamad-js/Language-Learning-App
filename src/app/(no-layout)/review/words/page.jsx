'use client'
import styles from './wordsReview.module.css'
import { useState, useEffect } from 'react';

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



function WordsReview(){
   const [wordData, setWordData] = useState([]);
   const [selectedType, setSelectedType] = useState()
   const [selectedLesson, setSelectedLesson] = useState()
   const [selectedLevel, setSelectedLevel] = useState()


   // Load data on component mount
   useEffect(() => {
      const data = aggregateWordsFromLocalStorage();
      setWordData(data);
   }, []);

   console.log('ALL DATA:',   wordData);

   const handleChange = (event) => {
      const typeValue = Array.from(event.target.selectedType, option => option.value);
      setSelectedType(typeValue);

      const LessonValue = Array.from(event.target.selectedLesson, option => option.value);
      setSelectedLesson(LessonValue);

      const LevelValue = Array.from(event.target.selectedLevel, option => option.value);
      setSelectedLevel(LevelValue);
   };



   return(
      <>
         <div className={styles.container}>
            <div className={styles.filterHolder}>
               <div className={styles.typeHolder}>
                  <label htmlFor="multi-select" className={styles.type}>Level</label>
                  <select className={styles.select}
                     value={selectedLevel}
                     onChange={handleChange}
                  >
                     <option value="A1">A1</option>
                     <option value="A2">A2</option>
                     <option value="B1">B1</option>
                     <option value="B2">B2</option>
                     <option value="C1">C1</option>
                     <option value="C2">C2</option>
                  </select>

               </div>
               <div className={styles.typeHolder}>
                  <label htmlFor="multi-select" className={styles.type}>Lesson</label>
                  <select className={styles.select}
                     value={selectedLesson}
                     onChange={handleChange}
                  >
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                  </select>

               </div>
               <div className={styles.typeHolder}>
                  <label htmlFor="multi-select" className={styles.type}>Type</label>
                  <select className={styles.select}
                     value={selectedType}
                     onChange={handleChange}
                  >
                     <option value="known">Known</option>
                     <option value="unknown">Unknown</option>
                     <option value="partial">Partial</option>
                  </select>

               </div>
            </div>
         </div>
      </>
   )
}

export default WordsReview;
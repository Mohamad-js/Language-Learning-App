import { openDB } from 'idb';

export const initDB = async () => {
   // Bumped version to 2 to force the browser to run the upgrade block
   return openDB('VocabularyDB', 2, {
      upgrade(db) {
         if (!db.objectStoreNames.contains('words')) {
            const store = db.createObjectStore('words', { keyPath: 'id', autoIncrement: true });
            store.createIndex('category', 'category', { unique: false });
            store.createIndex('lesson', 'lesson', { unique: false });
         }
      },
   });
};

/**
 * @param {string} categoryName - e.g., "Subject Pronouns"
 */
export const getWordsByCategory = async (categoryName) => {
   const db = await initDB();
   const results = await db.getAllFromIndex('words', 'category', categoryName);
   return results; 
};

export const getAllUniqueCategories = async () => {
   const db = await initDB();
   const tx = db.transaction('words', 'readonly');
   const store = tx.objectStore('words'); 

   const uniqueCategories = new Set();
   let cursor = await store.openCursor();

   while (cursor) {
      if (cursor.value.category) {
         uniqueCategories.add(cursor.value.category); 
      }
      cursor = await cursor.continue();
   }

   return Array.from(uniqueCategories); 
};

export const getAllWords = async () => {
   const db = await initDB();   
   const allWords = await db.getAll('words');
   
   const groupedLessons = allWords.reduce((acc, word) => {
      const lessonNum = word.lesson;
      
      const processedWord = {
         ...word,
         status: word.status || "waiting" 
      };

      if (!acc[lessonNum]) {
         acc[lessonNum] = {
            lesson: lessonNum,
            category: word.category || "General",
            status: "waiting", 
            content: []
         };
      }
      
      acc[lessonNum].content.push(processedWord);
      return acc;
   }, {});
   
   const lessonsArray = Object.values(groupedLessons).sort((a, b) => a.lesson - b.lesson);

   let foundFirstUnstudied = false;

   const finalLessons = lessonsArray.map(lessonObj => {
      const isFullyStudied = lessonObj.content.every(
         w => w.status === 'known' || w.status === 'unknown'
      );

      if (isFullyStudied) {
         lessonObj.status = 'done';
      } else {
         if (!foundFirstUnstudied) {
            lessonObj.status = 'ready';
            foundFirstUnstudied = true; 
         } else {
            lessonObj.status = 'waiting';
         }
      }

      return lessonObj;
   });

   return finalLessons;
};

export const getAllUniqueLessons = async () => {
   const db = await initDB();
   const allWords = await db.getAll('words'); 
   
   const lessons = allWords
      .map(word => word.lesson)
      .filter(lesson => lesson !== undefined && lesson !== null);
   
   return [...new Set(lessons)].sort((a, b) => a - b);
};

export const updateInteractionStatus = async (knownWordsList, unknownWordsList) => {
   const db = await initDB();
   const tx = db.transaction('words', 'readwrite');
   const store = tx.objectStore('words'); // Changed to use explicit objectStore
   
   for (const item of knownWordsList) {
      const wordToUpdate = item.word; 
      wordToUpdate.status = 'known'; 
      store.put(wordToUpdate); 
   }
   
   for (const item of unknownWordsList) {
      const wordToUpdate = item.word;
      wordToUpdate.status = 'unknown';
      store.put(wordToUpdate);
   }
   
   await tx.done; 
};

/**
 * @param {number} lessonNumber
 */
export const getWordsByLesson = async (lessonNumber) => {
   const db = await initDB();
   return await db.getAllFromIndex('words', 'lesson', Number(lessonNumber));
};

export const resetAllProgress = async () => {
   const db = await initDB();
   const tx = db.transaction('words', 'readwrite');
   const store = tx.objectStore('words');
   
   // Instantly wipe all data in the store instead of looping
   await store.clear();
   
   await tx.done;
};
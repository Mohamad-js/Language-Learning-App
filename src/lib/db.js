import { openDB } from 'idb';

export const initDB = async () => {
   // Keep your version stable at 5. Data synchronization is now handled dynamically above!
   return openDB('VocabularyDB', 5, {
      upgrade(db) {
         // Clean up deprecated stores safely
         if (db.objectStoreNames.contains('words')) {
            db.deleteObjectStore('words');
         }

         // Establish 'levels' store securely
         if (!db.objectStoreNames.contains('levels')) {
            const store = db.createObjectStore('levels', {
               keyPath: 'level',
            });

            store.createIndex('level', 'level', { unique: true });
            store.createIndex('status', 'status', { unique: false });
         }
      },
   });
};





export const getWordsByLevelAndCategory = async (levelName, categoryName) => {

   const db = await initDB();

   const level = await db.get("levels", levelName);

   if (!level) {
      return [];
   }

   const lesson = level.content.find(
      item => item.category === categoryName
   );

   return lesson?.words || [];
};




export const getAllCategoriesByLevel = async (levelName) => {
   const db = await initDB();

   const level = await db.get("levels", levelName);

   if (!level) {
      return [];
   }

   return level.content.map(
      lesson => lesson.category
   );
};





export const getLessonsByLevel = async (levelName) => {
   const db = await initDB();

   const level = await db.get("levels", levelName);

   if (!level) {
      return [];
   }

   // 1. Create a safe sort key
   // If it's a review (e.g., lessons: "1-5"), grab the "5" and add 0.5 so it sorts as 5.5
   const getSortKey = (item) => {
      if (item.type === 'review' && item.lessons) {
         const maxLesson = parseInt(item.lessons.split('-')[1], 10);
         return maxLesson + 0.5;
      }
      return item.lesson;
   };

   // Sort the mixed array of lessons and reviews
   const lessons = [...level.content].sort((a, b) => getSortKey(a) - getSortKey(b));

   // 2. Safely evaluate the 'done' status
   const finalLessons = lessons.map((item) => {
      let isFullyStudied = false;

      if (item.type === 'review') {
         // Reviews don't have a 'words' array. Check their explicit DB status instead.
         isFullyStudied = item.status?.toLowerCase() === 'done';
      } else if (item.words) {
         // Standard lessons check the 'words' array
         isFullyStudied = item.words.every(
            (word) => word.status === "known" || word.status === "unknown"
         );
      }

      // Return the item. If it's fully studied, mark it 'done'. 
      // Otherwise, pass its current status or default to 'waiting'.
      // (Your Words.js UI will upgrade the correct 'waiting' item to 'ready').
      return {
         ...item,
         status: isFullyStudied ? "done" : (item.status?.toLowerCase() || "waiting"),
      };
   });

   return finalLessons;
};






export const getReviewByNumber = async (levelName, reviewNumber) => {
   const db = await initDB();

   const level = await db.get("levels", levelName);

   if (!level || !level.content) {
      return null;
   }

   // Convert the parameter to a number in case it comes in as a string from the URL
   const targetReviewNum = parseInt(reviewNumber, 10);

   // Find the exact item that is both a review and matches the target number
   const reviewData = level.content.find(
      (item) => item.type === "review" && item.review === targetReviewNum
   );

   return reviewData || null;
};






export const updateInteractionStatus = async ({
   level,
   lesson,
   knownWords,
   unknownWords,
}) => {

   const db = await initDB();

   const levelData = await db.get("levels", level);

   if (!levelData) {
      throw new Error(`Level "${level}" not found`);
   }

   const lessonNumber = Number(lesson);

   const lessonData = levelData.content.find(
      item =>
         item.type === "studying" &&
         Number(item.lesson) === lessonNumber
   );

   if (!lessonData) {
      throw new Error(
         `Lesson "${lessonNumber}" not found in level "${level}"`
      );
   }

   const knownSet = new Set(
      knownWords.map(item => item.word.word)
   );

   const unknownSet = new Set(
      unknownWords.map(item => item.word.word)
   );

   lessonData.words.forEach(word => {

      if (knownSet.has(word.word)) {
         word.status = "known";
      } else if (unknownSet.has(word.word)) {
         word.status = "unknown";
      }

   });

   lessonData.status = "done";

   await db.put("levels", levelData);

   return true;
};






export const updateReviewStatus = async ({
   level,
   review,
}) => {

   const db = await initDB();

   const levelData = await db.get("levels", level);

   if (!levelData) {
      throw new Error(`Level "${level}" not found`);
   }

   const reviewData = levelData.content.find(
      item =>
         item.type === "review" &&
         Number(item.review) === Number(review)
   );

   if (!reviewData) {
      throw new Error(
         `Review "${review}" not found in level "${level}"`
      );
   }

   reviewData.status = "done";

   await db.put("levels", levelData);

   return true;
};






export const getLessonByNumber = async (levelName, lessonNumber) => {

   const db = await initDB();

   const level = await db.get("levels", levelName);

   if (!level) {
      return null;
   }

   const num = Number(lessonNumber);

   return (
      level.content.find(
         item => Number(item.lesson) === num
      ) || null
   );
};




export const resetAllProgress = async () => {

   const db = await initDB();

   const tx = db.transaction("levels", "readwrite");
   const store = tx.objectStore("levels");

   const levels = await store.getAll();

   for (const level of levels) {

      level.status = "waiting";

      for (const lesson of level.content) {

         lesson.status = "waiting";

         for (const word of lesson.words) {

            word.status = "waiting";

            if ("note" in word) {
               word.note = "";
            }

            if ("notes" in word) {
               word.notes = [];
            }
         }
      }

      await store.put(level);
   }

   await tx.done;

   return true;
};





export const resetLevelProgress = async (levelName) => {

   const db = await initDB();

   const level = await db.get("levels", levelName);

   if (!level) {
      throw new Error(`Level "${levelName}" not found`);
   }

   level.status = "waiting";

   for (const item of level.content) {

      item.status = "waiting";

      if (item.type === "studying") {

         for (const word of item.words) {

            word.status = "waiting";

            // Future notes support
            if ("note" in word) {
               word.note = "";
            }

            if ("notes" in word) {
               word.notes = [];
            }
         }

      } else if (item.type === "review") {

         // Reserved for future review-specific progress.
         // Example:
         // item.score = 0;
         // item.completedExercises = [];
      }
   }

   await db.put("levels", level);

   return true;
};






export const getAllWordsReview = async () => {
   const db = await initDB();

   const words = await db.getAll('words');

   return words.map(word => ({
      ...word,
      status: word.status || 'waiting'
   }));
};
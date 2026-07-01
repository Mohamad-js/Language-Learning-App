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
   words
}) => {

   const db = await initDB();

   const levelData = await db.get("levels", level);

   if (!levelData) {
      throw new Error(`Level "${level}" not found`);
   }

   const lessonIndex = levelData.content.findIndex(
      l => l.lesson === lesson
   );

   if (lessonIndex === -1) {
      throw new Error(`Lesson ${lesson} not found`);
   }

   const lessonData = levelData.content[lessonIndex];

   // Save every word's latest status
   lessonData.words = words;

   // Lesson is completed
   lessonData.status = "done";

   // Unlock next lesson or review
   if (lessonIndex + 1 < levelData.content.length) {
      const nextItem = levelData.content[lessonIndex + 1];

      if (nextItem.status === "locked") {
         nextItem.status = "ready";
      }
   }

   // Update overall level status
   const completedLessons = levelData.content.filter(
      item => item.status === "done"
   ).length;

   if (completedLessons === levelData.content.length) {
      levelData.status = "done";
   } else if (levelData.status === "waiting") {
      levelData.status = "ready";
   }

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

            // Future review progress reset
            // if ("score" in item) item.score = 0;
            // if ("attempts" in item) item.attempts = 0;
            // if ("completedAt" in item) item.completedAt = null;

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
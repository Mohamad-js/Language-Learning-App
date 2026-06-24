import { openDB } from 'idb';

export const initDB = async () => {
   return openDB('VocabularyDB', 5, {
      upgrade(db, oldVersion) {

         // Remove old store if it exists
         if (db.objectStoreNames.contains('words')) {
            db.deleteObjectStore('words');
         }

         // Create new store
         if (!db.objectStoreNames.contains('levels')) {
            const store = db.createObjectStore('levels', {
               keyPath: 'level',
            });

            store.createIndex('level', 'level', {
               unique: true,
            });

            store.createIndex('status', 'status', {
               unique: false,
            });
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

   const lessons = [...level.content].sort(
      (a, b) => a.lesson - b.lesson
   );

   let foundFirstUnstudied = false;

   const finalLessons = lessons.map((lesson) => {

      const isFullyStudied = lesson.words.every(
         (word) =>
            word.status === "known" ||
            word.status === "unknown"
      );

      if (isFullyStudied) {
         return {
            ...lesson,
            status: "done",
         };
      }

      if (!foundFirstUnstudied) {
         foundFirstUnstudied = true;

         return {
            ...lesson,
            status: "ready",
         };
      }

      return {
         ...lesson,
         status: "waiting",
      };
   });

   return finalLessons;
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
      item => Number(item.lesson) === lessonNumber
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
      }

      if (unknownSet.has(word.word)) {
         word.status = "unknown";
      }

   });

   lessonData.status = "done";

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

   for (const lesson of level.content) {

      lesson.status = "waiting";

      for (const word of lesson.words) {

         word.status = "waiting";

         // Future notes support
         if ("note" in word) {
            word.note = "";
         }

         if ("notes" in word) {
            word.notes = [];
         }
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
import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('VocabularyDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('words')) {
        const store = db.createObjectStore('words', { keyPath: 'id', autoIncrement: true });
        store.createIndex('category', 'category', { unique: false });
      }
    },
  });
};

/**
 * @param {string} categoryName - e.g., "Subject Pronouns"
 */
export const getWordsByCategory = async (categoryName) => {
  const db = await initDB();
  
  // .getAllFromIndex(objectStoreName, indexName, valueToLookFor)
  const results = await db.getAllFromIndex('words', 'category', categoryName);
  
  return results; 
};

export const getAllUniqueCategories = async () => {
   const db = await initDB();
   const tx = db.transaction('words', 'readonly');
   const store = tx.objectStore('words');
   const index = store.index('category');

   const uniqueCategories = [];
   
   // 'nextunique' tells the cursor to jump to the next unique category name instantly
   let cursor = await index.openKeyCursor(null, 'nextunique');

   while (cursor) {
      uniqueCategories.push(cursor.key); // cursor.key is the category name
      cursor = await cursor.continue();
   }

   return uniqueCategories;
};
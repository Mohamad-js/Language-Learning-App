"use client";

import { useEffect } from "react";
import { initDB } from "@/lib/db";

export default function VocabularyManager({ initialData = [] }) {
   useEffect(() => {
      const handleSeeding = async () => {
         // Safety check: Don't run if no data was passed
         if (!initialData || initialData.length === 0) return;

         const db = await initDB();
         const tx = db.transaction("words", "readwrite");
         const store = tx.objectStore("words");

         // Verify if words already exist so we don't duplicate on every page refresh
         const existingCount = await store.count();
         
         if (existingCount === 0) {
            console.log(`IndexedDB is empty. Seeding ${initialData.length} raw words...`);
            
            for (const word of initialData) {
               await store.put(word);
            }
            
            await tx.done;
            console.log("Database initialization complete!");
         } else {
            console.log(`Database already has ${existingCount} items. Skipping seed.`);
         }
      };

      handleSeeding();
   }, [initialData]);

  return null; 
}
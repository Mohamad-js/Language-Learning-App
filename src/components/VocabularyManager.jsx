"use client";

import { useEffect } from "react";
import { initDB } from "@/lib/db";

export default function VocabularyManager({ initialData = [] }) {
   useEffect(() => {

      const handleSeeding = async () => {

         if (!initialData?.length) return;

         try {
            const db = await initDB();

            const tx = db.transaction("levels", "readwrite");
            const store = tx.objectStore("levels");

            let addedCount = 0;

            for (const levelData of initialData) {

               const existingLevel = await store.get(levelData.level);

               if (!existingLevel) {
                  await store.put(levelData);
                  addedCount++;

                  console.log(
                     `Added level ${levelData.level} to IndexedDB`
                  );
               }
            }

            await tx.done;

            if (addedCount > 0) {
               console.log(
                  `Database updated. ${addedCount} new level(s) added.`
               );
            } else {
               console.log(
                  "All provided levels already exist. Nothing to seed."
               );
            }

         } catch (error) {
            console.error(
               "Error while seeding IndexedDB:",
               error
            );
         }
      };

      handleSeeding();

   }, [initialData]);

   return null;
}
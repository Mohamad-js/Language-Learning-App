"use client";

import { useEffect, useState } from "react";
import { initDB } from "@/lib/db";

export default function VocabularyManager({ initialData = [] }) {
   const [mobileLog, setMobileLog] = useState(""); 

   useEffect(() => {
      const handleSeeding = async () => {
         if (!initialData?.length) return;

         try {
            setMobileLog("Checking for vocabulary updates...");
            const db = await initDB();
            const tx = db.transaction("levels", "readwrite");
            const store = tx.objectStore("levels");

            let added = 0;
            let updated = 0;

            const getContentKey = (item) => {
               switch (item.type) {
                  case "studying":
                     return `lesson-${item.lesson}`;

                  case "review":
                     return `review-${item.review}`;

                  case "chest":
                     return `chest-${item.number}`;

                  default:
                     return "";
               }
            };

            await Promise.all(
               initialData.map(async (incomingLevel) => {
                  const existing = await store.get(incomingLevel.level);

                  // Case 1: Brand new level added to source code
                  if (!existing) {
                     await store.put(incomingLevel);
                     added++;
                     return;
                  }

                  // Case 2: Level exists. We must deep-merge to catch tiny changes
                  let levelChanged = false;

                  const mergedContent = incomingLevel.content.map((incomingLesson) => {

                     const existingLesson = existing.content?.find(
                        (l) => getContentKey(l) === getContentKey(incomingLesson)
                     );

                     // New lesson/review/chest added
                     if (!existingLesson) {
                        levelChanged = true;
                        return incomingLesson;
                     }

                     // Reviews and chests
                     if (incomingLesson.type !== "studying") {
                        return {
                           ...incomingLesson,
                           status: existingLesson.status || incomingLesson.status || "waiting",
                        };
                     }

                     // ---------- Studying lessons ----------

                     const mergedWords = incomingLesson.words.map((incomingWord) => {

                        const existingWord = existingLesson.words?.find(
                           (w) => w.word === incomingWord.word
                        );

                        if (!existingWord) {
                           levelChanged = true;
                           return incomingWord;
                        }

                        const structuralChange = Object.keys(incomingWord).some((key) => {
                           if (["status", "note", "notes"].includes(key)) return false;

                           return (
                              JSON.stringify(incomingWord[key]) !==
                              JSON.stringify(existingWord[key])
                           );
                        });

                        if (structuralChange) {
                           levelChanged = true;
                        }

                        return {
                           ...incomingWord,
                           status: existingWord.status || incomingWord.status || "waiting",
                           note: existingWord.note || incomingWord.note || "",
                           notes: existingWord.notes || incomingWord.notes || [],
                        };
                     });

                     if (existingLesson.words?.length !== incomingLesson.words?.length) {
                        levelChanged = true;
                     }

                     return {
                        ...incomingLesson,
                        status: existingLesson.status || incomingLesson.status || "waiting",
                        words: mergedWords,
                     };
                  });

                  // Check if lessons were removed or rearranged
                  if (existing.content?.length !== incomingLevel.content?.length) {
                     levelChanged = true;
                  }

                  // If any small change was detected, commit it to this device's IndexedDB
                  if (levelChanged) {
                     const updatedRecord = {
                        ...existing,
                        ...incomingLevel,
                        content: mergedContent,
                     };
                     await store.put(updatedRecord);
                     updated++;
                  }
               })
            );

            await tx.done;
            setMobileLog(`Sync Complete! Added: ${added} | Updated: ${updated}`);

         } catch (error) {
            setMobileLog(`CRASH: ${error.message || error}`);
         }
      };

      handleSeeding();
   }, [initialData]);

   // if (mobileLog) {
   //    return (
   //       <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-emerald-400 p-2 text-xs font-mono z-1 text-center pointer-events-none">
   //          {mobileLog}
   //       </div>
   //    );
   // }

   return null;
}
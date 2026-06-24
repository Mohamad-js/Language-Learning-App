"use client";

import { useEffect, useState } from "react";
import { initDB } from "@/lib/db";

export default function VocabularyManager({ initialData = [] }) {
   // A temporary physical log we can look at on the phone screen
   const [mobileLog, setMobileLog] = useState(""); 

   useEffect(() => {
      const handleSeeding = async () => {
         if (!initialData?.length) return;

         try {
            setMobileLog("Opening DB...");
            const db = await initDB();
            const tx = db.transaction("levels", "readwrite");
            const store = tx.objectStore("levels");

            let added = 0;
            let updated = 0;

            // USING PROMISE.ALL: This forces all get() requests into the microtask queue 
            // simultaneously, keeping the transaction pipe 100% saturated with work so mobile won't close it.
            await Promise.all(
               initialData.map(async (incomingLevel) => {
                  const existing = await store.get(incomingLevel.level);

                  // 1. Doesn't exist at all -> Insert
                  if (!existing) {
                     await store.put(incomingLevel);
                     added++;
                     return;
                  }

                  // 2. Exists, but incoming data has a bumped version number
                  // (e.g., incomingLevel.version = 2, existing.version = 1)
                  const incomingVer = incomingLevel.version || 1;
                  const existingVer = existing.version || 1;

                  if (incomingVer > existingVer) {
                     // We use a spread operator so that if your user had local data 
                     // saved inside that object (like .score = 100), we don't accidentally wipe it out.
                     const updatedRecord = {
                        ...existing,
                        ...incomingLevel,
                        version: incomingVer
                     };

                     await store.put(updatedRecord);
                     updated++;
                  }
               })
            );

            await tx.done;
            setMobileLog(`IDB Ready. Added: ${added} | Updated: ${updated}`);

         } catch (error) {
            setMobileLog(`CRASH: ${error.message || error}`);
         }
      };

      handleSeeding();
   }, [initialData]);

   // Remove this return block once you see it work on your phone once!
   if (mobileLog) {
      return (
         <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-emerald-400 p-2 text-xs font-mono z-[9999] text-center pointer-events-none">
            {mobileLog}
         </div>
      );
   }

   return null;
}
"use client";
import { IoVolumeMedium } from "react-icons/io5";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewExercise({ dictationData, onStepTwoFinished, skipPractice = false, saveProgress }) {
  // 🛡️ Safety Guard Clause: Block execution if data is missing or empty
  if (!dictationData || dictationData.length === 0) {
    return (
      <div className="w-full max-w-4xl h-[500px] mx-auto flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-slate-400 text-sm">Loading dictation exercise...</p>
      </div>
    );
  }

  // 1. Current step trackers
  const [currentStep, setCurrentStep] = useState(0);
  const currentRound = dictationData[currentStep];
  const currentWord = currentRound.Target.join("");

  // 2. Multi-slot state tracking
  const [filledBlanks, setFilledBlanks] = useState({}); // Stores correct drops: { slotIndex: "Letter" }
  const [usedOptionIndices, setUsedOptionIndices] = useState([]); // Tracks consumed option layout elements
  const [shakeSlot, setShakeSlot] = useState(null); // Tracks index of the circle currently vibrating in red

  const containerRef = useRef(null);
  const slotRefs = useRef([]); // Stores geometric coordinates for all letter targets

  // --- INSTANT STATE RESET ON STEP CHANGE ---
  const [prevStep, setPrevStep] = useState(0);
  if (currentStep !== prevStep) {
    setPrevStep(currentStep);
    setFilledBlanks({});
    setUsedOptionIndices([]);
    setShakeSlot(null);
  }

  // 3. Derived Math Progress Checkers
  const totalBlanksNeeded = currentRound.blanksPatten.filter((p) => p === 0).length;
  const totalBlanksFilled = Object.keys(filledBlanks).length;
  const isRoundComplete = totalBlanksFilled === totalBlanksNeeded;
  const isFinalStep = currentStep === dictationData.length - 1;

  // 4. Automated Step Progression Hook
   useEffect(() => {
      if (!currentWord) return;

      // Wait a short moment so the UI updates first
      const timer = setTimeout(() => {
         playPronunciation(currentWord);
      }, 300);

      return () => clearTimeout(timer);
   }, [currentStep]);

   useEffect(() => {
      if (!isRoundComplete) return;

      // Reinforce the pronunciation after success
      playPronunciation(currentWord);

      // Estimate audio duration
      const AUDIO_DELAY = 1800;

      if (!isFinalStep) {
         const timer = setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
         }, AUDIO_DELAY);

         return () => clearTimeout(timer);
      }

      // Final word
      const timer = setTimeout(() => {
         onStepTwoFinished?.(true);
      }, AUDIO_DELAY);

      return () => clearTimeout(timer);

   }, [isRoundComplete, isFinalStep, currentWord, onStepTwoFinished]);

  const playSound = (type) => {
    try {
      new Audio(`/sounds/${type}.mp3`).play();
    } catch (err) {}
  };

  const playPronunciation = (type) => {
    try {
      new Audio(`/sounds/A1/${type}-AmE.mp3`).play();
    } catch (err) {}
  };

  // 5. Dynamic Array Collision Engine
  const handleDragEnd = (event, info, letter, optionIndex) => {
    let matchedAnActiveSlot = false;

    // Loop through every letter index of the target word string array
    for (let i = 0; i < currentRound.Target.length; i++) {
      // Look exclusively at items flagged as blanks (0) that have not been filled yet
      if (currentRound.blanksPatten[i] === 0 && !filledBlanks[i]) {
        const slotNode = slotRefs.current[i];
        if (!slotNode) continue;

        const rect = slotNode.getBoundingClientRect();
        const dropX = info.point.x;
        const dropY = info.point.y;

        const isInsideSlot =
          dropX >= rect.left &&
          dropX <= rect.right &&
          dropY >= rect.top &&
          dropY <= rect.bottom;

        if (isInsideSlot) {
          matchedAnActiveSlot = true;

          // Check if dropped item character matches target character value (case-insensitive fallback check)
          if (letter.toLowerCase() === currentRound.Target[i].toLowerCase()) {
            
            playSound("confirm")

            // Persist the slot index value with its authentic assigned uppercase/lowercase form
            setFilledBlanks((prev) => ({ ...prev, [i]: currentRound.Target[i] }));
            setUsedOptionIndices((prev) => [...prev, optionIndex]);
          } else {
            // Wrong Letter Drop interaction
            playSound("wrong");
            setShakeSlot(i);
            setTimeout(() => setShakeSlot(null), 400);
          }
          break; // Match found inside this frame, cut loop evaluation short
        }
      }
    }
  };


  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-dvh mx-auto bg-background rounded-2xl shadow-inner overflow-hidden flex flex-col items-center justify-center gap-30 p-8"
    >

         <div className="absolute w-full flex flex-col items-start top-17 left-0 text-start px-5 gap-1">
            <div className="">Listen and complete the word.</div>

            <div className="w-full flex justify-between items-center text-start gap-3">
               {/* Header Level Count Display */}
               <div className="text-lg font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
                  Word {currentStep + 1} of {dictationData.length}
               </div>

               {
                  skipPractice &&
                     <button onClick={saveProgress}
                        className="px-5 py-2 rounded-2xl border active:bg-foreground active:text-background"
                     >Skip</button>
               }
            </div>

         </div>

      <AnimatePresence>
         {isRoundComplete && (
            <motion.div
               key={`hero-word-${currentStep}`}
               initial={{ opacity: 0, scale: 0.4, y: 25 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.8 }}
               transition={{ type: "spring", stiffness: 280, damping: 16 }}
               className="absolute top-[26%] z-40 flex flex-col items-center pointer-events-none"
            >
            <div className="px-10 py-4 bg-emerald-500 dark:bg-emerald-600 text-white font-extrabold text-5xl tracking-wide rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800">
               {currentRound.Target.join("")}
            </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Target Word Row Assembly */}
      <div className="w-full flex gap-1 justify-center items-center flex-wrap">
        {currentRound.Target.map((char, index) => {
          const isPreFilled = currentRound.blanksPatten[index] === 1;
          const isCorrectlyDropped = filledBlanks[index] !== undefined;
          const isShaking = shakeSlot === index;

          // Determine circle styling variations dynamically based on structural rules
          let circleClasses = "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100";
          
          if (isRoundComplete) {
            // 🌟 UPGRADE: When word finishes, turn ALL letters (even the pre-filled gray ones) solid green
            circleClasses = "border-green-500 bg-green-500 text-white dark:border-green-600 dark:bg-green-600 font-bold shadow-md";
          } else if (isPreFilled) {
            circleClasses = "border-slate-200 bg-slate-200/50 dark:border-slate-800 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border-dashed";
          } else if (isCorrectlyDropped) {
            circleClasses = "border-green-500 bg-green-500 text-white dark:border-green-600 dark:bg-green-600 font-bold";
          } else if (isShaking) {
            circleClasses = "border-red-500 bg-red-500 text-white dark:border-red-600 dark:bg-red-600";
          } else {
            circleClasses = "border-2 border-dashed border-blue-400 bg-blue-50/50 dark:border-blue-500/40 dark:bg-blue-950/20 animate-pulse";
          }

          return (
            <motion.div
               key={`${currentStep}-slot-${index}`}
               className={`${currentRound.Target.length < 7 ? 'w-13 h-13' : currentRound.Target.length < 9 && currentRound.Target.length > 6 ? 'w-10 h-10' : 'w-8 h-8'} rounded-full border-2 flex items-center justify-center text-xl font-semibold select-none shadow-sm transition-colors duration-200 ${circleClasses}`}
               ref={(el) => (slotRefs.current[index] = el)}
               animate={
                  isShaking 
                     ? { x: [-6, 6, -6, 6, 0], opacity: 1 } 
                     : isRoundComplete 
                     ? { opacity: 0.2, scale: 0.85 } // 🌟 Sinks into the background
                     : { x: 0, opacity: 1, scale: 1 }
               }
               transition={{ duration: 0.3 }}
               >
                  {isPreFilled && char}
                  {!isPreFilled && isCorrectlyDropped && filledBlanks[index]}
                  {!isPreFilled && !isCorrectlyDropped && ""}
            </motion.div>
          );
        })}
      </div>


      {/* Bottom Available Input Option Row Layout */}
      <div 
         className="w-full bg-foreground rounded-xl p-4 flex flex-wrap gap-2 justify-center items-center shadow-sm mb-4 transition-all"
      >

         {/* unseen */}
         {
            currentRound.optionLetters.length === usedOptionIndices.length && (
            <div className="w-11 h-11 opacity-0 pointer-events-none" />
         )}

        <AnimatePresence mode="popLayout">
          {currentRound.optionLetters.map((letter, optionIndex) => {
            const isUsed = usedOptionIndices.includes(optionIndex);

            if (isUsed) return null;

            

            return (
              <motion.div
                key={`${currentStep}-option-${optionIndex}`}
                layout
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ 
                  opacity: 0, 
                  x: -50,
                  scale: 0.5, 
                  transition: { duration: 0.2 } 
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: optionIndex * 0.05 
                }}
                className="relative"
              >
                <motion.div
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.15}
                  dragSnapToOrigin={true}
                  whileHover={{ scale: 1.1, cursor: "grab" }}
                  whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 50 }}
                  onDragEnd={(e, info) => handleDragEnd(e, info, letter, optionIndex)}
                  className="w-11 h-11 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-xl flex items-center justify-center shadow-md select-none touch-none border border-blue-500 dark:border-blue-400"
                >
                  {letter}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
         onClick={() => playPronunciation(currentWord)}
         className="flex gap-3 items-center bg-foreground text-background px-4 py-2 rounded-xl text-lg active:scale-95">
            <IoVolumeMedium size={30} className='text-gray-500' />
            Pronounce
         </button>
    </div>
  );
}
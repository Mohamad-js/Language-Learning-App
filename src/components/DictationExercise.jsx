"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DictationExercise({ dictationData, onStepTwoFinished }) {
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
    if (!isRoundComplete) return;

    playSound("step");

    if (!isFinalStep) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }

    // 🌟 Last step behavior: Doesn't show anything locally, just signals the parent component immediately
    const timer = setTimeout(() => {
      onStepTwoFinished?.(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isRoundComplete, isFinalStep, currentStep, onStepTwoFinished]);

  const playSound = (type) => {
    try {
      new Audio(`/sounds/${type}.mp3`).play();
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
            playSound("toast");
            
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
      className="relative w-full max-w-4xl h-[500px] mx-auto bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-inner overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-between p-8"
    >
      {/* Header Level Count Display */}
      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mt-2">
        Dictation — Word {currentStep + 1} of {dictationData.length}
      </div>

      {/* Target Word Word Row Assembly */}
      <div className="flex gap-3 justify-center items-center my-auto flex-wrap">
        {currentRound.Target.map((char, index) => {
          const isPreFilled = currentRound.blanksPatten[index] === 1;
          const isCorrectlyDropped = filledBlanks[index] !== undefined;
          const isShaking = shakeSlot === index;

          // Determine circle styling variations dynamically based on structural rules
          let circleClasses = "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100";
          if (isPreFilled) {
            circleClasses = "border-slate-200 bg-slate-200/50 dark:border-slate-800 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border-dashed";
          } else if (isCorrectlyDropped) {
            circleClasses = "border-green-500 bg-green-500 text-white dark:border-green-600 dark:bg-green-600 font-bold";
          } else if (isShaking) {
            circleClasses = "border-red-500 bg-red-500 text-white dark:border-red-600 dark:bg-red-600";
          } else {
            // Empty waiting target slot state classes
            circleClasses = "border-2 border-dashed border-blue-400 bg-blue-50/50 dark:border-blue-500/40 dark:bg-blue-950/20 animate-pulse";
          }

          return (
            <motion.div
              key={`${currentStep}-slot-${index}`}
              ref={(el) => (slotRefs.current[index] = el)}
              animate={isShaking ? { x: [-6, 6, -6, 6, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl font-semibold select-none shadow-sm transition-colors duration-200 ${circleClasses}`}
            >
              {isPreFilled && char}
              {!isPreFilled && isCorrectlyDropped && filledBlanks[index]}
              {!isPreFilled && !isCorrectlyDropped && ""}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Available Input Option Row Layout */}
      <div className="w-full max-w-xl bg-white dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800 min-h-[96px] flex gap-4 justify-center items-center shadow-sm mb-4">
        <AnimatePresence>
          {currentRound.optionLetters.map((letter, optionIndex) => {
            const isUsed = usedOptionIndices.includes(optionIndex);

            if (isUsed) return null; // Remove cleanly if matched successfully

            return (
              <motion.div
                key={`${currentStep}-option-${optionIndex}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
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
                  className="w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-xl flex items-center justify-center shadow-md select-none touch-none border border-blue-500 dark:border-blue-400"
                >
                  {letter}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
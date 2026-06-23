"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SemanticOrbit({ lessonData, onStepOneFinished }) {

   console.log('lessonData from Comp', lessonData);


  // 1. The Master Index tracking which Word we are currently on
  const [currentStep, setCurrentStep] = useState(0);

  // Grab the specific data for the active step
  const currentRound = lessonData[currentStep];
  const ROOT_WORD = currentRound.rootWord;

  // Active board state
  const [words, setWords] = useState(currentRound.options);
  const [matchedWords, setMatchedWords] = useState([]);
  
  // Feedback states
  const [shake, setShake] = useState(false);
  const [isCorrectDrop, setIsCorrectDrop] = useState(false); // ✨ NEW: Flash green on successful release

  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const [centerRect, setCenterRect] = useState(null);

  // --- FIXED: INSTANT STATE RESET ON STEP CHANGE ---
  const [prevStep, setPrevStep] = useState(0);
  if (currentStep !== prevStep) {
    setPrevStep(currentStep);
    setWords(lessonData[currentStep].options);
    setMatchedWords([]);
    setIsCorrectDrop(false); // Reset feedback on next step
  }

  useEffect(() => {
    const updateRect = () => {
      if (centerRef.current) setCenterRect(centerRef.current.getBoundingClientRect());
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [currentStep]);

  const playSound = (type) => {
    try {
      new Audio(`/sounds/${type}.mp3`).play();
    } catch (err) {}
  };

  const handleDragEnd = (event, info, word) => {
    if (!centerRect) return;
    const dropX = info.point.x;
    const dropY = info.point.y;
    const isInsideCenter =
      dropX >= centerRect.left && dropX <= centerRect.right &&
      dropY >= centerRect.top && dropY <= centerRect.bottom;

    if (isInsideCenter) {
      if (word.isCorrect) {
        playSound("true");
        
        // ✨ Trigger green flash state, then clear it after 500ms
        setIsCorrectDrop(true);
        setTimeout(() => setIsCorrectDrop(false), 500);

        setWords((prev) => prev.filter((w) => w.id !== word.id));
        setMatchedWords((prev) => [...prev, word]);
      } else {
        playSound("wrong");
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    }
  };
  
  const totalCorrectNeeded = currentRound.options.filter(w => w.isCorrect).length;
  const isRoundComplete = matchedWords.length === totalCorrectNeeded;
  const isFinalWordOfLesson = currentStep === lessonData.length - 1;

  useEffect(() => {
    if (!isRoundComplete) return;

    playSound("progress");

    if (!isFinalWordOfLesson) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      onStepOneFinished?.('practice2');
    }, 1200);

    return () => clearTimeout(timer);
  }, [isRoundComplete, isFinalWordOfLesson, currentStep, onStepOneFinished]);


  // Handles target nodes colors dynamically based on drop states
  const getCenterBgClass = () => {
    if (shake) return "bg-red-500";
    if (isCorrectDrop) return "bg-green-500 dark:bg-green-600"; // ✨ Turns green here on release
    return "bg-blue-600 dark:bg-blue-500";
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl h-[600px] mx-auto bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-inner overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
      
      {/* Target Node (Root Word) */}
      <motion.div
        ref={centerRef}
        // ✨ Adds a slight pulse scale effect alongside the color change when correct
        animate={{
          x: shake ? [-10, 10, -10, 10, 0] : 0,
          scale: isCorrectDrop ? [1, 1.08, 1] : 1
        }}
        transition={{ 
          x: { duration: 0.4 },
          scale: { duration: 0.4, ease: "easeInOut" }
        }}
        className={`relative z-10 flex flex-col items-center justify-center w-40 h-40 rounded-full shadow-2xl transition-colors duration-200 ${getCenterBgClass()}`}
      >
        <span className="text-2xl font-bold text-white mb-1">{ROOT_WORD}</span>
        <span className="text-xs font-semibold text-blue-200 tracking-widest uppercase mb-1">
          Word {currentStep + 1} of {lessonData.length}
        </span>
        <span className="text-sm font-medium text-blue-100">
          {matchedWords.length} / {totalCorrectNeeded}
        </span>
      </motion.div>

      {/* Orbiting Words */}
      <AnimatePresence>
        {words.map((word, index) => {
          const angle = (index / words.length) * Math.PI * 2;
          const radiusX = 90;
          const radiusY = 220;
          const startX = Math.cos(angle) * radiusX;
          const startY = Math.sin(angle) * radiusY;

          return (
            <motion.div
              key={`${currentStep}-${word.id}`}
              className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0, x: startX, y: startY }}
              animate={{ opacity: 1, scale: 1, x: startX, y: startY }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              exit={{ x: 0, y: 0, opacity: 0, scale: 0, transition: { duration: 0.3 } }}
            >
              <motion.div
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                dragSnapToOrigin={true}
                whileHover={{ scale: 1.1, cursor: "grab" }}
                whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 50 }}
                onDragEnd={(e, info) => handleDragEnd(e, info, word)}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ rotate: { repeat: Infinity, duration: 3 + index % 2, ease: "easeInOut" } }}
                className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold rounded-full shadow-lg border border-slate-200 dark:border-slate-700 select-none touch-none whitespace-nowrap"
              >
                {word.text}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* SUCCESS COMPLETION OVERLAY */}
      <AnimatePresence>
        {isRoundComplete && !isFinalWordOfLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-3xl mb-4">
                {isFinalWordOfLesson ? "🏆" : "🎉"}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {isFinalWordOfLesson ? "Lesson Complete!" : "Perfect Match!"}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                {isFinalWordOfLesson 
                  ? "You have successfully completed all collocations for this lesson."
                  : `You found all the correct pairs for "${ROOT_WORD}". Ready for the next one?`
                }
              </p>

               <p className="text-sm text-slate-500 dark:text-slate-400">
                  Loading next word...
               </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
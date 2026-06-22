"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// If you are using Next.js App Router for navigation later:
// import { useRouter } from "next/navigation";


export default function SemanticOrbit({ROOT_WORD, VOCAB_DATA}) {
  // router = useRouter(); // For when you wire up the buttons
  
  const [words, setWords] = useState(VOCAB_DATA);
  const [matchedWords, setMatchedWords] = useState([]);
  const [shake, setShake] = useState(false);
  
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const [centerRect, setCenterRect] = useState(null);

  // Derived state to check if game is finished
  const totalCorrectNeeded = VOCAB_DATA.filter(w => w.isCorrect).length;
  const isComplete = matchedWords.length === totalCorrectNeeded;

  useEffect(() => {
    const updateRect = () => {
      if (centerRef.current) setCenterRect(centerRef.current.getBoundingClientRect());
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);


  // Sound Helper
  const playSound = (type) => {
    try {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.play();
    } catch (err) {
      console.log("Audio muted or blocked by browser policy");
    }
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
        setWords((prev) => prev.filter((w) => w.id !== word.id));
        setMatchedWords((prev) => [...prev, word]);
      } else {
        playSound("wrong");
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-4xl h-[600px] mx-auto bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-inner overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center"
    >
      {/* Target Node */}
      <motion.div
        ref={centerRef}
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative z-10 flex flex-col items-center justify-center w-25 h-25 rounded-full shadow-2xl transition-colors duration-300 ${
          shake ? "bg-red-500" : "bg-blue-600 dark:bg-blue-500"
        }`}
      >
        <span className="text-2xl font-bold text-white mb-2">{ROOT_WORD}</span>
        <span className="text-sm font-medium text-blue-100">
          {matchedWords.length} / {totalCorrectNeeded}
        </span>
      </motion.div>

      {/* Orbiting Words */}
      <AnimatePresence>
        {words.map((word, index) => {
          const angle = (index / words.length) * Math.PI * 2;
          const radiusX = 110;
          const radiusY = 220;
          const startX = Math.cos(angle) * radiusX;
          const startY = Math.sin(angle) * radiusY;

          return (
            <motion.div
              key={word.id}
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
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">
                🎉
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Exercise Complete!
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                You mastered all the collocations for <span className="font-semibold text-blue-500">"{ROOT_WORD}"</span>.
              </p>

              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => console.log("Trigger Back")} 
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-600 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition text-sm"
                >
                  Review Lesson
                </button>
                <button 
                  onClick={() => console.log("Trigger Next")} 
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/30 transition text-sm"
                >
                  Next Exercise
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
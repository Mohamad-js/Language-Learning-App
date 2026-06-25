"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiTick } from "react-icons/ti";




export default function SemanticOrbit({ lessonData, onStepOneFinished }) {


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
      const audio = new Audio(`/sounds/${encodeURIComponent(type)}.mp3`);
      audio.play().catch((err) => {
         console.warn(`Failed to play sound (${type}):`, err);
      });
   };

   const playPronunciation = (type) => {
      // URL encode 'type' in case ROOT_WORD has spaces or special characters
      const safeType = encodeURIComponent(type);
      const audio = new Audio(`/sounds/A1/${safeType}-AmE.mp3`);
      
      audio.play().catch((err) => {
         console.warn(`Failed to play pronunciation for (${type}):`, err);
      });
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
            // ✨ Trigger green flash state, then clear it after 500ms
            setIsCorrectDrop(true);
            setTimeout(() => setIsCorrectDrop(false), 500);
            playSound("confirm");

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

      playPronunciation(ROOT_WORD);

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
      if (shake) return "bg-red-500 opacity-[0.5] border border-red-500";
      if (isCorrectDrop) return "bg-green-500 opacity-[0.5] border border-green-500";
      return "bg-black/0 border border-white";
   };

   return (
      <div ref={containerRef} className="absolute top-0 left-0 w-full bg-background h-dvh mx-auto shadow-inner overflow-hidden flex items-center justify-center">

         <div className="absolute w-full top-17 left-0 text-start pl-5">Drag the correct word to the image.</div>
         
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
            className={`relative z-10 overflow-hidden flex items-center justify-center w-60 h-60 rounded-full shadow-2xl transition-colors duration-200`}
         >
            <div className="w-full h-full">
               <Image className='object-cover object-center'
                  src={`/images/a1/${ROOT_WORD}.png`}
                  fill
                  alt='Word Pic'
               />
            </div>

            <div className={`absolute w-full h-full ${getCenterBgClass()}`}></div>

         {/* <span className="text-sm font-medium">
            {matchedWords.length} / {totalCorrectNeeded}
         </span> */}
         </motion.div>

         {/* Orbiting Words */}
         <div className="absolute bottom-12 left-0 w-full px-6 flex flex-wrap justify-center items-center gap-4 z-20 pointer-events-none">
            <AnimatePresence mode="popLayout">
               {words.map((word, index) => (
                  <motion.div
                     key={`${currentStep}-${word.id}`}
                     layout // 🌟 CRITICAL: Makes remaining words smoothly slide over to fill the empty space when one is deleted!
                     initial={{ opacity: 0, scale: 0.5, y: 30 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0 }}
                     transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        layout: { duration: 0.3 } // Speed of the flex "gap closing"
                     }}
                     className="pointer-events-auto"
                  >
                     <motion.div
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.2}
                        dragSnapToOrigin={true}
                        whileHover={{ scale: 1.1, cursor: "grab" }}
                        whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 50 }}
                        onDragEnd={(e, info) => handleDragEnd(e, info, word)}
                        // Re-applied your nice subtle floating rotation
                        animate={{ rotate: [-2, 2, -2] }}
                        transition={{ 
                           rotate: { repeat: Infinity, duration: 3 + (index % 2), ease: "easeInOut" } 
                        }}
                        className="px-5 py-3 bg-foreground text-background font-semibold rounded-full shadow-lg select-none touch-none whitespace-nowrap border border-border/10"
                     >
                        {word.text}
                     </motion.div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>

         {/* SUCCESS COMPLETION OVERLAY */}
         <AnimatePresence>
         {isRoundComplete && !isFinalWordOfLesson && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/10 backdrop-blur-md p-4"
            >
               <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-green-800 rounded-2xl w-full shadow-2xl flex flex-col items-center justify-between gap-6 p-3 pb-6"
               >

                  <div className="w-full flex justify-center items-end">
                     <TiTick className="text-green-200" size={50} />

                     <div className="text-white text-2xl font-bold">CORRECT</div>
                  </div>

                  <div className="w-full flex justify-center items-center gap-3 text-white">
                     <p className="text-3xl">
                        {ROOT_WORD}
                     </p>
                  </div>

               </motion.div>
            </motion.div>
         )}
         </AnimatePresence>

      </div>
   );
}
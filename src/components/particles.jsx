'use client';

import { motion } from "framer-motion";

const floatingParticles = Array.from({ length: 18 }, (_, i) => ({
   id: i,
   left: `${10 + Math.random() * 80}%`,
   top: `${10 + Math.random() * 80}%`,
   size: 3 + Math.random() * 4,
   duration: 2.5 + Math.random() * 2,
   delay: Math.random() * 2,
}));

const stars = Array.from({ length: 8 }, (_, i) => ({
   id: i,
   left: `${15 + Math.random() * 70}%`,
   top: `${15 + Math.random() * 70}%`,
   delay: Math.random() * 3,
}));

const rays = Array.from({ length: 4 }, (_, i) => ({
   id: i,
   rotate: -30 + i * 20,
   delay: i * 0.4,
}));

export const ChestParticles = () => {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

         {/* Soft glow */}
         <motion.div
            className="absolute inset-6 rounded-full bg-yellow-300/20 blur-3xl"
            animate={{
               scale: [0.95, 1.08, 0.95],
               opacity: [0.35, 0.75, 0.35],
            }}
            transition={{
               duration: 3,
               repeat: Infinity,
               ease: "easeInOut",
            }}
         />

         {/* Light rays */}
         {rays.map(ray => (
            <motion.div
               key={ray.id}
               className="absolute left-1/2 top-1/2 origin-bottom w-[3px] h-40 bg-yellow-200/30 blur-sm"
               style={{
                  rotate: ray.rotate,
               }}
               animate={{
                  opacity: [0.1, 0.55, 0.1],
                  scaleY: [0.85, 1.1, 0.85],
               }}
               transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: ray.delay,
                  ease: "easeInOut",
               }}
            />
         ))}

         {/* Floating glowing particles */}
         {floatingParticles.map(p => (
            <motion.div
               key={p.id}
               className="absolute rounded-full bg-yellow-200"
               style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  boxShadow: "0 0 10px rgb(253 224 71)",
               }}
               animate={{
                  y: [-5, 6, -5],
                  x: [-2, 2, -2],
                  scale: [0.8, 1.35, 0.8],
                  opacity: [0.35, 1, 0.35],
               }}
               transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
               }}
            />
         ))}

         {/* Twinkling stars */}
         {stars.map(star => (
            <motion.div
               key={star.id}
               className="absolute text-yellow-100 text-lg font-bold"
               style={{
                  left: star.left,
                  top: star.top,
               }}
               animate={{
                  scale: [0, 1.4, 0],
                  rotate: [0, 180],
                  opacity: [0, 1, 0],
               }}
               transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: star.delay,
               }}
            >
               ✦
            </motion.div>
         ))}

      </div>
   );
}
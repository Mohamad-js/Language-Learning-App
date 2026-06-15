'use client';

import { motion } from 'motion/react';

const bubbles = [
  {
    color: 'bg-violet-500/70',
    size: 'w-[800px] h-[650px]',
    position: 'top-[-120px] left-[-100px]',
    duration: 40,
  },
  {
    color: 'bg-pink-500/70',
    size: 'w-[1050px] h-[800px]',
    position: 'bottom-[-150px] right-[-120px]',
    duration: 52,
  },
  {
    color: 'bg-fuchsia-500/70',
    size: 'w-[700px] h-[600px]',
    position: 'top-[30%] left-[45%]',
    duration: 31,
  },
];

const flyingWords = [
  {
    text: 'Treaty',
    className: 'text-sm',
    delay: 0,
    startX: '-20vw',
    endX: '120vw',
    startY: '80vh',
    endY: '10vh',
    duration: 18,
  },
  {
    text: 'Prospect',
    className: 'text-lg',
    delay: 2,
    startX: '110vw',
    endX: '-20vw',
    startY: '20vh',
    endY: '90vh',
    duration: 22,
  },
  {
    text: 'Knowledge',
    className: 'text-md',
    delay: 4,
    startX: '15vw',
    endX: '80vw',
    startY: '110vh',
    endY: '-20vh',
    duration: 20,
  },
  {
    text: 'Dream',
    className: 'text-xl',
    delay: 6,
    startX: '80vw',
    endX: '10vw',
    startY: '-20vh',
    endY: '110vh',
    duration: 18,
  },
  {
    text: 'Exile',
    className: 'text-sm',
    delay: 8,
    startX: '-20vw',
    endX: '120vw',
    startY: '60vh',
    endY: '20vh',
    duration: 24,
  },
  {
    text: 'Travel',
    className: 'text-sm',
    delay: 10,
    startX: '120vw',
    endX: '-20vw',
    startY: '75vh',
    endY: '25vh',
    duration: 15,
  },
  {
    text: 'Future',
    className: 'text-md',
    delay: 12,
    startX: '-20vw',
    endX: '100vw',
    startY: '100vh',
    endY: '-10vh',
    duration: 21,
  },
  {
    text: 'Speak',
    className: 'text-xl',
    delay: 14,
    startX: '100vw',
    endX: '-20vw',
    startY: '-10vh',
    endY: '100vh',
    duration: 19,
  },
  {
    text: 'Connect',
    className: 'text-xl',
    delay: 16,
    startX: '20vw',
    endX: '70vw',
    startY: '110vh',
    endY: '-20vh',
    duration: 20,
  },
  {
    text: 'Yank',
    className: 'text-xl',
    delay: 18,
    startX: '70vw',
    endX: '20vw',
    startY: '-20vh',
    endY: '110vh',
    duration: 23,
  },
];

export default function AnimatedAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Blob 1 */}
      <motion.div
        className={`
          absolute
          ${bubbles[0].position}
          ${bubbles[0].size}
          ${bubbles[0].color}
          blur-[70px]
        `}
        style={{
          borderRadius: '60% 40% 35% 65% / 45% 60% 40% 55%',
        }}
        animate={{
          x: [0, 500, 250, -200, 0],
          y: [0, 500, 200, -150, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
          rotate: [0, 40, -25, 15, 0],
        }}
        transition={{
          duration: bubbles[0].duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className={`
          absolute
          ${bubbles[1].position}
          ${bubbles[1].size}
          ${bubbles[1].color}
          blur-[70px]
        `}
        style={{
          borderRadius: '35% 65% 60% 40% / 55% 35% 65% 45%',
        }}
        animate={{
          x: [0, -600, -300, 150, 0],
          y: [0, -600, -250, 150, 0],
          scale: [1, 0.85, 1.15, 1, 1],
          rotate: [0, -35, 25, -10, 0],
        }}
        transition={{
          duration: bubbles[1].duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className={`
          absolute
          ${bubbles[2].position}
          ${bubbles[2].size}
          ${bubbles[2].color}
          blur-[70px]
        `}
        style={{
          borderRadius: '55% 45% 65% 35% / 40% 60% 40% 60%',
        }}
        animate={{
          x: [0, 300, -500, 400, 0],
          y: [0, -400, 250, 500, 0],
          scale: [1, 1.25, 0.85, 1.1, 1],
          rotate: [0, 50, -40, 20, 0],
        }}
        transition={{
          duration: bubbles[2].duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Flying words */}
      {flyingWords.map((word) => (
        <motion.div
          key={word.text}
          className={`
            absolute
            whitespace-nowrap
            font-bold
            ${word.className}
            text-purple-700/25
            select-none
          `}
          initial={{
            x: word.startX,
            y: word.startY,
            opacity: 0,
          }}
          animate={{
            x: word.endX,
            y: word.endY,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: word.duration,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'linear',
            delay: word.delay,
          }}
        >
          {word.text}
        </motion.div>
      ))}

      {/* Visible White Particle Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.5]">
      <div
         className="absolute inset-0"
         style={{
            backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.95) 1.2px, transparent 1.2px)
            `,
            backgroundSize: '20px 20px',
         }}
      />
      </div>
    </div>
  );
}
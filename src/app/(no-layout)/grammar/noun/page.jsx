'use client';
import { useState, useRef } from 'react';
import styles from './noun.module.css';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import GradientText from '@/components/gradientText/GradientText';
import { ReactLenis } from '@studio-freight/react-lenis';


function Noun() {




  return (
   <ReactLenis
      options={{
      duration: 2, // Animation duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      lerp: 0, // Linear interpolation intensity (0 to 1)
      smoothWheel: true, // Enable smooth scrolling for mouse wheel
      smoothTouch: true, // Disable smooth scrolling for touch (optional, can be unstable on iOS < 16)
      wheelMultiplier: 1, // Adjust scroll speed for mouse wheel
      touchMultiplier: 1, // Adjust scroll speed for touch
      infinite: false, // Enable infinite scrolling (requires syncTouch: true for touch devices)
   }}
   root
  >

      <div className={styles.container}>

         <Link href="/grammar" className={styles.backHolder}>
            <IoIosArrowBack className={styles.backSign} />
            <div className={styles.backText}>Back</div>
         </Link>

         <div className={styles.leftScroll}></div>
         <div className={styles.rightScroll}></div>
         <div className={styles.leftScroll2}></div>
         <div className={styles.rightScroll2}></div>

         <div className={styles.titleHolder}>
            <GradientText
               colors={["#40ffaa", "#9900ff", "#ff00c8", "#ff0040", "#ff00f2"]}
               animationSpeed={4}
               showBorder={false}
               className={styles.title}
            >
               NOUNS
            </GradientText>
         </div>

         <div className={styles.learningBlock}>
            <div className={styles.sections}>
               A noun is any word related to objects, places, names and concepts.
            </div>
            <div className={styles.sections}>
               A noun is any word related to objects, places, names and concepts.
            </div>
            <div className={styles.sections}>
               A noun is any word related to objects, places, names and concepts.
            </div>
            <div className={styles.sections}>
               A noun is any word related to objects, places, names and concepts.
            </div>
            <div className={styles.sections}>
               A noun is any word related to objects, places, names and concepts.
            </div>
            <div className={styles.sections}>
               A noun is any word related to objects, places, names and concepts.
            </div>
         </div>
      
      </div>

   </ReactLenis>
  );
}

export default Noun;
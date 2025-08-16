'use client';
import { useState, useRef } from 'react';
import styles from './noun.module.css';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import GradientText from '@/components/gradientText/GradientText';


function Noun() {




  return (


   <div className={styles.container}>

      <Link href="/grammar" className={styles.backHolder}>
         <IoIosArrowBack className={styles.backSign} />
         <div className={styles.backText}>Back</div>
      </Link>

      <div className={styles.learningTrack}>
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
         <div className={styles.sections}>
            A noun is any word related to one of these groups:

            <div className={styles.shapesHolder}>
               <div className={styles.blobs}>Objects</div>
               <div className={styles.blobs}>Places</div>
               <div className={styles.blobs}>Concepts</div>
            </div>
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

  );
}

export default Noun;
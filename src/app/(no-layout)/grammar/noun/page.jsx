'use client';
import { useState, useRef } from 'react';
import styles from './noun.module.css';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import GradientText from '@/components/gradientText/GradientText';
import { Fade } from 'react-awesome-reveal';



function Noun() {




  return (


   <div className={styles.container}>

      <Link href="/grammar" className={styles.backHolder}>
         <IoIosArrowBack className={styles.backSign} />
         <div className={styles.backText}>Back</div>
      </Link>

      <div className={styles.learningTrack}>
         <div className={styles.rightScroll}></div>



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
            <div className={styles.content}>
               <div className={styles.info}>
                  A noun is any word that belongs to one of these groups below:
               </div>

               <div className={styles.shapesHolder}>
                  <Fade cascade delay={1000}>
                     <div className={styles.blobs}>Objects</div>
                     <div className={styles.blobs}>Places</div>
                     <div className={styles.blobs}>Concepts</div>
                  </Fade>
               </div>

               <div className={styles.exHolder}>
                  <div className={styles.exColumn}>
                     <Fade delay={2500}>
                        <div className={styles.text}>Pen</div>
                        <div className={styles.text}>Car</div>
                        <div className={styles.text}>Table</div>
                        <div className={styles.text}>Bag</div>
                        <div className={styles.text}>Phone</div>
                        <div className={styles.text}>Rocket</div>
                     </Fade>
                  </div>

                  <div className={styles.exColumn}>
                     <Fade delay={2500}>
                        <div className={styles.text}>Countires</div>
                        <div className={styles.text}>Seas</div>
                        <div className={styles.text}>Oceans</div>
                        <div className={styles.text}>Rivers</div>
                        <div className={styles.text}>Streets</div>
                        <div className={styles.text}>Mounains</div>
                     </Fade>
                  </div>

                  <div className={styles.exColumn}>
                     <Fade delay={2500}>
                        <div className={styles.text}>Jealousy</div>
                        <div className={styles.text}>Truth</div>
                        <div className={styles.text}>Happiness</div>
                        <div className={styles.text}>Beauty</div>
                        <div className={styles.text}>Secret</div>
                        <div className={styles.text}>Importance</div>
                     </Fade>
                  </div>
                  
               </div>
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
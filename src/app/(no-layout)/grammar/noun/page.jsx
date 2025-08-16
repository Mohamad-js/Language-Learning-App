'use client';
import { useState, useRef } from 'react';
import styles from './noun.module.css';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import GradientText from '@/components/gradientText/GradientText';
import { Fade, Slide } from 'react-awesome-reveal';
import Particles from '@/components/particles/Particles';




function Noun() {




  return (


   <div className={styles.container}>

      <Link href="/grammar" className={styles.backHolder}>
         <IoIosArrowBack className={styles.backSign} />
         <div className={styles.backText}>Back</div>
      </Link>

      <div style={{ width: '100%', height: '100dvh', position: 'absolute', left: 0 }}>
         <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
         />
      </div>

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
         <div className={styles.contentHolder}>
            <div className={styles.content}>
               <div className={styles.info}>
                  A noun is any word that belongs to one of these groups below:
               </div>

               <div className={styles.shapesHolder}>
               </div>

               <div className={styles.exHolder}>
                  <div className={styles.exColumn}>
                     <Slide direction="left" duration={1000} delay={500}>
                        <Fade delay={500}>
                           <div className={styles.blobs}>Objects</div>
                        </Fade>
                     </Slide>
                     <Fade delay={1500}>
                        <Slide delay={1500} direction='up'>
                           <div className={styles.text}>Pen</div>
                           <div className={styles.text}>Car</div>
                           <div className={styles.text}>Table</div>
                           <div className={styles.text}>Bag</div>
                           <div className={styles.text}>Phone</div>
                           <div className={styles.text}>Rocket</div>
                        </Slide>
                     </Fade>
                  </div>

                  <div className={styles.exColumn}>
                     <Slide  direction="up" duration={1000} delay={500}>
                        <Fade delay={500}>
                           <div className={styles.blobs}>Places</div>
                        </Fade>
                     </Slide>
                     <Fade delay={1600}>
                        <Slide delay={1600} direction='up'>
                           <div className={styles.text}>Countires</div>
                           <div className={styles.text}>Seas</div>
                           <div className={styles.text}>Oceans</div>
                           <div className={styles.text}>Rivers</div>
                           <div className={styles.text}>Streets</div>
                           <div className={styles.text}>Mounains</div>
                        </Slide>
                     </Fade>
                  </div>

                  <div className={styles.exColumn}>
                     <Slide direction="right" duration={1000} delay={500}>
                        <Fade delay={500}>
                           <div className={styles.blobs}>Concepts</div>
                        </Fade>
                     </Slide>
                     <Fade delay={1700}>
                        <Slide delay={1700} direction='up'>
                           <div className={styles.text}>Jealousy</div>
                           <div className={styles.text}>Truth</div>
                           <div className={styles.text}>Happiness</div>
                           <div className={styles.text}>Beauty</div>
                           <div className={styles.text}>Secret</div>
                           <div className={styles.text}>Anger</div>
                        </Slide>
                     </Fade>
                  </div>
                  
               </div>
            </div>
         </div>
         <div className={styles.contentHolder}>
            A noun is any word related to objects, places, names and concepts.
         </div>
         <div className={styles.contentHolder}>
            A noun is any word related to objects, places, names and concepts.
         </div>
         <div className={styles.contentHolder}>
            A noun is any word related to objects, places, names and concepts.
         </div>
         <div className={styles.contentHolder}>
            A noun is any word related to objects, places, names and concepts.
         </div>
         <div className={styles.contentHolder}>
            A noun is any word related to objects, places, names and concepts.
         </div>
      </div>

   
   </div>

  );
}

export default Noun;
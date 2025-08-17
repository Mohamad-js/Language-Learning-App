'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './noun.module.css';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import GradientText from '@/components/gradientText/GradientText';
import { Fade, Slide } from 'react-awesome-reveal';
import Particles from '@/components/particles/Particles';



function Noun() {
   const audioRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(true);

   useEffect(() => {
      if (audioRef.current) {
         audioRef.current.play().catch((error) => {
            console.error('Error playing audio:', error);
         });
      }
   }, []);

   const togglePlayPause = () => {
      if (audioRef.current) {
         if (isPlaying) {
            audioRef.current.pause();
         } else {
            audioRef.current.play().catch((error) => {
               console.error('Error playing audio:', error);
            });
         }
         setIsPlaying(!isPlaying);
      }
   };



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

      <audio
         ref={audioRef}
         src="/soundTracks/LessonOne.m4a"
         loop
         autoPlay
      />
      <button
         onClick={togglePlayPause}
         className={styles.audio}
      >
         {isPlaying ? 'Pause' : 'Play'} Music
      </button>

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
               <div className={styles.steps}>1</div>

               <Fade delay={1000} triggerOnce>
                  <div className={styles.info}>
                     A noun is any word that is an object, place or a concept.
                  </div>
               </Fade>

            </div>
         </div>
         <div className={styles.contentHolder}>
            <div className={styles.content}>
               <div className={styles.info}>
                  For Example:
               </div>

               <div className={styles.exHolder}>
                  <div className={styles.exColumn}>
                     <Slide triggerOnce direction="left" duration={1000} delay={500}>
                        <Fade triggerOnce delay={500}>
                           <div className={styles.blobs}>Objects</div>
                        </Fade>
                     </Slide>
                     <Fade triggerOnce delay={1500}>
                        <Slide triggerOnce delay={1500} direction='up'>
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
                     <Slide triggerOnce  direction="up" duration={1000} delay={500}>
                        <Fade triggerOnce delay={500}>
                           <div className={styles.blobs}>Places</div>
                        </Fade>
                     </Slide>
                     <Fade triggerOnce delay={1600}>
                        <Slide triggerOnce delay={1600} direction='up'>
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
                     <Slide triggerOnce direction="right" duration={1000} delay={500}>
                        <Fade triggerOnce delay={500}>
                           <div className={styles.blobs}>Concepts</div>
                        </Fade>
                     </Slide>
                     <Fade triggerOnce delay={1700}>
                        <Slide triggerOnce delay={1700} direction='up'>
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
            <div className={styles.content}>
               <div className={styles.steps}>2</div>

               <Fade triggerOnce delay={1000}>
                  <div className={styles.info}>
                     Nouns in English often have one or two suffixes at the end.
                  </div>
               </Fade>

            </div>
         </div>
         <div className={styles.contentHolder}>
            <div className={styles.content}>
               <div className={styles.info}>
                  Some noun suffixes are:
               </div>

               <div className={styles.exHolder}>
                  <div className={styles.exColumn}>
                     <Slide triggerOnce direction="left" duration={1000} delay={500}>
                        <Fade triggerOnce delay={500}>
                           <div className={styles.blobs}>-tion</div>
                        </Fade>
                     </Slide>
                     <Fade triggerOnce delay={1500}>
                        <Slide triggerOnce delay={1500} direction='up'>
                           <div className={styles.text}>action</div>
                           <div className={styles.text}>mention</div>
                           <div className={styles.text}>attraction</div>
                           <div className={styles.text}>function</div>
                           <div className={styles.text}>correction</div>
                           <div className={styles.text}>sanction</div>
                        </Slide>
                     </Fade>
                  </div>

                  <div className={styles.exColumn}>
                     <Slide triggerOnce  direction="up" duration={1000} delay={500}>
                        <Fade triggerOnce delay={500}>
                           <div className={styles.blobs}>-ment</div>
                        </Fade>
                     </Slide>
                     <Fade triggerOnce delay={1600}>
                        <Slide triggerOnce delay={1600} direction='up'>
                           <div className={styles.text}>treatment</div>
                           <div className={styles.text}>assessment</div>
                           <div className={styles.text}>document</div>
                           <div className={styles.text}>agreement</div>
                           <div className={styles.text}>development</div>
                           <div className={styles.text}>payment</div>
                        </Slide>
                     </Fade>
                  </div>

                  <div className={styles.exColumn}>
                     <Slide triggerOnce direction="right" duration={1000} delay={500}>
                        <Fade triggerOnce delay={500}>
                           <div className={styles.blobs}>-ness</div>
                        </Fade>
                     </Slide>
                     <Fade triggerOnce delay={1700}>
                        <Slide triggerOnce delay={1700} direction='up'>
                           <div className={styles.text}>sadness</div>
                           <div className={styles.text}>happiness</div>
                           <div className={styles.text}>madness</div>
                           <div className={styles.text}>kindness</div>
                           <div className={styles.text}>softness</div>
                           <div className={styles.text}>illness</div>
                        </Slide>
                     </Fade>
                  </div>
               </div>

               <Slide triggerOnce direction="up" duration={1000} delay={2000}>
                  <Fade triggerOnce delay={2000}>
                     <div className={styles.alarm}>you will learn everything about suffixes in later lessons</div>
                  </Fade>
               </Slide>

            </div>
         </div>
         <div className={styles.contentHolder}>
            <div className={styles.content}>
               <div className={styles.steps}>3</div>

               <Fade triggerOnce delay={1000}>
                  <div className={styles.info}>
                     Nouns are always part of the <span style={{color: '#D2042D'}}>subject</span> and <span style={{color: '#D2042D'}}>object</span> of a sentence.
                  </div>
               </Fade>

            </div>
         </div>
         <div className={styles.contentHolder}>
            <div className={styles.content}>
               <div className={styles.info}>
                  For Example:
               </div>

               <Slide triggerOnce direction="up" duration={1000} delay={500}>
                  <Fade triggerOnce delay={500}>
                     <div className={styles.text}>
                        <span style={{color: '#D2042D'}}>The pen</span> is so beautiful.
                     </div>
                  </Fade>
               </Slide>

               <Slide triggerOnce direction="up" duration={1000} delay={1000}>
                  <Fade triggerOnce delay={1000}>
                     <div className={styles.text}>
                        Your French <span style={{color: '#D2042D'}}>friend</span> has a nice <span style={{color: '#D2042D'}}>car</span>.
                     </div>
                  </Fade>
               </Slide>

               <Slide triggerOnce direction="up" duration={1000} delay={1500}>
                  <Fade triggerOnce delay={1500}>
                     <div className={styles.text}>
                        she eats a lot of <span style={{color: '#D2042D'}}>apples</span> every day morning.
                     </div>
                  </Fade>
               </Slide>
            </div>
         </div>
      </div>

   
   </div>

  );
}

export default Noun;
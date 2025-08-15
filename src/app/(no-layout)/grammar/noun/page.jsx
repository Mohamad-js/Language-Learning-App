'use client';
import { useState, useRef } from 'react';
import Loader from '@/components/loading/loading';
import styles from './noun.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import ScrollReveal from '@/components/scrollReveal/ScrollReveal.jsx';
import { ReactLenis } from '@studio-freight/react-lenis';

function Noun() {
  const [loadedImages, setLoadedImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const totalImages = 1;
  const scrollContainerRef = useRef(null);

  const handleImageLoad = () => {
    setLoadedImages((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
        setIsLoading(false);
      }
      return newCount;
    });
  };

  return (
    <div className={styles.container} ref={scrollContainerRef} style={{ position: 'relative', minHeight: '300vh' }}>

      <div className={styles.imgHolder}>
         <Image
            className={styles.background}
            src="/images/back/SenEle.jpg"
            alt="background image"
            fill
            onLoad={handleImageLoad}
         />
      </div>

      <Link href="/grammar" className={styles.backHolder}>
         <IoIosArrowBack className={styles.backSign} />
         <div className={styles.backText}>Back</div>
      </Link>
      <ReactLenis
         options={{
            duration: 2, // Animation duration in seconds
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
            lerp: 0.1, // Linear interpolation intensity (0 to 1)
            smoothWheel: true, // Enable smooth scrolling for mouse wheel
            smoothTouch: true, // Disable smooth scrolling for touch (optional, can be unstable on iOS < 16)
            wheelMultiplier: 0.2, // Adjust scroll speed for mouse wheel
            touchMultiplier: 0.2, // Adjust scroll speed for touch
            infinite: false, // Enable infinite scrolling (requires syncTouch: true for touch devices)
         }}
         root
      >
         <div className={styles.item}>
            <ScrollReveal
               baseOpacity={0}
               enableBlur={true}
               baseRotation={20}
               blurStrength={10}
            >  
               When does a man die? When he is hit by a bullet? No! When he suffers a disease?
               No! When he ate a soup made out of a poisonous mushroom?
               No! A man dies when he is forgotten!
               When does a man die? When he is hit by a bullet? No! When he suffers a disease?
               No! When he ate a soup made out of a poisonous mushroom?
               No! A man dies when he is forgotten!
               When does a man die? When he is hit by a bullet? No! When he suffers a disease?
               No! When he ate a soup made out of a poisonous mushroom?
               No! A man dies when he is forgotten!
               When does a man die? When he is hit by a bullet? No! When he suffers a disease?
               No! When he ate a soup made out of a poisonous mushroom?
               No! A man dies when he is forgotten!
            </ScrollReveal>

            <ScrollReveal
               baseOpacity={0}
               enableBlur={true}
               baseRotation={20}
               blurStrength={10}
            >  
               When does a man die? When he is hit by a bullet? No! When he suffers a disease?
               No! When he ate a soup made out of a poisonous mushroom?
               No! A man dies when he is forgotten!
            </ScrollReveal>
         </div>

      </ReactLenis>

      {isLoading && (
         <div className={styles.bottomLayer}>
            <Loader />
         </div>
      )}
    </div>
  );
}

export default Noun;
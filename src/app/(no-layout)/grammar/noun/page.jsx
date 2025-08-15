'use client';
import { useState, useRef } from 'react';
import Loader from '@/components/loading/loading';
import styles from './noun.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import ScrollReveal from '@/components/scrollReveal/ScrollReveal.jsx';

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
      <Image
        className={styles.background}
        src="/images/back/SenEle.jpg"
        alt=""
        fill
        sizes="100vw"
        style={{ zIndex: 0, objectFit: 'cover' }}
        priority // Load image immediately
        onLoad={handleImageLoad}
      />

      <Link href="/grammar" className={styles.backHolder}>
        <IoIosArrowBack className={styles.backSign} />
        <div className={styles.backText}>Back</div>
      </Link>

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
         </ScrollReveal>
      </div>

      {isLoading && (
        <div className={styles.bottomLayer}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Noun;
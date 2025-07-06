'use client';
import styles from './a1.module.css';
import { IoIosArrowBack } from 'react-icons/io';
import { TiTick } from "react-icons/ti";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from '@/components/loading/loading';

function A1() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = 1;
  const [switches, setSwitches] = useState(Array(52).fill(false));

  useEffect(() => {
    const newSwitches = Array(52).fill(false);
    for (let i = 1; i <= 52; i++) {
      const knowns = JSON.parse(localStorage.getItem(`knownWords-${i}-A1`)) || [];
      const unknowns = JSON.parse(localStorage.getItem(`unknownWords-${i}-A1`)) || [];
      const partials = JSON.parse(localStorage.getItem(`partialWords-${i}-A1`)) || [];
      if (knowns.length > 0 || unknowns.length > 0 || partials.length > 0) {
        newSwitches[i - 1] = true;
      }
    }
    setSwitches(newSwitches);
  }, []);

  const handleImageLoad = () => {
    setLoadedImages((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
        setIsLoading(false);
      }
      return newCount;
    });
  };

  // Find the index of the first non-done lesson to mark it as "new"
  const firstNonDoneIndex = switches.findIndex((switchState) => !switchState);
  const newLessonIndex = firstNonDoneIndex === -1 ? null : firstNonDoneIndex;

  return (
    <>
      <div className={styles.container}>
        <Image
          className={styles.background}
          src="../images/illustrations/act1.jpg"
          alt=""
          fill
          onLoad={handleImageLoad}
        />

        <Link href="/words" className={styles.backHolder}>
          <IoIosArrowBack className={styles.backSign} />
          <div className={styles.backText}>Back</div>
        </Link>

        <div className={styles.top}>
          <div className={styles.mainTitle}>A1 Vocabulary</div>
          <div className={styles.subtitle}>Read and Practice the Words</div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.lessonsTitle}>Lessons:</div>

          <div className={styles.learningHolder}>
            {switches.map((switchState, index) => {
              const lessonNumber = index + 1;
              const isDone = switchState;
              const isNew = index === newLessonIndex;
              const isSelectable = (index === 0 && !isDone) || (index > 0 && switches[index - 1] && !isDone);

              return isSelectable ? (
                <Link
                  href={`/a1/${lessonNumber}`}
                  className={styles.lessonsHolder}
                  key={lessonNumber}
                >
                  <div className={styles.lesson}>Lesson {lessonNumber}</div>
                  {isNew ? (
                    <div className={styles.newLesson}>New Lesson</div>
                  ) : (
                    <div className={styles.lessonWaiting}>Locked</div>
                  )}
                </Link>
              ) : (
                <div className={`${styles.lessonsHolder} ${styles.disabled}`} key={lessonNumber}>
                  <div className={styles.lesson}>Lesson {lessonNumber}</div>
                  {isDone ? (
                    <div className={styles.lessonDone}><TiTick className={styles.tick}/></div>
                  ) : isNew ? (
                    <div className={styles.newLesson}>New Lesson</div>
                  ) : (
                    <div className={styles.lessonWaiting}>Locked</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {isLoading && (
          <div className={styles.bottomLayer}>
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}

export default A1;
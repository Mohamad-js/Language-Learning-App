'use client';
import styles from './flashcard.module.css'
import { useState, useRef } from 'react';




function FlashCard({cards}){
   const [currentCardIndex, setCurrentCardIndex] = useState(0);
   const [isSwiping, setIsSwiping] = useState(false);
   const [startX, setStartX] = useState(0);
   const [startY, setStartY] = useState(0);
   const [translateX, setTranslateX] = useState(0);
   const [isFlipped, setIsFlipped] = useState(false);
   const [lastTap, setLastTap] = useState(0);
   const cardRef = useRef(null);

   const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setStartX(touch.clientX);
      setStartY(touch.clientY);
      setIsSwiping(true);
   };

   const handleTouchMove = (e) => {
      if (!isSwiping) return;
      const touch = e.touches[0];
      const diffX = touch.clientX - startX;
      const diffY = touch.clientY - startY;

      // Ignore swipe if vertical movement is too large (likely scrolling)
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
      setIsSwiping(false);
      setTranslateX(0);
      return;
      }

      setTranslateX(diffX);
   };

   const handleTouchEnd = () => {
      if (!isSwiping) return;
      setIsSwiping(false);

      const threshold = 100; // pixels
      if (translateX > threshold) {
      handleSwipe('right');
      } else if (translateX < -threshold) {
      handleSwipe('left');
      } else {
      setTranslateX(0); // Reset position
      }
   };

   const handleTap = (e) => {
      e.preventDefault();
      const now = Date.now();
      const DOUBLE_TAP_THRESHOLD = 300; // ms

      if (now - lastTap < DOUBLE_TAP_THRESHOLD) {
      // Double-tap: skip to next card
      setTranslateX(0);
      setIsFlipped(false);
      setCurrentCardIndex((prev) => (prev + 1 < cards.length ? prev + 1 : 0));
      } else {
      // Single tap: flip card
      setIsFlipped(!isFlipped);
      }

      setLastTap(now);
   };

   const handleSwipe = (direction) => {
      // Handle known/unknown logic here
      console.log(`Swiped ${direction}: ${cards[currentCardIndex].word}`);
      setTranslateX(0);
      setIsFlipped(false);
      setCurrentCardIndex((prev) => (prev + 1 < cards.length ? prev + 1 : 0));
   };

   if (!cards || cards.length === 0) {
      return <div className={styles.noCards}>No flashcards available</div>;
   }

   const currentCard = cards[currentCardIndex];



   return(
      <>
         <div className={styles.container}>
            <div
               ref={cardRef}
               className={`${styles.card} ${isSwiping ? styles.swiping : ''} ${
                  isFlipped ? styles.flipped : ''
               }`}
               style={{ transform: `translateX(${translateX}px)` }}
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}
               onClick={handleTap}
            >
               <div className={styles.cardInner}>
                  <div className={styles.cardFront}>
                  <h2>{currentCard.word}</h2>
                  </div>
                  <div className={styles.cardBack}>
                  <p>{currentCard.definition}</p>
                  </div>
               </div>
            </div>

            <div className={styles.indicators}>
               <span>Swipe left: Do not know</span>
               <span>Tap: Flip card</span>
               <span>Double-tap: Skip</span>
               <span>Swipe right: Know</span>
            </div>
         </div>
      </>
   )
}

export default FlashCard;
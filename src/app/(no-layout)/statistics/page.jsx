'use client'
import styles from './statistics.module.css'
import Silk from '@/components/silk/silk';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/components/backButton/back';
import { useEffect } from 'react';
import ProgressBar from '@/components/WhiteProgressBar/ProgressBar';
import Image from 'next/image';
import Loader from '@/components/loading/loading';



function Statistics(){
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;

   const [wordsData, setwordsData] = useState({
      total: 0,
      learnt: 0,
      remaining: 0,
   })
   
   const [wordsProgress, setWordsProgress] = useState(0)

   const [activeClass ,setActiveClass] = useState({
      levelA1: true,
      levelA2: false,
      levelB1: false,
      levelB2: false,
      levelC1: false,
      levelC2: false,
   })
   
   
   const [wordsA1Learnt, setWordsA1Learnt] = useState(null)
   const [wordsA1Total, setWordsA1Total] = useState(1170)
   const [wordsA1Remain, setWordsA1Remain] = useState(1170)
   const [wordsA1Progress, setWordsA1Progress] = useState(0)
   
   const [wordsA2Learnt, setWordsA2Learnt] = useState(null)
   const [wordsA2Total, setWordsA2Total] = useState(1240)
   const [wordsA2Remain, setWordsA2Remain] = useState(1240)
   const [wordsA2Progress, setWordsA2Progress] = useState(0)

   const [wordsB1Learnt, setWordsB1Learnt] = useState(null)
   const [wordsB1Total, setWordsB1Total] = useState(900)
   const [wordsB1Remain, setWordsB1Remain] = useState(900)
   const [wordsB1Progress, setWordsB1Progress] = useState(0)
   
   const [wordsB2Learnt, setWordsB2Learnt] = useState(null)
   const [wordsB2Total, setWordsB2Total] = useState(800)
   const [wordsB2Remain, setWordsB2Remain] = useState(800)
   const [wordsB2Progress, setWordsB2Progress] = useState(0)
   
   const [wordsC1Learnt, setWordsC1Learnt] = useState(null)
   const [wordsC1Total, setWordsC1Total] = useState(1300)
   const [wordsC1Remain, setWordsC1Remain] = useState(1300)
   const [wordsC1Progress, setWordsC1Progress] = useState(0)
   
   const [wordsC2Learnt, setWordsC2Learnt] = useState(null)
   const [wordsC2Total, setWordsC2Total] = useState(920)
   const [wordsC2Remain, setWordsC2Remain] = useState(920)
   const [wordsC2Progress, setWordsC2Progress] = useState(0)
   
   const [wordsTotalLearnt, setWordsTotalLearnt] = useState(null)
   const [wordsTotalTotal, setWordsTotalTotal] = useState(6330)
   const [wordsTotalRemain, setWordsTotalRemain] = useState(6330)
   const [wordsTotalProgress, setWordsTotalProgress] = useState(0)



   const [totalWords, setTotalWords] = useState(0)



   useEffect(() => {  
      
      const wordsNumberA1 = JSON.parse(localStorage.getItem('wordsCount-A1')) || 0;
      const currentA1 = JSON.parse(localStorage.getItem(`currentLesson-A1`)) || 0;
      setWordsA1Learnt(wordsNumberA1)
      setWordsA1Remain(1170 - wordsNumberA1)      
      const currentProgressA1 = (Number(currentA1) * 100) / 117
      setWordsA1Progress(Number(currentProgressA1.toFixed(1)))
      setWordsProgress(Number(currentProgressA1.toFixed(1)))

      setwordsData({
         total: wordsA1Total,
         learnt: wordsA1Learnt,
         remaining: wordsA1Remain,
      })
      
      
      const wordsNumberA2 = JSON.parse(localStorage.getItem('wordsCount-A2')) || 0;
      const currentA2 = JSON.parse(localStorage.getItem(`currentLesson-A2`)) || 0;
      setWordsA2Learnt(wordsNumberA2)
      setWordsA2Remain(1240 - wordsNumberA2)
      const currentProgressA2 = (Number(currentA2) * 100) / 124
      setWordsA2Progress(Number(currentProgressA2.toFixed(1)))
      
      
      const wordsNumberB1 = JSON.parse(localStorage.getItem('wordsCount-B1')) || 0;
      const currentB1 = JSON.parse(localStorage.getItem(`currentLesson-B1`)) || 0;
      setWordsB1Learnt(wordsNumberB1)
      setWordsB1Remain(900 - wordsNumberB1)
      const currentProgressB1 = (Number(currentB1) * 100) / 90
      setWordsB1Progress(Number(currentProgressB1.toFixed(1)))
      
      
      const wordsNumberB2 = JSON.parse(localStorage.getItem('wordsCount-B2')) || 0;
      const currentB2 = JSON.parse(localStorage.getItem(`currentLesson-B2`)) || 0;
      setWordsB2Learnt(wordsNumberB2)
      setWordsB2Remain(800 - wordsNumberB2)
      const currentProgressB2 = (Number(currentB2) * 100) / 80
      setWordsB2Progress(Number(currentProgressB2.toFixed(1)))
      
      
      const wordsNumberC1 = JSON.parse(localStorage.getItem('wordsCount-C1')) || 0;
      const currentC1 = JSON.parse(localStorage.getItem(`currentLesson-C1`)) || 0;
      setWordsC1Learnt(wordsNumberC1)
      setWordsC1Remain(1300 - wordsNumberC1)
      const currentProgressC1 = (Number(currentC1) * 100) / 130
      setWordsC1Progress(Number(currentProgressC1.toFixed(1)))

      
      const wordsNumberC2 = JSON.parse(localStorage.getItem('wordsCount-C2') || 0);
      const currentC2 = JSON.parse(localStorage.getItem(`currentLesson-C2`)) || 0;
      setWordsC2Learnt(wordsNumberC2)
      setWordsC2Remain(920 - wordsNumberC2)
      const currentProgressC2 = (Number(currentC2) * 100) / 92
      setWordsC2Progress(Number(currentProgressC2.toFixed(1)))

      
      const currentTotal = wordsA1Learnt + wordsA2Learnt + wordsB1Learnt + wordsB2Learnt + wordsC1Learnt + wordsC2Learnt
      setWordsTotalLearnt(currentTotal)
      setWordsTotalRemain(wordsTotalTotal - currentTotal)
      const currentProgressTotal = (Number(currentTotal) * 100) / 6330
      setWordsTotalProgress(Number(currentProgressTotal.toFixed(1)))


      const totalWordsCount = JSON.parse(localStorage.getItem('totalWordsCount') || 0);
      setTotalWords(totalWordsCount)
   
      setWordsA2Learnt(wordsNumberA2)
      setWordsB1Learnt(wordsNumberB1)
      setWordsB2Learnt(wordsNumberB2)
      setWordsC1Learnt(wordsNumberC1)
      setWordsC2Learnt(wordsNumberC2)
 
      
   }, [wordsA1Total, wordsTotalTotal, wordsC2Learnt, wordsC1Learnt, wordsB2Learnt, wordsB1Learnt, wordsA2Learnt, wordsA1Learnt, wordsA1Remain])

   const loadA1 = () => {
      setActiveClass({
         levelA1: true,
         levelA2: false,
         levelB1: false,
         levelB2: false,
         levelC1: false,
         levelC2: false,
         levelTotal: false
      })

      setwordsData({
         total: wordsA1Total,
         learnt: wordsA1Learnt,
         remaining: wordsA1Remain,
      })

      setWordsProgress(wordsA1Progress)
   }
   
   const loadA2 = () => {
      setActiveClass({
         levelA1: false,
         levelA2: true,
         levelB1: false,
         levelB2: false,
         levelC1: false,
         levelC2: false,
         levelTotal: false
      })

      setwordsData({
         total: wordsA2Total,
         learnt: wordsA2Learnt,
         remaining: wordsA2Remain,
      })

      setWordsProgress(wordsA2Progress)
   }
   
   const loadB1 = () => {
      setActiveClass({
         levelA1: false,
         levelA2: false,
         levelB1: true,
         levelB2: false,
         levelC1: false,
         levelC2: false,
         levelTotal: false
      })

      setwordsData({
         total: wordsB1Total,
         learnt: wordsB1Learnt,
         remaining: wordsB1Remain,
      })

      setWordsProgress(wordsB1Progress)
   }
   
   const loadB2 = () => {
      setActiveClass({
         levelA1: false,
         levelA2: false,
         levelB1: false,
         levelB2: true,
         levelC1: false,
         levelC2: false,
         levelTotal: false
      })

      setwordsData({
         total: wordsB2Total,
         learnt: wordsB2Learnt,
         remaining: wordsB2Remain,
      })

      setWordsProgress(wordsB2Progress)
   }
   
   const loadC1 = () => {
      setActiveClass({
         levelA1: false,
         levelA2: false,
         levelB1: false,
         levelB2: false,
         levelC1: true,
         levelC2: false,
         levelTotal: false
      })

      setwordsData({
         total: wordsC1Total,
         learnt: wordsC1Learnt,
         remaining: wordsC1Remain,
      })

      setWordsProgress(wordsC1Progress)
   }
   
   const loadC2 = () => {
      setActiveClass({
         levelA1: false,
         levelA2: false,
         levelB1: false,
         levelB2: false,
         levelC1: false,
         levelC2: true,
         levelTotal: false
      })

      setwordsData({
         total: wordsC2Total,
         learnt: wordsC2Learnt,
         remaining: wordsC2Remain,
      })

      setWordsProgress(wordsC2Progress)
   }
   
   const loadTotal = () => {
      setActiveClass({
         levelA1: false,
         levelA2: false,
         levelB1: false,
         levelB2: false,
         levelC1: false,
         levelC2: false,
         levelTotal: true,
      })

      setwordsData({
         total: 6330,
         learnt: wordsTotalLearnt,
         remaining: wordsTotalRemain,
      })

      setWordsProgress(wordsTotalProgress)
   }

   const handleImageLoad = () => {
      setLoadedImages((prev) => {
         const newCount = prev + 1;
         if (newCount >= totalImages) {
            setIsLoading(false);
         }
         return newCount;
      });
   };

   return(
      <div className={styles.container}>

         <Back />

         <Image
            className={styles.background}
            src="/images/back/backStat.jpg"
            alt="background"
            fill
            onLoad={handleImageLoad}
         />
         
         <div className={styles.pageTitle}>How You Performed Until Now</div>

         <div className={styles.progressBarHolder}>

            <div className={styles.dataCard}>
               <div className={styles.title}>Vocabulary</div>
               <div className={styles.levels}>
                  <div className={`${styles.level} ${activeClass.levelA1 && styles.selected}`} onClick={loadA1}>A1</div>
                  <div className={`${styles.level} ${activeClass.levelA2 && styles.selected}`} onClick={loadA2}>A2</div>
                  <div className={`${styles.level} ${activeClass.levelB1 && styles.selected}`} onClick={loadB1}>B1</div>
                  <div className={`${styles.level} ${activeClass.levelB2 && styles.selected}`} onClick={loadB2}>B2</div>
                  <div className={`${styles.level} ${activeClass.levelC1 && styles.selected}`} onClick={loadC1}>C1</div>
                  <div className={`${styles.level} ${activeClass.levelC2 && styles.selected}`} onClick={loadC2}>C2</div>
                  <div className={`${styles.level} ${activeClass.levelTotal && styles.selected}`} onClick={loadTotal}>TOTAL</div>
               </div>
               <div className={styles.infoHolder}>
                  <div className={styles.info}>
                     <div className={styles.dataNode}>
                        <div className={styles.text}>Total:</div>
                        <div className={styles.number}>{wordsData.total}</div>
                     </div>
                     <div className={styles.dataNode}>
                        <div className={styles.text}>Learnt:</div>
                        <div className={styles.number}>{wordsData.learnt}</div>
                     </div>
                     <div className={styles.dataNode}>
                        <div className={styles.text}>Remaining:</div>
                        <div className={styles.number}>{wordsData.remaining}</div>
                     </div>
                  </div>

                  <div className={styles.chartHolder}>
                     <div className={styles.chart}>
                        <ProgressBar
                           inputNumber = {wordsProgress}
                           numberSize = {20}
                           percentSize = {15}
                           endNumber = {100}
                           circleWidth = '100'
                           lineWidth = '45'
                           percent={true}
                           titleSize = {15}
                           lineStroke = {6}
                           strokeColor = 'rgb(82, 80, 255)'
                           textColor = 'rgb(151, 150, 241)'
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className={styles.dataCard}>
               <div className={styles.underDev}>Grammar Stats Under Dev...</div>
            </div>

            <div className={styles.dataCard}>
               <div className={styles.underDev}>Word Family Stats Under Dev...</div>
            </div>

            <div className={styles.dataCard}>
               <div className={styles.underDev}>Collocations Stats Under Dev...</div>
            </div>
         </div>

         {isLoading && (
            <Loader />
         )}
      </div>
   )
}

export default Statistics;
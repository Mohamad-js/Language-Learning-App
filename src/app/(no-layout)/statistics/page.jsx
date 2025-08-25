'use client'
import styles from './statistics.module.sass'
import Silk from '@/components/silk/silk';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/components/backButton/back';
import { useEffect } from 'react';
import ProgressBar from '@/components/WhiteProgressBar/ProgressBar';


function Statistics(){
   const [readProgress, setReadProgress] = useState(42)
   const [writeProgress, setWriteProgress] = useState(18)
   const [listenProgress, setListenProgress] = useState(29)
   const [speakProgress, setSpeakProgress] = useState(57)
   const [total, setTotal] = useState(77)
   const [wordsA1Count, setWordsA1Count] = useState(null)
   const [wordsA2Count, setWordsA2Count] = useState(null)
   const [wordsB1Count, setWordsB1Count] = useState(null)
   const [wordsB2Count, setWordsB2Count] = useState(null)
   const [wordsC1Count, setWordsC1Count] = useState(null)
   const [wordsC2Count, setWordsC2Count] = useState(null)



   useEffect(() => {  
      
      const wordsNumberA1 = JSON.parse(localStorage.getItem('wordsCount-A1') || 0);
      const wordsNumberA2 = JSON.parse(localStorage.getItem('wordsCount-A2') || 0);
      const wordsNumberB1 = JSON.parse(localStorage.getItem('wordsCount-B1') || 0);
      const wordsNumberB2 = JSON.parse(localStorage.getItem('wordsCount-B2') || 0);
      const wordsNumberC1 = JSON.parse(localStorage.getItem('wordsCount-C1') || 0);
      const wordsNumberC2 = JSON.parse(localStorage.getItem('wordsCount-C2') || 0);
   
      setWordsA1Count(wordsNumberA1)
      setWordsA2Count(wordsNumberA2)
      setWordsB1Count(wordsNumberB1)
      setWordsB2Count(wordsNumberB2)
      setWordsC1Count(wordsNumberC1)
      setWordsC2Count(wordsNumberC2)
      
      const totalA1 = JSON.parse(localStorage.getItem('total-A1') || 0);
      const totalA2 = JSON.parse(localStorage.getItem('total-A2') || 0);
      const totalB1 = JSON.parse(localStorage.getItem('total-B1') || 0);
   
      const currentTotal = Number(totalA1 + totalA2 + totalB1).toFixed(2)
      setTotal(currentTotal)
      
   }, [])

   return(
      <>
         <div className={styles.container}>

            <Back />

            <div className={styles.background}>
               <Silk
                  speed={5}
                  scale={1}
                  color="#d400ff"
                  noiseIntensity={0}
                  rotation={0}
               />
            </div>

            <div className={styles.progressBarHolder}>
               <ProgressBar
                  inputNumber = {wordsA1Count}
                  numberSize = {20}
                  endNumber = {1170}
                  circleWidth = '100'
                  lineWidth = '47'
                  title='A1 Words'
                  titleSize = {15}
                  lineStroke = {6}
               />
               <ProgressBar
                  inputNumber = {wordsA2Count}
                  numberSize = {20}
                  endNumber = {1240}
                  circleWidth = '100'
                  lineWidth = '47'
                  title='A2 Words'
                  titleSize = {15}
                  lineStroke = {6}
               />
               <ProgressBar
                  inputNumber = {wordsB1Count}
                  numberSize = {20}
                  endNumber = {900}
                  circleWidth = '100'
                  lineWidth = '47'
                  title='B1 Words'
                  titleSize = {15}
                  lineStroke = {6}
               />
               <ProgressBar
                  inputNumber = {wordsB2Count}
                  numberSize = {20}
                  endNumber = {1170}
                  circleWidth = '100'
                  lineWidth = '47'
                  title='B2 Words'
                  titleSize = {15}
                  lineStroke = {6}
               />
               <ProgressBar
                  inputNumber = {wordsC1Count}
                  numberSize = {20}
                  endNumber = {1170}
                  circleWidth = '100'
                  lineWidth = '47'
                  title='C1 Words'
                  titleSize = {15}
                  lineStroke = {6}
               />
               <ProgressBar
                  inputNumber = {wordsC2Count}
                  numberSize = {20}
                  endNumber = {1170}
                  circleWidth = '100'
                  lineWidth = '47'
                  title='C2 Words'
                  titleSize = {15}
                  lineStroke = {6}
               />
               <ProgressBar
                  inputNumber = {500}
                  percent = {true}
                  endNumber = {1170}
                  circleWidth = '200'
                  lineWidth = '90'
                  title='Total Progress'
               />
            </div>
         </div>
      </>
   )
}

export default Statistics;
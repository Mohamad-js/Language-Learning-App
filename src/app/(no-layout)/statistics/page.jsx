'use client'
import styles from './statistics.module.css'
import Link from 'next/link';
import Silk from '@/components/silk/silk';
import { useRouter } from 'next/navigation';
import Back from '@/components/backButton/back';


function Statistics(){


   return(
      <>
         <div className={styles.container}>

            <Back />

            <div className={styles.background}>
               <Silk
                  speed={5}
                  scale={1}
                  color="#8800ff"
                  noiseIntensity={0}
                  rotation={0}
               />
            </div>
         </div>
      </>
   )
}

export default Statistics;
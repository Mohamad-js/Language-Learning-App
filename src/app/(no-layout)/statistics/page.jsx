'use client'
import styles from './statistics.module.css'
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import Silk from '@/components/silk/silk';
import { useRouter } from 'next/navigation';


function Statistics(){

   const router = useRouter()

   const handleBack = () => {
      history.back()
   }


   return(
      <>
         <div className={styles.container}>
            <div className={styles.backHolder} onClick={handleBack}>
               <IoIosArrowBack className={styles.backSign} />
               <div className={styles.backText}>Back</div>
            </div>


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
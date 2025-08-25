'use client'
import styles from './c1.module.css'
import Link from 'next/link';
import DevMode from '@/components/underDev/DevMode';
import Back from '@/components/backButton/back';




function C1(){




   return(
      <>
         <div className={styles.container}>
            <Back />

            <DevMode />

            {/* <div className={styles.learningHolder}>

            </div> */}
         </div>
      </>
   )
}

export default C1;
'use client'
import styles from './b2.module.css'
import Link from 'next/link';
import DevMode from '@/components/underDev/DevMode';
import Back from '@/components/backButton/back';




function B2(){




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

export default B2;
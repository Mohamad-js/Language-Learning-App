'use client'
import styles from './devMode.module.css'
import Link from 'next/link';



function DevMode(){




   return(
      <>
         <div className={styles.container}>
            <video className={styles.video}
               autoPlay loop muted
            >
               <source src='/images/back/backVideo.mp4' type='video/mp4' />
            </video>
            <div className={styles.devTextHolder}>
               <div className={styles.text}>This Page Is Under Development</div>
               <Link href='/' className={styles.btn}>HOME</Link>
            </div>
         </div>
      </>
   )
}

export default DevMode;
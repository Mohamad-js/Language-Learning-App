'use client'
import styles from './devMode.module.css'
import Link from 'next/link';



function DevMode(){




   return(
      <>
         <div className={styles.container}>
            <div className={styles.devTextHolder}>
               <div className={styles.text}>This Page Is Under Development</div>
               <Link href='/' className={styles.btn}>HOME</Link>
            </div>
         </div>
      </>
   )
}

export default DevMode;
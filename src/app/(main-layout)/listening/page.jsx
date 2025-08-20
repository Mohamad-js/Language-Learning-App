'use client'
import DevMode from '@/components/underDev/DevMode';
import styles from './listening.module.css'
import Back from '@/components/backButton/back';




function Listening(){




   return(
      <>
         <div className={styles.container}>
            {/* <DevMode /> */}
            <Back />
         </div>
      </>
   )
}

export default Listening;
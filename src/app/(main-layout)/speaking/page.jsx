'use client'
import DevMode from '@/components/underDev/DevMode';
import styles from './speaking.module.sass'
import Back from '@/components/backButton/back';




function Speaking(){




   return(
      <>
         <div className={styles.container}>
            {/* <DevMode /> */}
            <Back />
         </div>
      </>
   )
}

export default Speaking;
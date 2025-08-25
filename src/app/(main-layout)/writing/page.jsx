'use client'
import DevMode from '@/components/underDev/DevMode';
import styles from './writing.module.sass'
import Back from '@/components/backButton/back';




function Writing(){




   return(
      <>
         <div className={styles.container}>
            {/* <DevMode /> */}
            <Back />
         </div>
      </>
   )
}

export default Writing;
'use client'
import DevMode from '@/components/underDev/DevMode';
import styles from './reading.module.sass'
import Back from '@/components/backButton/back';



function Reading(){




   return(
      <div className = {styles.container}>
         {/* <DevMode /> */}
         <Back />
      </div>
   )
}

export default Reading;
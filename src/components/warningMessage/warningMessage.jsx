import styles from './warningMessage.module.css'
import Image from 'next/image';




function WarningMessage({message}){




   return(
      <div className={styles.container}>
         <div className={styles.holder}>
            <div className={styles.attentionIcon}>
               <Image className={styles.icon}
                  src = '/images/illustrations/lock.png'
                  alt = 'lock icon'
                  width = {70}
                  height = {70}
               />
            </div>
            <div className={styles.lockedTitle}>{message}</div>
         </div>
      </div>
   )
}

export default WarningMessage;
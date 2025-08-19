import styles from './warningMessage.module.css'
import { RiProhibited2Line } from "react-icons/ri";




function WarningMessage({message}){




   return(
      <div className={styles.container}>
         <div className={styles.holder}>
            <div className={styles.attentionIcon}>
               <RiProhibited2Line className={styles.icon} />
            </div>
            <div className={styles.lockedTitle}>{message}</div>
         </div>
      </div>
   )
}

export default WarningMessage;
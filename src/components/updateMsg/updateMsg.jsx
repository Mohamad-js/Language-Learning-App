import styles from './updateMsg.module.css'
import Image from 'next/image';



function UpdateMsg({open, onClose, updates, version}){



   if(open){
      return(
         <>
            <div className={styles.container}>
               <Image 
                  src= '/images/back/updates.jpg'
                  alt='update backgorund'
                  fill
               />
            </div>
   
            <div className={styles.msgCard}>
               <div className={styles.title}>New Update</div>
               <div className={styles.msg}>
                  <div className={styles.version}>Version {version}</div>
                  <div className={styles.updatesHolder}>
                     {
                        updates.map((item, index) => (
                           <div key={index} className={styles.updates}>{item}</div>
                        ))
                     }
                  </div>
               </div>
               <button className={styles.close} onClick={onClose}>Close</button>
            </div>
         </>
      )
   }
}

export default UpdateMsg;
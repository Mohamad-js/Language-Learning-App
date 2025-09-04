import styles from './updateMsg.module.css'
import Image from 'next/image';



function UpdateMsg({onClose, updates}){
   if (!updates?.length) return null;


   return(
      <div className={styles.container}>
         <div className={styles.msgCard}>
            <Image className={styles.img}
               src= '/images/back/updates.jpg'
               alt='update backgorund'
               fill
            />
            <div className={styles.title}>New Update</div>
            <div className={styles.msg}>
               <div className={styles.updatesHolder}>
               {
                  updates.map((item, index) => (
                     <div key={index} className={styles.updates}>{item}</div>
                  ))
               }
               </div>
            </div>
            <button className={styles.close} onClick={onClose}>I Understand</button>
         </div>
      </div>

   )
   
}

export default UpdateMsg;
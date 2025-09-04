import styles from './updateMsg.module.css'
import Image from 'next/image';



function UpdateMsg({onClose, version, updates, titles}){
   if (!updates?.length) return null;

   const updatesData = titles.map((title, index) => ({
      titles: title,
      info: updates[index]
   }));

   return(
      <div className={styles.container}>
         <div className={styles.msgCard}>
            <Image className={styles.img}
               src= '/images/back/updates.jpg'
               alt='update backgorund'
               fill
            />
            <div className={styles.title}>New Version: {version}</div>
            <div className={styles.msg}>
               <div className={styles.updatesHolder}>
               {
                  updatesData.map((item, index) => (
                     <div key={index} className={styles.updatesItem}>
                        <div key={index} className={styles.titles}>{item.titles}</div>
                        <div key={index} className={styles.info}>{item.info}</div>
                     </div>
                  ))
               }
               </div>
            </div>
            <button className={styles.close} onClick={onClose}>Close</button>
         </div>
      </div>

   )
   
}

export default UpdateMsg;
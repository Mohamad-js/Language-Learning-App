import styles from './briefPrompt.module.css'
import { useState, useEffect } from 'react';



function BriefPrompt({ text }){
   const [showPrompt, setShowPrompt] = useState(false)

   const showMsg = () => {
      setShowPrompt(true)

      setTimeout(() => {
         setShowPrompt(false);
      }, 3000);
   }

   useEffect(() => {
      showMsg()
   }, [])


   return(
      <div className={`${styles.confirmDefault} ${showPrompt && styles.confirmShow}`}>
         <div className={styles.confirmMsg}>{text}</div>
      </div>
   )
}

export default BriefPrompt;
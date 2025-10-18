'use client'
import styles from './back.module.css'
import { IoIosArrowBack } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ConfirmDialogue from '../confirmDialogue/confirmDialogue';
import { useTheme } from '../context/ThemeContext';


function Back({preventNavigation, warning, preview, goTo}){
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;
   
   const router = useRouter()
   const [message, setMessage] = useState()

   useEffect(() => {
      if(preview){
         localStorage.setItem(`preview`, JSON.stringify(false));
      }
   }, [preview])


   const handleBack = () => {
      preventNavigation ? setMessage(true) : goTo ? router.push(goTo) : history.back()
   }

   const onConfirm = () => {
      history.back()
   }

   const onCancel = () => {
      setMessage(false)
   }

   return(
      <div className={styles.container}>
         <div className={`${styles.backHolder} ${darkMode && styles.newStyle}`} onClick={handleBack}>
            <IoIosArrowBack className={styles.backSign} />
            <div className={styles.backText}>Back</div>
         </div>

         {
            message && 
            <ConfirmDialogue
               warning = {warning}
               confirm = {onConfirm}
               cancel = {onCancel}
            />
         }
      </div>
   )
}

export default Back;
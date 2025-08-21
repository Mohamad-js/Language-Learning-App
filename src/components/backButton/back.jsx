import styles from './back.module.css'
import { IoIosArrowBack } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ConfirmDialogue from '../confirmDialogue/confirmDialogue';



function Back({preventNavigation, warning, preview, goTo}){
   const router = useRouter()
   const [message, setMessage] = useState()

   const pathname = usePathname()

   const whiteColor =
   pathname == '/grammar/noun' ? styles.newStyle :
   pathname == '/statistics' ? styles.newStyle : null

   useEffect(() => {
      if(preview){
         localStorage.setItem(`preview`, JSON.stringify(false));
      }

      if(goTo){
         router.push(goTo)
      }
   }, [preview, goTo, router])


   const handleBack = () => {
      preventNavigation ? setMessage(true) : history.back()
   }

   const onConfirm = () => {
      history.back()
   }

   const onCancel = () => {
      setMessage(false)
   }

   return(
      <div className={styles.container}>
         <div className={`${styles.backHolder} ${whiteColor}`} onClick={handleBack}>
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
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './menu.module.css'
import { CiMenuFries } from "react-icons/ci";
import Link from 'next/link';


function Menu(){
   const [menu,setMenu] = useState(false)
   const [warning,setWarning] = useState(false)

   const router = useRouter()

   const resetWarning = () => {
      setMenu(!menu)
   }
   const closeMenu = () => {
      setMenu(!menu)
   }

   const resetAction = () => {
      setWarning(false)
      localStorage.clear()
      router.push('/')
      location.reload()
   }

   const showWarning = () => {
      setWarning(true)
   }

   const cancelReset = () => {
      setWarning(false)
   }

   return(
      <>
         <div className={styles.holder}>
            <CiMenuFries className={styles.hamIcon} onClick={resetWarning}/>
         </div>
         {
            menu ?
            <div className={styles.menuLayer} onClick={closeMenu}>
               <div className={styles.menu}>
                  <div className={styles.item} onClick={showWarning}>Restart</div>
                  <div className={styles.item}>Saved</div>
                  <div className={styles.item}>Statistics</div>
                  <div className={styles.item}>My Errors</div>
                  <div className={styles.item}>About</div>
               </div>
            </div> : null
         } 
         {
            warning ?
            <div className={styles.warningHolder} onClick={cancelReset}>
               <div className={styles.warning}>
                  <div className={styles.titleHolder}>
                     <div className={styles.title}>All progress will be lost.</div>
                     <div className={styles.title}>Are you sure to restart?</div>
                  </div>
                  <div className={styles.btnHolder}>
                     <button className={styles.no} onClick={cancelReset}>No</button>
                     <button className={styles.yes} onClick={resetAction}>Yes</button>
                  </div>
               </div>
            </div> : null
         }
      </>
   )
}

export default Menu;


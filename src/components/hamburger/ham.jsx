'use client'
import styles from './ham.module.css'
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CiSaveDown1 } from "react-icons/ci";
import { MdOutlineRestartAlt, MdInsertChartOutlined } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosOptions } from "react-icons/io";
import { RiRepeat2Fill } from "react-icons/ri";
import Link from 'next/link';



function Ham(){
   const [menu, setMenu] = useState(false)
   const [warning, setWarning] = useState(false)

   const pathname = usePathname()

   const whiteColor =
   pathname == '/grammar/noun' ? styles.newStyle :
   pathname == '/a2' ? styles.newStyle :
   pathname == '/b2' ? styles.newStyle :
   pathname == '/c2' ? styles.newStyle :
   pathname == '/statistics' ? styles.newStyle : null

   const router = useRouter()

   const resetWarning = () => {
      setMenu(prev => !prev)
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

   console.log(menu);

   return(
      <div className={styles.hamHolder}>
         <div className={styles.container} onClick={resetWarning}>
            <label className={styles.hamburger}>
               <input type="checkbox" onClick={(e) => e.stopPropagation()}/>
               <svg viewBox="0 0 32 32">
                  <path className={`${styles.line} ${styles.lineTopBottom} ${whiteColor}`} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                  <path className={`${styles.line} ${whiteColor}`} d="M7 16 27 16"></path>
               </svg>
            </label>
         </div>

         <div className={`${styles.menuLayer} ${menu && styles.appear}`} >
            <div className={styles.menu}>
               <div className={styles.option}>
                  <MdOutlineRestartAlt className={styles.icon} />
                  <div className={styles.item} onClick={showWarning}>Restart App</div>
               </div>
               <Link href='/saved' className={styles.option}>
                  <CiSaveDown1 className={styles.icon} />
                  <div className={styles.item}>Saved</div>
               </Link>
               <Link href='/statistics' className={styles.option}>
                  <MdInsertChartOutlined className={styles.icon} />
                  <div className={styles.item}>Statistics</div>
               </Link>
               <div className={styles.option}>
                  <BiErrorCircle className={styles.icon} />
                  <div className={styles.item}>My Errors</div>
               </div>
               <Link href='/themes' className={styles.option}>
                  <IoIosOptions className={styles.icon} />
                  <div className={styles.item}>Settings</div>
               </Link>
               <Link href='/review' className={styles.option}>
                  <RiRepeat2Fill className={styles.icon} />
                  <div className={styles.item}>Review</div>
               </Link>
            </div>
         </div>
         
         {
            warning &&
            <div className={styles.warningHolder} onClick={cancelReset}>
               <div className={styles.warning}>
                  <div className={styles.titleHolder}>
                     <div className={styles.title}>All progress in the app will be lost.</div>
                     <div className={styles.title}>Are you sure to restart the app?</div>
                  </div>
                  <div className={styles.btnHolder}>
                     <button className={styles.btn} onClick={cancelReset}>No</button>
                     <button className={styles.btn} onClick={resetAction}>Yes</button>
                  </div>
               </div>
            </div>
         }
      </div>
   )
}

export default Ham;
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './menu.module.css'
import { CiMenuFries, CiSaveDown1 } from "react-icons/ci";
import { MdOutlineRestartAlt, MdInsertChartOutlined } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosOptions } from "react-icons/io";
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
                  <div className={styles.option}>
                     <MdOutlineRestartAlt className={styles.icon} />
                     <div className={styles.item} onClick={showWarning}>Restart</div>
                  </div>
                  <Link href='/review' className={styles.option}>
                     <CiSaveDown1 className={styles.icon} />
                     <div className={styles.item}>Saved</div>
                  </Link>
                  <div className={styles.option}>
                     <MdInsertChartOutlined className={styles.icon} />
                     <div className={styles.item}>Statistics</div>
                  </div>
                  <div className={styles.option}>
                     <BiErrorCircle className={styles.icon} />
                     <div className={styles.item}>My Errors</div>
                  </div>
                  <div className={styles.option}>
                     <IoIosOptions className={styles.icon} />
                     <div className={styles.item}>Theme</div>
                  </div>
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

